  import React, { useEffect, useState, useCallback } from "react"
  import { useParams } from "react-router-dom"
  import axiosInstance from "@/utils/axiosInstance"
  import { toast } from "react-toastify"
  import { motion, AnimatePresence } from "framer-motion"
  import { X, ChevronDown, ChevronUp, Edit, Trash2, Plus, Video, FileVideo } from "lucide-react"

  function CourseSettings() {
    const [coursesData, setCoursesData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [expandedLessons, setExpandedLessons] = useState({})
    const [sectionTitle, setSectionTitle] = useState("")
    const [lessonData, setLessonData] = useState({ title: "", content: null })
    const [currentSectionId, setCurrentSectionId] = useState("")
    const [currentLessonId, setCurrentLessonId] = useState("")
    const [responseLoading, setResponseLoading] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalType, setModalType] = useState("")

    const { courseId } = useParams()

    const fetchCourseDetails = useCallback(async () => {
      try {
        setIsLoading(true)
        const courseDetails = await axiosInstance.get(`/course/content/${courseId}`)
        setCoursesData(courseDetails.data.data)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching course details:", error)
        toast.error("Failed to load course details.")
        setIsLoading(false)
      }
    }, [courseId])

    useEffect(() => {
      fetchCourseDetails()
    }, [fetchCourseDetails])

    const toggleLesson = (lessonId) => {
      setExpandedLessons((prev) => ({ ...prev, [lessonId]: !prev[lessonId] }))
    }

    const openModal = (type, sectionId = "", lessonId = "") => {
      setModalType(type)
      setCurrentSectionId(sectionId)
      setCurrentLessonId(lessonId)
      setIsModalOpen(true)
    }

    const closeModal = () => {
      setIsModalOpen(false)
      setSectionTitle("")
      setLessonData({ title: "", content: null })
    }

    const addSection = async () => {
      if (!sectionTitle) {
        toast.error("Section title cannot be empty")
        return
      }

      try {
        setResponseLoading(true)
        const response = await axiosInstance.post(`/section/${courseId}/create`, {
          title: sectionTitle,
          order: coursesData.length + 1,
        })

        if (response.data.success) {
          fetchCourseDetails()
          setResponseLoading(false)
          setSectionTitle("")
          closeModal()
          toast.success("Section added successfully!")
        } else {
          setResponseLoading(false)
          toast.error("Failed to add section. Please try again.")
        }
      } catch (error) {
        console.error("Error adding section:", error)
        setResponseLoading(false)
        toast.error("An error occurred while adding the section. Please try again.")
      }
    }

    const editSection = async () => {
      if (!sectionTitle) {
        toast.error("Section title cannot be empty")
        return
      }

      try {
        setResponseLoading(true)
        const response = await axiosInstance.patch(`/section/${courseId}/${currentSectionId}`, {
          title: sectionTitle,
        })

        if (response.data.success) {
          fetchCourseDetails()
          setResponseLoading(false)
          setSectionTitle("")
          closeModal()
          toast.success("Section updated successfully!")
        } else {
          setResponseLoading(false)
          toast.error("Failed to update section. Please try again.")
        }
      } catch (error) {
        console.error("Error editing section:", error)
        setResponseLoading(false)
        toast.error("An error occurred while editing the section. Please try again.")
      }
    }

    const addLesson = async () => {
      if (!lessonData.title || !lessonData.content) {
        toast.error("Lesson title and content are required.")
        return
      }

      try {
        setResponseLoading(true)
        const formData = new FormData()
        formData.append("title", lessonData.title)
        formData.append("content", lessonData.content)

        const response = await axiosInstance.post(`/lesson/${courseId}/${currentSectionId}/add`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })

        if (response.data.success) {
          fetchCourseDetails()
          setResponseLoading(false)
          setLessonData({ title: "", content: null })
          closeModal()
          toast.success("Lesson added successfully!")
        } else {
          setResponseLoading(false)
          toast.error("Failed to add lesson. Please try again.")
        }
      } catch (error) {
        console.error("Error adding lesson:", error)
        setResponseLoading(false)
        toast.error("An error occurred while adding the lesson. Please try again.")
      }
    }

    const deleteSection = async (sectionId) => {
      if (window.confirm("Are you sure you want to delete this section?")) {
        try {
          setResponseLoading(true)
          const response = await axiosInstance.delete(`/section/${courseId}/delete/${sectionId}`)

          if (response.data.success) {
            fetchCourseDetails()
            setResponseLoading(false)
            toast.success("Section deleted successfully!")
          } else {
            setResponseLoading(false)
            toast.error("Failed to delete section. Please try again.")
          }
        } catch (error) {
          console.error("Error deleting section:", error)
          setResponseLoading(false)
          toast.error("An error occurred while deleting the section. Please try again.")
        }
      }
    }

    const deleteLesson = async (lessonId) => {
      if (window.confirm("Are you sure you want to delete this lesson?")) {
        try {
          setResponseLoading(true)
        console.log("section : " ,currentSectionId)

          const response = await axiosInstance.delete(`/lesson/${courseId}/${currentSectionId}/${lessonId}`)

          if (response.data.success) {
            fetchCourseDetails()
            setResponseLoading(false)
            toast.success("Lesson deleted successfully!")
          } else {
            setResponseLoading(false)
            toast.error("Failed to delete lesson. Please try again.")
          }
        } catch (error) {
          console.error("Error deleting lesson:", error)
          setResponseLoading(false)
          toast.error("An error occurred while deleting the lesson. Please try again.")
        }
      }
    }

    const editLesson = async () => {
      if (!lessonData.title || !lessonData.content) {
        toast.error("Lesson title and content are required.")
        return
      }

      try {
        setResponseLoading(true)
        const formData = new FormData()
        formData.append("title", lessonData.title)
        formData.append("content", lessonData.content)
      
        const response = await axiosInstance.patch(
          `/lesson/${courseId}/${currentSectionId}/${currentLessonId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        )

        if (response.data.success) {
          fetchCourseDetails()
          setResponseLoading(false)
          setLessonData({ title: "", content: null })
          closeModal()
          toast.success("Lesson updated successfully!")
        } else {
          setResponseLoading(false)
          toast.error("Failed to update lesson. Please try again.")
        }
      } catch (error) {
        console.error("Error editing lesson:", error)
        setResponseLoading(false)
        toast.error("An error occurred while editing the lesson. Please try again.")
      }
    }

    const modalVariants = {
      hidden: { 
        opacity: 0,
        scale: 0.9,
        y: 20,
        rotateX: -15
      },
      visible: { 
        opacity: 1,
        scale: 1,
        y: 0,
        rotateX: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 300
        }
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: -20,
        rotateX: 15,
        transition: {
          duration: 0.2
        }
      }
    }

    const backdropVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration: 0.3
        }
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.2
        }
      }
    }

    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900 via-slate-900 to-black text-white p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 relative">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Course Settings
              </h1>
              <p className="text-lg text-blue-300/80 font-light">
                Manage your course content and structure
              </p>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 blur-3xl -z-10" />
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1],
                  borderRadius: ["50% 50% 50% 50%", "40% 60% 60% 40%", "50% 50% 50% 50%"]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 border-4 border-blue-500/30 border-t-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
              />
            </div>
          ) : (
            <div className="space-y-8">
              <AnimatePresence mode="popLayout">
                {coursesData.map((section, index) => (
                  <motion.div
                    key={section.sectionId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-2xl blur-xl transition-all duration-300 group-hover:blur-2xl" />
                    <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,0,0,0.18)]">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-3xl font-light text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text">
                          {section.title}
                        </h2>
                        <div className="flex space-x-3">
                          <motion.button
                            whileHover={{ scale: 1.05, rotate: 5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setCurrentSectionId(section.sectionId)
                              setSectionTitle(section.title)
                              setModalType("editSection")
                              setIsModalOpen(true)
                            }}
                            className="p-2.5 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 transition-colors duration-300 border border-yellow-500/20"
                          >
                            <Edit size={20} className="stroke-[1.5]" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05, rotate: -5 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => deleteSection(section.sectionId)}
                            className="p-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors duration-300 border border-red-500/20"
                          >
                            <Trash2 size={20} className="stroke-[1.5]" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {section.lessons?.map((lesson, lessonIndex) => (
                          <motion.div
                            key={lesson.lessonId}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: lessonIndex * 0.1 }}
                            className="group/lesson relative bg-white/[0.02] hover:bg-white/[0.04] rounded-xl p-5 border border-white/5 transition-all duration-300"
                          >
                            <div
                              className="flex items-center justify-between cursor-pointer"
                              onClick={() => toggleLesson(lesson.lessonId)}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                  <FileVideo size={20} className="stroke-[1.5]" />
                                </div>
                                <h3 className="text-xl font-light text-blue-100 group-hover/lesson:text-blue-300 transition-colors duration-300">
                                  {lesson.title}
                                </h3>
                              </div>
                              <motion.div
                                animate={{ rotate: expandedLessons[lesson.lessonId] ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                                className="text-blue-400/70"
                              >
                                <ChevronDown size={24} className="stroke-[1.5]" />
                              </motion.div>
                            </div>

                            <AnimatePresence>
                              {expandedLessons[lesson.lessonId] && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="mt-6 space-y-4"
                                >
                                  <div className="relative rounded-xl overflow-hidden border border-white/10">
                                    <video
                                      className="w-full h-[400px] "
                                      controls
                                      src={lesson.content}
                                    />
                                  </div>
                                  <div className="flex space-x-3">
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => {
                                        setCurrentSectionId(section.sectionId)
                                        setCurrentLessonId(lesson.lessonId)
                                        console.log(lesson.lessonId)
                                        setLessonData({
                                          title: lesson.title,
                                          content: lesson.content,
                                        })
                                        setModalType("editLesson")
                                        setIsModalOpen(true)
                                      }}
                                      className="flex-1 px-4 py-2.5 rounded-xl bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 transition-all duration-300 border border-yellow-500/20 font-medium"
                                    >
                                      Edit Lesson
                                    </motion.button>
                                    <motion.button
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                      onClick={() => deleteLesson(lesson.lessonId)}
                                      className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all duration-300 border border-red-500/20 font-medium"
                                    >
                                      Delete Lesson
                                    </motion.button>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </motion.div>
                        ))}

                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            setCurrentSectionId(section.sectionId)
                            setModalType("addLesson")
                            setIsModalOpen(true)
                          }}
                          className="w-full px-5 py-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20 text-white/90 transition-all duration-300 border border-white/10 flex items-center justify-center space-x-2 group/add"
                        >
                          <Plus size={20} className="stroke-[1.5] transition-transform duration-300 group-hover/add:rotate-180" />
                          <span className="font-medium">Add New Lesson</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setModalType("addSection")
                  setIsModalOpen(true)
                }}
                className="w-full px-6 py-5 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 hover:from-blue-600/30 hover:via-purple-600/30 hover:to-pink-600/30 text-white transition-all duration-300 border border-white/10 flex items-center justify-center space-x-3 group/new relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-xl opacity-0 group-hover/new:opacity-100 transition-opacity duration-300" />
                <Plus size={24} className="stroke-[1.5] relative z-10 transition-transform duration-300 group-hover/new:rotate-180" />
                <span className="text-lg font-medium relative z-10">Add New Section</span>
              </motion.button>
            </div>
          )}
        </div>

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              className="fixed inset-0 z-10 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

              <motion.div
                variants={modalVariants}
                className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
                
                <motion.div
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="absolute right-4 top-4 p-2 cursor-pointer rounded-full bg-white/5 hover:bg-white/10 transition-colors duration-300 z-20"
                >
                  <X className="w-5 h-5 text-white/80   "  />
                </motion.div>

                <div className="p-8 relative z-10">
                  <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {modalType === "addSection" && "Create New Section"}
                    {modalType === "editSection" && "Update Section"}
                    {modalType === "addLesson" && "Add New Lesson"}
                    {modalType === "editLesson" && "Update Lesson"}
                  </h2>
                  <p className="text-blue-300/80 mb-8 font-light">
                    {modalType.includes("Section") 
                      ? "Organize your course content with clear sections"
                      : "Add engaging video content for your students"}
                  </p>

                  <div className="space-y-6">
                    {(modalType === "addSection" || modalType === "editSection") && (
                      <div className="relative group">
                        <input
                          type="text"
                          value={sectionTitle}
                          onChange={(e) => setSectionTitle(e.target.value)}
                          placeholder="Enter section title"
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 placeholder:text-white/30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>
                    )}

                    {(modalType === "addLesson" || modalType === "editLesson") && (
                      <>
                        <div className="relative group">
                          <input
                            type="text"
                            value={lessonData.title}
                            onChange={(e) => setLessonData({ ...lessonData, title: e.target.value })}
                            placeholder="Enter lesson title"
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 placeholder:text-white/30"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                        <div className="relative group">
                          <input
                            type="file"
                            accept="video/*"
                            onChange={(e) => setLessonData({ ...lessonData, content: e.target.files[0] })}
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-500/20 file:text-blue-300 hover:file:bg-blue-500/30 transition-all duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex justify-end space-x-3 mt-8">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-300 font-medium"
                      onClick={closeModal}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative group"
                      onClick={() => {
                        if (modalType === "addSection") addSection()
                        if (modalType === "editSection") editSection()
                        if (modalType === "addLesson") addLesson()
                        if (modalType === "editLesson") editLesson()
                      }}
                      disabled={responseLoading}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
                      <span className="relative z-10">
                        {responseLoading ? (
                          <div className="flex items-center space-x-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          "Save Changes"
                        )}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  export default CourseSettings