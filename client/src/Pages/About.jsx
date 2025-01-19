import React from "react";
import { User } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>

      {/* Platform Information */}
      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg text-gray-700">
          Our mission is to empower learners and educators worldwide by providing a
          comprehensive and user-friendly platform for online education. We aim to make
          quality education accessible, engaging, and affordable for everyone, everywhere.
        </p>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
        <p className="text-lg text-gray-700">
          Our platform provides a wide range of features, including:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
          <li>Interactive courses designed by industry experts</li>
          <li>Live and recorded sessions for flexible learning</li>
          <li>Comprehensive progress tracking and analytics</li>
          <li>Seamless collaboration tools for educators and learners</li>
        </ul>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
        <p className="text-lg text-gray-700">
          We prioritize the success of our users by ensuring:
        </p>
        <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600">
          <li>A user-friendly and intuitive interface</li>
          <li>Regular updates with cutting-edge features</li>
          <li>Dedicated customer support available 24/7</li>
          <li>Affordable pricing without compromising quality</li>
        </ul>
      </div>

      <hr className="my-8" />

      {/* Team Section */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Meet the Founder</h2>
        <div className="flex items-start space-x-6">
          <div className="w-24 h-24 flex justify-center items-center bg-gray-100 rounded-full">
            <User className="w-12 h-12 text-gray-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Siddesh Pansare</h3>
            <p className="text-md text-gray-600">Founder & CEO</p>
            <p className="text-sm text-gray-500 mt-2">
              Passionate about revolutionizing online education, [Your Name] founded this platform to
              bridge the gap between educators and learners. With a vision for accessible and
              impactful learning, Siddesh  brings years of expertise in education technology.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
