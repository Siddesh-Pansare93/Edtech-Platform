import HeroSection from '@/components/Common/HomePage/HeroSection';
import WhyChooseUs from '@/components/Common/HomePage/WhyChooseUs';
import PopularCourses from '@/components/Common/HomePage/PopularCourses';
import Testimonials from '@/components/Common/HomePage/Testimonials';
import HowItWorks from '@/components/Common/HomePage/HowItWorks';
import CallToAction from '@/components/Common/HomePage/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black overflow-x-hidden">
      <HeroSection />
      <WhyChooseUs />
      <PopularCourses />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
    </div>
  );
}
