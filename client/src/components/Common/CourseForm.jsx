import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "./Input"; // Custom Input Component
import { Trash, PlusCircle, CheckCircle } from "lucide-react";

const CourseForm = () => {
  const [step, setStep] = useState(1);
  const [preRequisites, setPreRequisites] = useState([""]);
  const [curriculum, setCurriculum] = useState([""]);
  const [isPaid, setIsPaid] = useState(false);

  const addField = (setter, values) => setter([...values, ""]);
  const removeField = (setter, values, index) =>
    setter(values.filter((_, i) => i !== index));
  const updateField = (setter, values, index, value) => {
    const newValues = [...values];
    newValues[index] = value;
    setter(newValues);
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f182d] p-8">
      <div className="max-w-4xl mx-auto bg-white dark:bg-[#1e293b] rounded-lg shadow-lg p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {step === 1
                ? "Basic Information"
                : step === 2
                ? "Course Modules"
                : step === 3
                ? "Pricing & Access"
                : "Preview & Publish"}
            </h1>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                    step === s ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {step === 1 && (
            <form className="space-y-6">
              <Input label="Course Title" placeholder="Enter course title" required />
              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300">
                  Course Thumbnail
                </label>
                <input
                  type="file"
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  accept="image/*"
                  required
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="w-full mt-2 px-4 py-2 border rounded-lg focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter course description"
                  required
                />
              </div>
            </form>
          )}

          {step === 2 && (
            <div>
              <label className="block font-medium text-gray-700 dark:text-gray-300">
                Pre-requisites
              </label>
              {preRequisites.map((value, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <Input
                    placeholder="Enter pre-requisite"
                    value={value}
                    onChange={(e) =>
                      updateField(setPreRequisites, preRequisites, index, e.target.value)
                    }
                  />
                  <Trash
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeField(setPreRequisites, preRequisites, index)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField(setPreRequisites, preRequisites)}
                className="mt-2 text-blue-500 hover:underline"
              >
                + Add Pre-requisite
              </button>
              <label className="block mt-6 font-medium text-gray-700 dark:text-gray-300">
                Curriculum
              </label>
              {curriculum.map((value, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <Input
                    placeholder="Enter curriculum topic"
                    value={value}
                    onChange={(e) =>
                      updateField(setCurriculum, curriculum, index, e.target.value)
                    }
                  />
                  <Trash
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeField(setCurriculum, curriculum, index)}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addField(setCurriculum, curriculum)}
                className="mt-2 text-blue-500 hover:underline"
              >
                + Add Curriculum Topic
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <div>
                <label className="block font-medium text-gray-700 dark:text-gray-300">
                  Is this course Paid?
                </label>
                <div className="flex items-center mt-2 gap-4">
                  <span className="text-gray-700 dark:text-gray-300">Free</span>
                  <input
                    type="checkbox"
                    checked={isPaid}
                    onChange={() => setIsPaid(!isPaid)}
                    className="toggle"
                  />
                  <span className="text-gray-700 dark:text-gray-300">Paid</span>
                </div>
              </div>
              {isPaid && (
                <Input
                  label="Course Price"
                  type="number"
                  placeholder="Enter course price"
                  required
                />
              )}
            </div>
          )}

          {step === 4 && (
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-gray-700 dark:text-gray-300">
                Your course is ready to be published!
              </h2>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-white rounded-lg disabled:opacity-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={nextStep}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
            >
              {step === 4 ? "Publish" : "Next"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseForm;
