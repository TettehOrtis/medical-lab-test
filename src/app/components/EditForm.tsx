"use client";

import React, { useState, useEffect } from "react";

interface Test {
  id: number;
  patientName: string;
  testType: string;
  result: string;
  testDate: string;
  notes: string;
}

interface EditFormProps {
  testId?: number;
  testData?: Test; 
  onClose?: () => void; 
  onUpdate?: (updatedTest: Test) => void; 
}

export default function EditForm({ testId, testData, onClose, onUpdate }: EditFormProps) {
  const [formData, setFormData] = useState<Test>({
    id: testData?.id || 0,
    patientName: testData?.patientName || "",
    testType: testData?.testType || "",
    result: testData?.result || "",
    testDate: testData?.testDate || "",
    notes: testData?.notes || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Fetch test data if `testId` is provided
  useEffect(() => {
    if (testId) {
      setIsLoading(true);
      fetch(`http://localhost:3000/api/tests/${testId}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching test:", err);
          setIsLoading(false);
        });
    }
  }, [testId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (testId) {
        // Update the test via API
        const response = await fetch(`http://localhost:3000/api/tests/${testId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Test result updated successfully");
          onUpdate?.(formData); // Call `onUpdate` if provided
          onClose?.(); // Call `onClose` if provided
        } else {
          alert("Failed to update test result");
        }
      } else {
        // If no `testId`, assume this is a new test and call `onUpdate`
        onUpdate?.(formData);
        onClose?.();
      }
    } catch (error) {
      console.error("Error updating test:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Test</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {/* Patient Name Input with Blue Text */}
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            placeholder="Patient Name"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-blue-600" // Changed text color to blue
            required
          />
          <input
            type="text"
            name="testType"
            value={formData.testType}
            onChange={handleChange}
            placeholder="Test Type"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            required
          />
          <input
            type="text"
            name="result"
            value={formData.result}
            onChange={handleChange}
            placeholder="Result"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            required
          />
          <input
            type="date"
            name="testDate"
            value={formData.testDate}
            onChange={handleChange}
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            required
          />
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose || (() => {})}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}