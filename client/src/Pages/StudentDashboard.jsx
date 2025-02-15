import React from 'react';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-6">Student Dashboard</h2>
        <ul>
          <li className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded">
            Home
          </li>
          <li className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded">
            Courses
          </li>
          <li className="mb-4 cursor-pointer hover:bg-gray-700 p-2 rounded">
            Grades
          </li>
          <li className="cursor-pointer hover:bg-gray-700 p-2 rounded">
            Profile
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
          <p className="text-gray-600 mt-2">Here’s your dashboard overview.</p>
        </div>

        {/* Student Info */}
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Profile</h2>
          <p className="text-gray-700">Name: John Doe</p>
          <p className="text-gray-700">Email: johndoe@example.com</p>
          <p className="text-gray-700">Student ID: 123456</p>
        </div>

        {/* Courses Section */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Courses</h2>
          <ul>
            <li className="text-gray-700 mb-2">Course 1: React Development</li>
            <li className="text-gray-700 mb-2">Course 2: JavaScript Basics</li>
            <li className="text-gray-700 mb-2">Course 3: Web Design</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard ;
