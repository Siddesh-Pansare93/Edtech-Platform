import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

function CourseSettings() {
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [expandedLessons, setExpandedLessons] = useState({});
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [isEditSectionModalOpen, setIsEditSectionModalOpen] = useState(false);
  const [isEditLessonModalOpen, setIsEditLessonModalOpen] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("");
  const [lessonData, setLessonData] = useState({ title: "", content: null });
  const [currentSectionId, setCurrentSectionId] = useState("");
  const [currentLessonId, setCurrentLessonId] = useState("");
  const [responseLoading, setResponseLoading] = useState(false);

  const { courseId } = useParams("courseId");

  const fetchCourseDetails = async () => {
    try {
      setIsLoading(true);
      const courseDetails = await axiosInstance.get(`/course/content/${courseId}`);
      setCoursesData(courseDetails.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching course details:", error);
      toast.error("Failed to load course details.");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  const toggleLesson = (lessonId) => {
    setExpandedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  // Add New Section
  const addSection = async () => {
    if (!sectionTitle) {
      toast.error("Section title cannot be empty");
      return;
    }

    try {
      setResponseLoading(true);
      const response = await axiosInstance.post(`/section/${courseId}/create`, {
        title: sectionTitle,
        order: coursesData.length + 1,
      });

      if (response.data.success) {
        fetchCourseDetails();
        setResponseLoading(false);
        setIsSectionModalOpen(false);
        toast.success("Section added successfully!");
      } else {
        setResponseLoading(false);
        toast.error("Failed to add section. Please try again.");
      }
    } catch (error) {
      console.error("Error adding section:", error);
      setResponseLoading(false);
      toast.error("An error occurred while adding the section. Please try again.");
    }
  };

  // Edit Section
  const editSection = async () => {
    if (!sectionTitle) {
      toast.error("Section title cannot be empty");
      return;
    }

    try {
      setResponseLoading(true);
      const response = await axiosInstance.put(`/section/${courseId}/edit/${currentSectionId}`, {
        title: sectionTitle,
      });

      if (response.data.success) {
        fetchCourseDetails();
        setResponseLoading(false);
        setIsEditSectionModalOpen(false);
        toast.success("Section updated successfully!");
      } else {
        setResponseLoading(false);
        toast.error("Failed to update section. Please try again.");
      }
    } catch (error) {
      console.error("Error editing section:", error);
      setResponseLoading(false);
      toast.error("An error occurred while editing the section. Please try again.");
    }
  };

  // Add New Lesson to a Section
  const addLesson = async () => {
    if (!lessonData.title || !lessonData.content) {
      toast.error("Lesson title and content are required.");
      return;
    }

    try {
      setResponseLoading(true);
      const formData = new FormData();
      formData.append("title", lessonData.title);
      formData.append("content", lessonData.content);

      const response = await axiosInstance.post(
        `/lesson/${courseId}/${currentSectionId}/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        fetchCourseDetails();
        setResponseLoading(false);
        setIsLessonModalOpen(false);
        toast.success("Lesson added successfully!");
      } else {
        setResponseLoading(false);
        toast.error("Failed to add lesson. Please try again.");
      }
    } catch (error) {
      console.error("Error adding lesson:", error);
      setResponseLoading(false);
      toast.error("An error occurred while adding the lesson. Please try again.");
    }
  };

  // Delete Section
  const deleteSection = async (sectionId) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      try {
        setResponseLoading(true);
        const response = await axiosInstance.delete(`/section/${courseId}/delete/${sectionId}`);

        if (response.data.success) {
          fetchCourseDetails();
          setResponseLoading(false);
          toast.success("Section deleted successfully!");
        } else {
          setResponseLoading(false);
          toast.error("Failed to delete section. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting section:", error);
        setResponseLoading(false);
        toast.error("An error occurred while deleting the section. Please try again.");
      }
    }
  };

  // Delete Lesson
  const deleteLesson = async (lessonId) => {
    try {
      setResponseLoading(true);
      const response = await axiosInstance.delete(`/lesson/${courseId}/${currentSectionId}/${lessonId}`);

      if (response.data.success) {
        fetchCourseDetails();
        setResponseLoading(false);
        toast.success("Lesson deleted successfully!");
      } else {
        setResponseLoading(false);
        toast.error("Failed to delete lesson. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting lesson:", error);
      setResponseLoading(false);
      toast.error("An error occurred while deleting the lesson. Please try again.");
    }
  };

  // Edit Lesson
  const editLesson = async () => {
    if (!lessonData.title || !lessonData.content) {
      toast.error("Lesson title and content are required.");
      return;
    }

    try {
      setResponseLoading(true);
      const formData = new FormData();
      formData.append("title", lessonData.title);
      formData.append("content", lessonData.content);

      const response = await axiosInstance.put(
        `/lesson/${courseId}/${currentSectionId}/edit/${currentLessonId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        fetchCourseDetails();
        setResponseLoading(false);
        setIsEditLessonModalOpen(false);
        toast.success("Lesson updated successfully!");
      } else {
        setResponseLoading(false);
        toast.error("Failed to update lesson. Please try again.");
      }
    } catch (error) {
      console.error("Error editing lesson:", error);
      setResponseLoading(false);
      toast.error("An error occurred while editing the lesson. Please try again.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-gray-100 to-blue-200">
      <div className="flex-1 overflow-y-auto">
        <header className="py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Manage Sections & Lessons</h1>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">Loading...</div>
          ) : (
            <div>
              {/* Sections */}
              {coursesData.map((section) => (
                <div key={section.sectionId} className="bg-white shadow-md rounded-xl p-4 mb-2">
                  <div className="w-full "
                    onClick={() => setCurrentSectionId(section.sectionId)}
                  >
                    <div className="flex justify-between">
                      <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                      <div className="flex gap-4">
                        <button
                          className="bg-blue-200 hover:bg-blue-300 hover:shadow-sm border-2 rounded-md p-2 text-black font-bold py-2"
                          onClick={() => {
                            setCurrentSectionId(section.sectionId);
                            setIsLessonModalOpen(true);
                          }}
                        >
                          Add Lesson
                        </button>
                        <button
                          className="bg-yellow-200 hover:bg-yellow-300 hover:shadow-sm border-2 rounded-md p-2 text-black font-bold py-2"
                          onClick={() => {
                            setCurrentSectionId(section.sectionId);
                            setSectionTitle(section.title);
                            setIsEditSectionModalOpen(true);
                          }}
                        >
                          Edit Section
                        </button>
                        <button
                          className="bg-red-200 hover:bg-red-300 hover:shadow-sm border-2 rounded-md p-2 text-black font-bold py-2"
                          onClick={() => deleteSection(section.sectionId)}
                        >
                          Delete Section
                        </button>
                      </div>
                    </div>
                    {section.lessons.map((lesson) => (
                      <div
                        key={lesson.lessonId}
                        className="shadow-md p-4 shadow-gray-500 m-3 rounded-lg"
                        onClick={() => toggleLesson(lesson.lessonId)}
                      >
                        <h3 className="text-lg font-bold text-gray-900 mb-3">{lesson.title}</h3>
                        {expandedLessons[lesson.lessonId] && (
                          <>
                            <video className="mb-3 max-h-[400px] bg-green-200" controls>
                              <source src={lesson.content} />
                            </video>
                            <div className="flex gap-10">
                              <button
                                className="text-black font-bold border-2 p-2 rounded-md bg-green-300"
                                onClick={() => {
                                  setCurrentLessonId(lesson.lessonId);
                                  setLessonData({
                                    title: lesson.title,
                                    content: lesson.content,
                                  });
                                  setIsEditLessonModalOpen(true);
                                }}
                              >
                                Edit Content
                              </button>
                              {lesson.content && (
                                <button
                                  className="text-black font-bold border-2 p-2 rounded-md bg-red-300"
                                  onClick={() => deleteLesson(lesson.lessonId)}
                                >
                                  Delete Lesson
                                </button>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() => setIsSectionModalOpen(true)}
                className="bg-blue-500 text-white p-2 rounded-md"
              >
                Add Section
              </button>




              {/* MODALS */}


              {isEditSectionModalOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: 50 }} // Slide up effect on close
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center"
                >
                  <motion.div
                    className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Close Button (X in the top-right) */}
                    <button
                      className="absolute top-4 right-4 text-white font-bold text-2xl hover:text-red-500 transition-all p-2 rounded-full"
                      onClick={() => setIsEditSectionModalOpen(false)}
                    >
                      &times;
                    </button>

                    <label className="block text-2xl text-white font-semibold mb-2">Edit Section Title</label>
                    <input
                      name="title"
                      placeholder="Enter the new title for the section"
                      value={sectionTitle}
                      onChange={(e) => setSectionTitle(e.target.value)}
                      className="border p-3 rounded-md w-full text-gray-900 focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-50"
                    />

                    <div className="flex gap-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition-all"
                        onClick={editSection}
                        disabled={responseLoading}
                      >
                        {responseLoading ? "Submitting..." : "Save Changes"}
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full transition-all"
                        onClick={() => setIsEditSectionModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {isLessonModalOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center"
                >
                  <motion.div
                    className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Close Button (X in the top-right) */}
                    <button
                      className="absolute top-4 right-4 text-white font-bold text-2xl hover:text-red-500 transition-all p-2 rounded-full"
                      onClick={() => setIsLessonModalOpen(false)}
                    >
                      &times;
                    </button>

                    <label className="block text-2xl text-white font-semibold mb-2">Enter Lesson Title</label>
                    <input
                      placeholder="Enter lesson title"
                      value={lessonData.title}
                      onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                      className="border p-3 rounded-md w-full text-gray-900 focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-50"
                    />
                    <label className="block text-2xl text-white font-semibold mb-2">Upload Content</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setLessonData({ ...lessonData, content: e.target.files[0] })}
                      className="border p-3 rounded-md w-full text-gray-900 focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-50"
                    />

                    <div className="flex gap-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition-all"
                        onClick={addLesson}
                        disabled={responseLoading}
                      >
                        {responseLoading ? "Submitting..." : "Submit"}
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full transition-all"
                        onClick={() => setIsLessonModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {isSectionModalOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center"
                >
                  <motion.div
                    className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Close Button (X in the top-right) */}
                    <button
                      className="absolute top-4 right-4 text-white font-bold text-2xl hover:text-red-500 transition-all p-2 rounded-full"
                      onClick={() => setIsSectionModalOpen(false)}
                    >
                      &times;
                    </button>

                    <label className="block text-2xl text-white font-semibold mb-2">Enter Section Title</label>
                    <input
                      name="title"
                      placeholder="Enter the Title of the Section"
                      value={sectionTitle}
                      onChange={(e) => setSectionTitle(e.target.value)}
                      className="border p-3 rounded-md w-full text-gray-900 focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-50"
                    />

                    <div className="flex gap-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition-all"
                        onClick={addSection}
                        disabled={responseLoading}
                      >
                        {responseLoading ? "Submitting..." : "Submit"}
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full transition-all"
                        onClick={() => setIsSectionModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {isEditLessonModalOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: 50 }} // Slide-up effect when closing
                  transition={{ duration: 0.3 }}
                  className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center"
                >
                  <motion.div
                    className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 relative"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Close Button (X in the top-right) */}
                    <button
                      className="absolute top-4 right-4 text-white font-bold text-2xl hover:text-red-500 transition-all p-2 rounded-full"
                      onClick={() => setIsEditLessonModalOpen(false)}
                    >
                      &times;
                    </button>

                    <label className="block text-2xl text-white font-semibold mb-2">Edit Lesson Title</label>
                    <input
                      placeholder="Enter the lesson title"
                      value={lessonData.title}
                      onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                      className="border p-3 rounded-md w-full text-gray-900 focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-50"
                    />
                    <label className="block text-2xl text-white font-semibold mb-2">Update Video</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setLessonData({ ...lessonData, content: e.target.files[0] })}
                      className="border p-3 rounded-md w-full text-gray-900 focus:ring-2 focus:ring-blue-500 mb-4 bg-gray-50"
                    />

                    <div className="flex gap-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded-md w-full transition-all"
                        onClick={editLesson}
                        disabled={responseLoading}
                      >
                        {responseLoading ? "Submitting..." : "Save Changes"}
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 rounded-md w-full transition-all"
                        onClick={() => setIsEditLessonModalOpen(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}



            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CourseSettings;
