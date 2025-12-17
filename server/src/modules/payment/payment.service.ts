import { Course } from '@/modules/courses/course.model';
import { ApiError } from '@/shared/utils/ApiError.util';
import { isEnrolled } from '@/shared/utils/isEnrolled.util';
import { Enrollment } from '@/modules/enrollment/enrollment.model';
import Stripe from 'stripe';
import { PurchaseDTO, PaymentSession } from './payment.types';

// Lazy initialization of Stripe to ensure env vars are loaded
let stripeInstance: Stripe | null = null;

const getStripe = (): Stripe => {
  if (!stripeInstance) {
    if (!process.env.STRIPE_API_KEY) {
      throw new ApiError(500, "Stripe API key is not configured");
    }
    stripeInstance = new Stripe(process.env.STRIPE_API_KEY);
  }
  return stripeInstance;
};

export const purchaseCourses = async (userId: string, courseIds: string[]): Promise<PaymentSession> => {
  if (!courseIds || courseIds.length === 0) {
    throw new ApiError(400, "Please provide course IDs");
  }

  const courseDetails = await Course.find({ _id: { $in: courseIds } });

  if (courseDetails.length !== courseIds.length) {
    throw new ApiError(404, "Some courses not found");
  }

  let totalAmount = 0;
  const line_items: any[] = [];
  const enrolledCourseIds: string[] = [];

  for (const course of courseDetails) {
    const isAlreadyEnrolled = await isEnrolled(course._id.toString(), userId);

    if (isAlreadyEnrolled) {
      throw new ApiError(404, `You are Already Enrolled in the Course : ${course.title} `);
    }

    if (!course.paid) {
      await Enrollment.create({ user: userId, course: course._id });
      enrolledCourseIds.push(course._id.toString());
    } else {
      line_items.push({
        price_data: {
          currency: 'INR',
          unit_amount: (course.price || 0) * 100,
          product_data: { name: course.title },
        },
        quantity: 1,
      });
      totalAmount += course.price || 0;
      enrolledCourseIds.push(course._id.toString());
    }
  }

  if (line_items.length > 0) {
    const stripe = getStripe();
    const courseIdsString = enrolledCourseIds.join(",");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/verify?success=true&courseIds=${courseIdsString}`,
      cancel_url: `${process.env.CLIENT_URL}/verify?success=false`,
    });

    return { sessionUrl: session.url, message: "Payment Initiated" };
  }

  return { sessionUrl: null, message: "Free courses enrolled successfully" };
};
