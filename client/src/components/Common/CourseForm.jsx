import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { motion } from "framer-motion";
import Input from "./Input"; // Custom Input Component
import { Trash } from "lucide-react";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const CourseForm = () => {
  const [isPaid, setIsPaid] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      thumbnail: null,
      description: "",
      preRequisites: [""],
      curriculum: [""],
      price: "",
    },
  });

  // Field arrays for dynamic inputs
  const { fields: preRequisiteFields, append: appendPreRequisite, remove: removePreRequisite } =
    useFieldArray({ control, name: "preRequisites" });

  const { fields: curriculumFields, append: appendCurriculum, remove: removeCurriculum } =
    useFieldArray({ control, name: "curriculum" });

  const onSubmit = async (data) => {

    try {
     

      const formattedData = {
        ...data , 
        thumbnail : data.thumbnail[0]
      }

      console.log(formattedData)
      const response = await axiosInstance.post("/course/create", formattedData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Course created successfully");
        navigate("/courses");
      }
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(`Error creating course ${error.message}`);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 10 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 dark:bg-[#0f182d] p-8"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1e293b] rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Create a New Course
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Input
              label="Course Title"
              placeholder="Enter course title"
              {...register("title", { required: "Course title is required" })}
              error={errors.title?.message}
            />
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Course Thumbnail
              </label>
              <input
                type="file"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                accept="image/*"
                {...register("thumbnail", { required: "Thumbnail is required" })}
              />
              {errors.thumbnail && <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>}
            </div>
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                rows="4"
                className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter course description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>
          </motion.div>

          {/* Pre-requisites */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <label className="block font-medium text-gray-700 dark:text-gray-300">
              Pre-requisites
            </label>
            {preRequisiteFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mt-2">
                <Input
                  placeholder="Enter pre-requisite"
                  {...register(`preRequisites.${index}`, {
                    required: "This field is required",
                  })}
                  error={errors?.preRequisites?.[index]?.message}
                />
                <Trash
                  className="text-red-500 cursor-pointer"
                  onClick={() => removePreRequisite(index)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendPreRequisite("")}
              className="mt-2 text-blue-500 hover:underline"
            >
              + Add Pre-requisite
            </button>
          </motion.div>

          {/* Curriculum */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block font-medium text-gray-700 dark:text-gray-300">Curriculum</label>
            {curriculumFields.map((field, index) => (
              <div key={field.id} className="flex items-center gap-2 mt-2">
                <Input
                  placeholder="Enter curriculum topic"
                  {...register(`curriculum.${index}`, {
                    required: "This field is required",
                  })}
                  error={errors?.curriculum?.[index]?.message}
                />
                <Trash
                  className="text-red-500 cursor-pointer"
                  onClick={() => removeCurriculum(index)}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendCurriculum("")}
              className="mt-2 text-blue-500 hover:underline"
            >
              + Add Curriculum Topic
            </button>
          </motion.div>

          <motion.div>
            <label className="block font-medium text-gray-700 dark:text-gray-300">Validity
            </label>
            <Input
              placeholder="Enter Validity of Course"
              {...register("validity", {
                required: "This field is required",
              })}
              error={errors?.duration?.message}
            />
          </motion.div>

          {/* Pricing & Access */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Is this course Paid?
              </label>
              <div className="flex items-center mt-2 gap-4">
                <span className="text-gray-700 dark:text-gray-300">Free</span>
                <input
                  type="checkbox"
                  checked={isPaid}
                  onClick={() => setIsPaid(!isPaid)}
                  className="toggle"
                  {...register("paid" , {
                    required: "This field is required",
                  })}
                />
                <span className="text-gray-700 dark:text-gray-300">Paid</span>
              </div>
            </div>
            {isPaid && (
              <Input
                label="Course Price"
                type="number"
                placeholder="Enter course price"
                {...register("price", {
                  required: isPaid ? "Price is required for paid courses" : false,
                })}
                error={errors.price?.message}
              />
            )}
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              Submit Course
            </button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
};

export default CourseForm;
