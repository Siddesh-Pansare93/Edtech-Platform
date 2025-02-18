import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PaperClipIcon } from "@heroicons/react/24/outline";

function CreateLessonForm({ courseId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("courseId", courseId);
      if (videoFile) {
        formData.append("video", videoFile);
      }

      await axiosInstance.post("/lessons/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Lesson created successfully!");
      setTitle("");
      setDescription("");
      setVideoFile(null);
    } catch (err) {
      setError("Failed to create lesson. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto"
    >
      <h2 className="text-xl font-bold text-gray-800 mb-4">Create New Lesson</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Lesson Title</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Lesson Description</label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className=" text-sm font-medium text-gray-700 flex items-center">
            <PaperClipIcon className="w-5 h-5 mr-2 text-gray-500" />
            Upload Lesson Video
          </label>
          <input type="file" accept="video/*" onChange={handleFileChange} className="mt-2" />
          {videoFile && <p className="text-sm text-gray-600 mt-1">Selected: {videoFile.name}</p>}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md shadow-sm hover:bg-blue-700 disabled:bg-gray-400"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Lesson"}
        </button>
      </form>

      <div className="mt-4">
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    </motion.div>
  );
}

export default CreateLessonForm;
