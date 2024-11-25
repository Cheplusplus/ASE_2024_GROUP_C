"use client"
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const RECIPES_PER_PAGE = 50;

const Paginate = ({ skip = 50, totalRecipes = 240, filteredCount = null }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || ""; 

  const category = searchParams.get('category') || '';
  const tags = searchParams.get('tags') ? searchParams.get('tags').split(',') : [];
  const numSteps = parseInt(searchParams.get('numSteps')) || '';
  const ingredients = searchParams.get('ingredients') || '';
  const sortOption = searchParams.get('sortOption') || '';

  const handleNext = (newPage) => {
    const newSkip = skip + RECIPES_PER_PAGE;
    setCurrentPage(newPage);
    const newUrl = search || category || numSteps || sortOption || tags ? `/all?search=${search}&skip=${newSkip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}` : `/all?skip=${newSkip}`
    router.push(newUrl); // Update the URL with the new skip value
  };

  const handlePrevious = (newPage) => {
    const newSkip = skip > RECIPES_PER_PAGE ? skip - RECIPES_PER_PAGE : 0;
    setCurrentPage(newPage);
    const newUrl = search || category || numSteps || sortOption || tags ? `/all?search=${search}&skip=${newSkip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}` : `/all?skip=${newSkip}`
    router.push(newUrl);
  };
  const totalPages = Math.ceil(150000 / RECIPES_PER_PAGE);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Recipe Range Display */}
      <div className="text-center mb-4 text-gray-600">
        Showing recipes {startRecipe.toLocaleString()} - {endRecipe.toLocaleString()} of {activeTotal.toLocaleString()}
        {filteredCount !== null && filteredCount !== totalRecipes && (
          <span className="ml-2 text-sm text-gray-500">
            (filtered from {totalRecipes.toLocaleString()} total recipes)
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Pagination Controls */}
        <div className="flex items-center gap-1">
          {/* First Page */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            aria-label="First page"
          >
            <ChevronsLeft className="w-5 h-5" />
          </button>

          {/* Previous Page */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {getVisiblePages().map((page, index) => (
              <React.Fragment key={index}>
                {page === '...' ? (
                  <span className="px-3 py-2">...</span>
                ) : (
                  <button
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Next Page */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Last Page */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            aria-label="Last page"
          >
            <ChevronsRight className="w-5 h-5" />
          </button>
        </div>

        {/* Jump to Page Form */}
        <form onSubmit={handleJumpToPage} className="flex items-center gap-2">
          <input
            type="number"
            value={searchPage}
            onChange={(e) => setSearchPage(e.target.value)}
            min="1"
            max={totalPages}
            placeholder="Page #"
            className="w-20 px-2 py-1 border rounded-lg"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Go
          </button>
        </form>
      </div>
    </div>
  );
};

export default Paginate;