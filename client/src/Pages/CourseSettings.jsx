import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "@/utils/axiosInstance";

function CourseSettings() {
  const [coursesData, setCoursesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedLessons, setExpandedLessons] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessonModalOpen, setLessonModalOpen] = useState(false);
  const [sectionTitle, setSectionTitle] = useState("");
  const [lessonData, setLessonData] = useState({ title: "", content: null });
  const [currentSectionId, setCurrentSectionId] = useState("");

  const { courseId } = useParams();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axiosInstance.get(`/course/content/${courseId}`);
        setCoursesData(response.data.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const toggleLesson = (lessonId) => {
    setExpandedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }));
  };

  const addSection = async () => {
    try {
      const response = await axiosInstance.post(`/section/${courseId}/create`, {
        title: sectionTitle,
        order: coursesData.length + 1,
      });
      setCoursesData([...coursesData, response.data]);
    } catch (error) {
      console.error("Error adding section:", error);
    }
  };

  const addLesson = async () => {
    try {
      const formData = new FormData();
      formData.append("title", lessonData.title);
      formData.append("content", lessonData.content);

      await axiosInstance.post(
        `/lesson/${courseId}/${currentSectionId}/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
    } catch (error) {
      console.error("Error adding lesson:", error);
    }
  };

  const deleteLesson = async (lessonId) => {
    try {
      await axiosInstance.delete(`/lesson/${courseId}/${currentSectionId}/${lessonId}`);
      setCoursesData((prevData) => prevData.map(section => ({
        ...section,
        lessons: section.lessons.filter(lesson => lesson.lessonId !== lessonId)
      })));
    } catch (error) {
      console.error("Error deleting lesson:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-b from-gray-100 to-blue-200">
      <div className="flex-1 overflow-y-auto">
        <header className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Manage Sections & Lessons</h1>
        </header>
        <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">Loading...</div>
          ) : (
            coursesData.map(section => (
              <div key={section.sectionId} className="bg-white shadow-md rounded-md p-4 mb-2">
                <div className="flex justify-between" 
                >
                  <h2 className="text-lg font-bold text-gray-900">{section.title}</h2>
                  <button
                    className="bg-blue-200 hover:bg-blue-300 border-2 border-gray-500 rounded-md p-2"
                    onClick={() => {
                      setLessonModalOpen(true);
                    }}
                  >
                    Add Lesson
                  </button>
                </div>
                {section.lessons.map(lesson => (
                  <div key={lesson.lessonId} className="shadow-md p-4 m-3 rounded-lg">
                    <h3 className="text-lg font-bold text-gray-900" onClick={() => {
                        setCurrentSectionId(section.sectionId)  
                         toggleLesson(lesson.lessonId)
                      }}>
                      {lesson.title}
                    </h3>
                    {expandedLessons[lesson.lessonId] && (
                      <>
                        <video controls>
                          <source src={lesson.content} />
                        </video>
                        <button
                          className="bg-red-300 p-2 rounded-md"
                          onClick={() => deleteLesson(lesson.lessonId)}
                        >
                          Delete Lesson
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ))
          )}
          <button onClick={() => setIsModalOpen(true)}>Add Section</button>
          {isModalOpen && (
            <div className="fixed inset-0 bg-gray-900 opacity-90 flex justify-center items-center">
              <div className="bg-gray-700 p-10 rounded-md w-1/2">
                <input
                  placeholder="Enter section title"
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                />
                <button onClick={addSection}>Submit</button>
              </div>
            </div>
          )}
          {lessonModalOpen && (
            <div className="fixed inset-0 bg-gray-900 opacity-90 flex justify-center items-center">
              <div className="bg-gray-700 p-10 rounded-md w-1/2">
                <input
                  placeholder="Enter lesson title"
                  value={lessonData.title}
                  onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                />
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setLessonData({ ...lessonData, content: e.target.files[0] })}
                />
                <button onClick={addLesson}>Submit</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default CourseSettings;