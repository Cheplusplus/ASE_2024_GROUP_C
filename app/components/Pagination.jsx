'use client';
import React, { useState, useEffect } from 'react';

const RECIPES_PER_PAGE = 52; // Recipes per page

const Pagination = ({ onPageChange, totalRecipes }) => {
  const [currentPage, setCurrentPage] = useState(1); // Track current page

  // Calculate total pages based on the recipe count and recipes per page
  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

  // Handler for changing pages
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    onPageChange(newPage); // Call parent function to fetch new data
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 mx-2 text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
