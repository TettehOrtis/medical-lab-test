"use client";

import React, { useState } from "react";

interface TestFormProps {
  onTestAdded?: () => void; // Callback to re-fetch tests after adding
}

export default function TestForm({ onTestAdded }: TestFormProps) {
  const [formData, setFormData] = useState({
    patientName: "",
    testType: "",
    result: "",
    testDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/tests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Test result added successfully");
        setFormData({
          patientName: "",
          testType: "",
          result: "",
          testDate: new Date().toISOString().split("T")[0],
          notes: "",
        });
        onTestAdded?.(); // Call `onTestAdded` callback if provided
      } else {
        alert("Failed to add test result");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Patient Name */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Patient Name</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="Enter patient name"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          required
        />
      </div>

      {/* Test Type */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Test Type</label>
        <input
          type="text"
          name="testType"
          value={formData.testType}
          onChange={handleChange}
          placeholder="Enter test type"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          required
        />
      </div>

      {/* Result */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Result</label>
        <input
          type="text"
          name="result"
          value={formData.result}
          onChange={handleChange}
          placeholder="Enter test result"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          required
        />
      </div>

      {/* Test Date */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Test Date</label>
        <input
          type="date"
          name="testDate"
          value={formData.testDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          required
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col">
        <label className="text-gray-700 font-medium mb-1">Notes (optional)</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes"
          className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
}