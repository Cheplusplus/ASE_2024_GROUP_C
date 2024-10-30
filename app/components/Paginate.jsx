// app/components/Paginate.js
"use client"
import React, {useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const RECIPES_PER_PAGE = 52; // Recipes per page

const Paginate = ({ skip: initialSkip, totalRecipes }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [skip, setSkip] = useState(initialSkip);
  const [search, setSearch] = useState(null) // Store skip in state

  const handleNext = (newPage) => {
    const newSkip = skip + 52;
    setCurrentPage(newPage); // Update current page
    router.push(`/?search=${new URLSearchParams(window.location.search).get('search')}&skip=${newSkip}`); // Update the URL with the new skip value
  };

  const handlePrevious = (newPage) => {
    const newSkip = skip > 52 ? skip - 52 : 0; // Prevent negative skip
    setCurrentPage(newPage); // Decrement page
    router.push(`/?search=${new URLSearchParams(window.location.search).get('search')}&skip=${newSkip}`);
  };

  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => handlePrevious(currentPage - 1) }
        disabled={skip === 0}
        className="px-4 py-2 mx-2 text-white bg-gray-500 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 mx-2 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handleNext(currentPage + 1)}
        className="px-4 py-2 mx-2 text-white bg-gray-900 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Paginate;
