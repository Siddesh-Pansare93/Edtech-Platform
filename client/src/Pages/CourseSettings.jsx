"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import axios from "axios"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

// Icons
import { FiSun, FiMoon, FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi"

// API Base URL

const CourseSettingsPage = ({ courseId }) => {
  const [darkMode, setDarkMode] = useState(false)
  const [course, setCourse] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchCourseData()
  }, [])

  const fetchCourseData = async () => {
    try {
      const response = await axiosInstance.get(`/courses/${courseId}`)
      setCourse(response.data)
      setSections(response.data.sections || [])
      setLoading(false)
    } catch (err) {
      setError("Failed to fetch course data")
      setLoading(false)
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  // Update Course Details
  const handleCourseUpdate = async (field, value) => {
    setCourse({ ...course, [field]: value })
    try {
      await axios.put(`${API_BASE_URL}/courses/${courseId}`, { [field]: value })
    } catch (err) {
      setError("Failed to update course")
    }
  }

  // Create Section
  const handleAddSection = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/sections/${courseId}/create`, { title: "New Section" })
      setSections([...sections, response.data])
    } catch (err) {
      setError("Failed to add section")
    }
  }

  // Update Section Title
  const handleUpdateSection = async (sectionId, title) => {
    try {
      await axios.patch(`${API_BASE_URL}/sections/${courseId}/${sectionId}`, { title })
      setSections(sections.map((s) => (s._id === sectionId ? { ...s, title } : s)))
    } catch (err) {
      setError("Failed to update section")
    }
  }

  // Delete Section
  const handleDeleteSection = async (sectionId) => {
    try {
      await axios.delete(`${API_BASE_URL}/sections/${courseId}/${sectionId}`)
      setSections(sections.filter((s) => s._id !== sectionId))
    } catch (err) {
      setError("Failed to delete section")
    }
  }

  // Add Lesson
  const handleAddLesson = async (sectionId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/lessons/${courseId}/${sectionId}/add`, { title: "New Lesson" })
      setSections(sections.map((s) => (s._id === sectionId ? { ...s, lessons: [...s.lessons, response.data] } : s)))
    } catch (err) {
      setError("Failed to add lesson")
    }
  }

  // Update Lesson Title
  const handleUpdateLesson = async (sectionId, lessonId, title) => {
    try {
      await axios.patch(`${API_BASE_URL}/lessons/${courseId}/${sectionId}/${lessonId}`, { title })
      setSections(
        sections.map((s) =>
          s._id === sectionId
            ? { ...s, lessons: s.lessons.map((l) => (l._id === lessonId ? { ...l, title } : l)) }
            : s
        )
      )
    } catch (err) {
      setError("Failed to update lesson")
    }
  }

  // Delete Lesson
  const handleDeleteLesson = async (sectionId, lessonId) => {
    try {
      await axios.delete(`${API_BASE_URL}/lessons/${courseId}/${sectionId}/${lessonId}`)
      setSections(
        sections.map((s) =>
          s._id === sectionId ? { ...s, lessons: s.lessons.filter((l) => l._id !== lessonId) } : s
        )
      )
    } catch (err) {
      setError("Failed to delete lesson")
    }
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const items = Array.from(sections)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSections(items)
  }

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>

  return (
    <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Course Settings</h1>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={toggleDarkMode}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </motion.button>
          </div>

          <motion.section className="mb-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Course Details</h2>
            <input type="text" value={course.title} onChange={(e) => handleCourseUpdate("title", e.target.value)} />
            <textarea value={course.description} onChange={(e) => handleCourseUpdate("description", e.target.value)} />
          </motion.section>

          <motion.section className="mb-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Course Sections</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {sections.map((section, index) => (
                      <Draggable key={section._id} draggableId={section._id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <input type="text" value={section.title} onChange={(e) => handleUpdateSection(section._id, e.target.value)} />
                            <button onClick={() => handleAddLesson(section._id)}><FiPlus /></button>
                            <button onClick={() => handleDeleteSection(section._id)}><FiTrash2 /></button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <button onClick={handleAddSection}>Add New Section</button>
          </motion.section>
        </div>
      </div>
    </div>
  )
}

export default CourseSettingsPage
