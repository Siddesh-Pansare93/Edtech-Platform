import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance";
import Input from "@/components/Common/Input";

// Import icons
import {
  AcademicCapIcon,
  UserGroupIcon,
  BookOpenIcon,
  ChevronRightIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

function InstructorDashboard() {
  const [coursesData, setCoursesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchInstructorCourses = async () => {
      try {
        const response = await axiosInstance.get("/users/your-courses");
        setCoursesData(response.data.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInstructorCourses();
  }, []);

  // Add New Section
  const addSection = () => {
    setSections([...sections, { name: "", lessons: [] }]);
  };

  // Handle Section Name Change
  const handleSectionNameChange = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index].name = value;
    setSections(updatedSections);
  };

  // Add New Lesson to a Section
  const addLesson = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons.push({ title: "", video: null });
    setSections(updatedSections);
  };

  // Handle Lesson Title Change
  const handleLessonTitleChange = (sectionIndex, lessonIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons[lessonIndex].title = value;
    setSections(updatedSections);
  };

  // Handle Lesson Video Upload
  const handleVideoUpload = (sectionIndex, lessonIndex, file) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].lessons[lessonIndex].video = file;
    setSections(updatedSections);
  };

  // Submit Sections with Lessons
  const handleSubmit = async () => {
    for (const section of sections) {
      const sectionData = { name: section.name };
      try {
        const sectionResponse = await axiosInstance.post(
          "/sections/create",
          sectionData
        );
        const sectionId = sectionResponse.data.section._id;

        // Upload Lessons
        for (const lesson of section.lessons) {
          const formData = new FormData();
          formData.append("title", lesson.title);
          formData.append("video", lesson.video);

          await axiosInstance.post(
            `/lessons/create?sectionId=${sectionId}`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isSidebarOpen ? 0 : -250 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed md:static w-64 h-full bg-white z-20"
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>
        <nav className="mt-6">
          <Link className="flex items-center px-6 py-3 text-gray-700 bg-gray-200">
            <AcademicCapIcon className="w-5 h-5 mr-3" />
            Your Courses
          </Link>
          <Link className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
            <UserGroupIcon className="w-5 h-5 mr-3" />
            Students
          </Link>
          <Link
            to={"/courseform"}
            className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100"
          >
            <BookOpenIcon className="w-5 h-5 mr-3" />
            Create Course
          </Link>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Sections & Lessons
            </h1>
            <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Bars3Icon className="w-6 h-6" />
            </button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">Loading...</div>
          ) : (
            <div>
              {/* Sections */}
              {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="bg-white p-4 rounded-lg shadow-md mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Section {sectionIndex + 1}</h3>
                  <Input
                    type="text"
                    placeholder="Section Name"
                    value={section.name}
                    onChange={(e) => handleSectionNameChange(sectionIndex, e.target.value)}
                    className="w-full p-2 border rounded-md mt-2"
                  />
                  <button
                    onClick={() => addLesson(sectionIndex)}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Add Lesson
                  </button>

                  {/* Lessons */}
                  {section.lessons.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="mt-4 p-4 border rounded-lg">
                      <h4 className="text-md font-semibold text-gray-700">Lesson {lessonIndex + 1}</h4>
                      <Input
                        type="text"
                        placeholder="Lesson Title"
                        value={lesson.title}
                        onChange={(e) => handleLessonTitleChange(sectionIndex, lessonIndex, e.target.value)}
                        className="w-full p-2 border rounded-md mt-2"
                      />
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleVideoUpload(sectionIndex, lessonIndex, e.target.files[0])}
                        className="w-full mt-2"
                      />
                    </div>
                  ))}
                </div>
              ))}

              <button
                onClick={addSection}
                className="mt-4 px-6 py-3 bg-green-500 text-white rounded-lg"
              >
                Add Section
              </button>

              <button
                onClick={handleSubmit}
                className="mt-4 ml-4 px-6 py-3 bg-blue-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default InstructorDashboard;
