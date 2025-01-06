import axiosInstance from '@/utils/axiosInstance'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Progress } from "@/components/ui/progress"
import { Video, ChevronDown, ChevronUp, CheckCircle, ArrowRightCircle, ArrowLeftCircle, AlertCircle } from 'lucide-react'

function CourseContent() {
  const { id } = useParams()
  const [courseContent, setCourseContent] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")
  const [expandedSections, setExpandedSections] = useState({})
  const [courseDetails, setCourseDetails] = useState({})
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0)
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState([])
  const [errorMessage, setErrorMessage] = useState("") // To store error message

  // Fetch the course content and details
  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setIsLoading(true)
        const [contentRes, detailsRes] = await Promise.all([
          axiosInstance.get(`/course/content/${id}`),
          axiosInstance.get(`/course/details/${id}`),
        ])
  
        if (contentRes.data.success) {
          const contentData = contentRes.data.data
          setCourseContent(contentData)
  
          // Set the initial content to the first lesson
          if (contentData?.[0]?.lessons?.[0]?.content) {
            setContent(contentData[0].lessons[0].content)
          }
        } else {
          // Handle the error response if the success is false
          setErrorMessage(contentRes.data.message || "Something went wrong!")
        }
  
        if (detailsRes.data.success) {
          setCourseDetails(detailsRes.data.data)
        }
      } catch (error) {
        console.error(error)
  
        // Check if error has a response object
        if (error.response) {
          // If the error is from the server, display the error message
          setErrorMessage(error.response.data.message || "An error occurred while fetching the data.")
        } else {
          // If the error is not from the server, it could be a network issue or other error
          setErrorMessage("An unexpected error occurred.")
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchCourseData()
  }, [id])

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }))
  }

  const handleLessonCompletion = () => {
    const currentLesson = courseContent[currentSectionIndex]?.lessons[currentLessonIndex]
    setCompletedLessons((prev) => [
      ...prev, 
      currentLesson?.title || currentLesson?.lessonId
    ])
  }

  const goToNextLesson = () => {
    const currentSection = courseContent[currentSectionIndex]
    if (currentLessonIndex < currentSection?.lessons?.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
      setContent(currentSection.lessons[currentLessonIndex + 1]?.content)
    } else if (currentSectionIndex < courseContent.length - 1) {
      // Move to the next section
      setCurrentSectionIndex(currentSectionIndex + 1)
      setCurrentLessonIndex(0)
      setContent(courseContent[currentSectionIndex + 1]?.lessons[0]?.content)
    }
  }

  const goToPreviousLesson = () => {
    const currentSection = courseContent[currentSectionIndex]
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
      setContent(currentSection.lessons[currentLessonIndex - 1]?.content)
    } else if (currentSectionIndex > 0) {
      // Move to the previous section
      setCurrentSectionIndex(currentSectionIndex - 1)
      const prevSection = courseContent[currentSectionIndex - 1]
      setCurrentLessonIndex(prevSection?.lessons?.length - 1)
      setContent(prevSection?.lessons[prevSection?.lessons?.length - 1]?.content)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0f182d] py-6 px-4">
      {isLoading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center h-screen text-2xl text-white"
        >
          Loading...
        </motion.div>
      ) : errorMessage ? (
        // Display error message if there's an error
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center h-screen text-2xl"
        >
          <div className="bg-red-600 text-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            <div className="flex items-center">
              <span className="text-xl mr-3">
                <AlertCircle className="text-white" />
              </span>
              <p className="font-semibold">{errorMessage}</p>
            </div>
          </div>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Video Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-2 bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-lg"
          >
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {courseDetails.title || "Course Title"}
            </h1>
            <div className="rounded-lg overflow-hidden shadow-md bg-gray-100 dark:bg-gray-800">
              <video
                key={content}
                controls
                className="w-full rounded-md max-h-[60vh] bg-black"
                onEnded={handleLessonCompletion} // Mark lesson as completed when the video ends
              >
                <source src={content} />
              </video>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              {content ? `Currently viewing: ${content}` : "Select a lesson to start learning."}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={goToPreviousLesson}
                className="bg-gray-800 text-white p-2 rounded-full"
                disabled={currentSectionIndex === 0 && currentLessonIndex === 0}
              >
                <ArrowLeftCircle />
              </button>
              <button
                onClick={goToNextLesson}
                className="bg-gray-800 text-white p-2 rounded-full"
                disabled={
                  currentSectionIndex === courseContent.length - 1 &&
                  currentLessonIndex === courseContent[currentSectionIndex]?.lessons?.length - 1
                }
              >
                <ArrowRightCircle />
              </button>
            </div>
          </motion.div>

          {/* Sidebar Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
              Syllabus
            </h2>
            <div className="mb-6">
              <p className="font-semibold text-gray-600 dark:text-gray-400 mb-2">
                Course Progress
              </p>
              <Progress value={75} className="w-full" />
            </div>
            <div className="space-y-4">
              {courseContent.map((section) => (
                <div
                  key={section.sectionId}
                  className="bg-gray-100 dark:bg-[#0f182d] p-4 rounded-md shadow-md"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleSection(section.sectionId)}
                  >
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                      {section.title}
                    </h3>
                    {expandedSections[section.sectionId] ? (
                      <ChevronUp className="text-gray-600 dark:text-gray-400" />
                    ) : (
                      <ChevronDown className="text-gray-600 dark:text-gray-400" />
                    )}
                  </div>
                  {expandedSections[section.sectionId] && (
                    <div className="mt-4 space-y-2 border-l-2 border-blue-500 pl-4">
                      {section.lessons.map((lesson, index) => (
                        <div
                          key={lesson.title}
                          onClick={() => {
                            setCurrentLessonIndex(index)
                            setContent(lesson.content)
                          }}
                          className="flex items-center gap-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
                        >
                          <CheckCircle className={`text-sm ${index === 0 ? "text-green-500" : "text-gray-500"}`} />
                          <span>{lesson.title}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default CourseContent
