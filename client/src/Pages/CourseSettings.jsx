import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axiosInstance from "@/utils/axiosInstance";
import Input from "@/components/Common/Input";

// Import icons
import { ChevronDown } from "lucide-react"

function CourseSettings() {
  const [coursesData, setCoursesData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sections, setSections] = useState([]);
  const [expandedLessons, setExpandedLessons] = useState({})

  const { courseId } = useParams("courseId")

  console.log(courseId)



  useEffect(() => {
    const fetchCourseDetails = async () => {
      const courseDetails = await axiosInstance.get(`/course/content/${courseId}`)
      console.log(courseDetails.data.data)
      setCoursesData(courseDetails.data.data)

      setIsLoading(false)
    }
    fetchCourseDetails()
  }, []);

  console.log(expandedLessons)


  const toggleLesson = (lessonId) => {
    setExpandedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }))
  }


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
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-gray-200 to-blue-200">
      {/* Sidebar */}


      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Sections & Lessons
            </h1>

          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">Loading...</div>
          ) : (
            <div>
              {/* Sections */}
              {
                coursesData.map(section => (
                  <div key={section.sectionId} className="bg-white shadow-md rounded-md p-4 mb-2">
                    <div className="w-full ">
                      <div className="flex justify-between">
                        <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                        <div className="flex gap-4">
                          <button
                            className="bg-blue-200  hover:bg-blue-300 hover:shadow-sm hover:shadow-black border-2 border-gray-500 rounded-md p-2 text-black font-bold py-2 ">
                            Add Lesson
                          </button>
                          <button
                            className="bg-yellow-200  hover:bg-yellow-300 hover:shadow-sm hover:shadow-black border-2 border-gray-500 rounded-md p-2 text-black font-bold py-2 ">
                            Edit
                          </button>
                        </div>
                      </div>
                      {section.lessons.map(lesson => (
                        <div
                          key={lesson.lessonId}
                          className="shadow-md p-4 shadow-black m-3 rounded-lg"
                          onClick={() => toggleLesson(lesson.lessonId)}
                        >

                          <h3 className="text-lg font-bold text-gray-900 mb-3">{lesson.title}</h3>

                          {expandedLessons[lesson.lessonId] && (
                            <>
                              <video className="mb-3">
                                <source src={lesson.content} />
                              </video>
                              <div className="flex gap-10">
                                <button className="text-black font-bold border-2 p-2 rounded-md bg-green-300"> {lesson.content ? "Edit Content" : "Add Content"} </button>
                                {lesson.content && <button className="text-black font-bold border-2 p-2 rounded-md bg-red-300" onClick={()=>alert("hello")}> Delete Lesson </button>}

                              </div>
                            </>
                          )}

                        </div>
                      ))}

                    </div>
                  </div>
                ))
              }

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

export default CourseSettings;
