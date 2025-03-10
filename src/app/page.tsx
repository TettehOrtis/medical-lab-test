"use client";

import React, { useState } from "react";
import TestForm from "./components/TestForm";
import TestList from "./components/TestList";
import Navigation from "./components/Navigation";

export default function HomePage() {
  const [showTestList, setShowTestList] = useState(false); // State to toggle TestList visibility

  return (
    <div className="min-h-screen flex flex-col bg-blue-100">
      {/* Navbar */}
      <Navigation onToggleTestList={() => setShowTestList(!showTestList)} />

      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        {/* Change the text color of "Medical Lab App" to blue */}
        <h1 className="text-2xl font-bold mb-6 text-blue-600">Medical Lab App</h1>

        {/* Test Form */}
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md mb-8">
          <TestForm />
        </div>

        {/* Test List (Conditional Rendering) */}
        {showTestList && (
          <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
            <TestList />
          </div>
        )}
      </div>
    </div>
  );
}