"use client";

import React from "react";
import Link from "next/link"; 

interface NavigationProps {
  onToggleTestList: () => void; 
}

const Navigation = ({ onToggleTestList }: NavigationProps) => {
  return (
    <nav className="bg-blue-700 text-white py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Medical Lab Test Manager
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-blue-200 transition-colors">
            Dashboard
          </Link>
          <button
            onClick={onToggleTestList}
            className="hover:text-blue-200 transition-colors"
          >
            Show/Hide Test List
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;