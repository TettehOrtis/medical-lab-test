"use client";

import React, { useEffect, useState } from "react";
import EditForm from "./EditForm";

interface Test {
  id: number;
  patientName: string;
  testType: string;
  result: string;
  testDate: string;
  notes: string;
}

interface TestListProps {
  tests?: Test[]; 
  onDelete?: (id: number) => void; 
  onUpdate?: (updatedTest: Test) => void; 
}

export default function TestList({ tests = [], onDelete, onUpdate }: TestListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [editTest, setEditTest] = useState<Test | null>(null);
  const [localTests, setLocalTests] = useState<Test[]>(tests);

  // Fetch tests from the API if `tests` prop is not provided
  useEffect(() => {
    if (tests.length === 0) {
      fetchTests();
    }
  }, []);

  const fetchTests = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tests");
      const data = await res.json();
      setLocalTests(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this test?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/tests/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setLocalTests(localTests.filter((test) => test.id !== id));
        onDelete?.(id); // Call `onDelete` callback if provided
      }
    } catch (err) {
      console.error("Error deleting test:", err);
    }
  };

  const handleUpdate = async (updatedTest: Test) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tests/${updatedTest.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTest),
      });
      if (res.ok) {
        setLocalTests(localTests.map((test) => (test.id === updatedTest.id ? updatedTest : test)));
        onUpdate?.(updatedTest); // Call `onUpdate` callback if provided
        setEditTest(null); // Close the edit form
      }
    } catch (err) {
      console.error("Error updating test:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-6 p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-blue-600">Test List</h2>
      <input
        type="text"
        placeholder="Search by patient name"
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />

      <ul className="space-y-2">
        {localTests.length === 0 ? (
          <p className="text-gray-500">No tests available.</p>
        ) : (
          localTests
            .filter((test) =>
              test.patientName.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((test) => (
              <li
                key={test.id}
                className="p-3 border rounded-md shadow-sm flex justify-between items-center"
              >
                <div>
                  {/* Patient Name Displayed in Blue */}
                  <p className="font-semibold text-blue-600">{test.patientName}</p>
                  <p className="text-sm text-gray-500">
                    {test.testType} - {test.result} ({test.testDate})
                  </p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setEditTest(test)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(test.id)}
                    className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
        )}
      </ul>

      {editTest && (
        <EditForm
          testData={editTest}
          onClose={() => setEditTest(null)} 
          onUpdate={handleUpdate} 
        />
      )}
    </div>
  );
}