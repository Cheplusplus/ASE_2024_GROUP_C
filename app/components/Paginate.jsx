"use client"
// import React, {useEffect, useState} from 'react';
// import { useRouter,useSearchParams  } from 'next/navigation';

// const RECIPES_PER_PAGE = 50; // Recipes per page

// const Paginate = ({ skip, totalRecipes }) => {
//   const router = useRouter();
//   const [currentPage, setCurrentPage] = useState(1); // Track current page
//   const searchParams = useSearchParams();
//   const search = searchParams.get("search") || ""; 

//   const category = searchParams.get('category') || '';
//   const tags = searchParams.get('tags') ? searchParams.get('tags').split(',') : [];
//   const numSteps = parseInt(searchParams.get('numSteps')) || '';
//   const ingredients = searchParams.get('ingredients') || '';
//   const sortOption = searchParams.get('sortOption') || '';

//   const handleNext = (newPage) => {
//     const newSkip = skip + RECIPES_PER_PAGE;
//     setCurrentPage(newPage);
//     const newUrl = search || category || numSteps || sortOption || tags ? `/?search=${search}&skip=${newSkip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}` : `/?skip=${newSkip}`
//     router.push(newUrl); // Update the URL with the new skip value
//   };

//   const handlePrevious = (newPage) => {
//     const newSkip = skip > RECIPES_PER_PAGE ? skip - RECIPES_PER_PAGE : 0;
//     setCurrentPage(newPage);
//     const newUrl = search || category || numSteps || sortOption || tags ? `/?search=${search}&skip=${newSkip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}` : `/?skip=${newSkip}`
//     router.push(newUrl);
//   };

//   const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

//   return (
//     <div className="flex justify-center mt-8">
//       <button
//         onClick={() => handlePrevious(currentPage - 1) }
//         disabled={skip === 0}
//         className="px-4 py-2 mx-2 text-white bg-gray-500 rounded disabled:opacity-50"
//       >
//         Previous
//       </button>
//       <span className="px-4 py-2 mx-2 text-gray-700">
//         Page {currentPage} of {totalPages}
//       </span>
//       <button
//         onClick={() => handleNext(currentPage + 1)}
//         className="px-4 py-2 mx-2 text-white bg-gray-900 rounded"
//       >
//         Next
//       </button>
//     </div>
//   );
// };

// export default Paginate;

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const RECIPES_PER_PAGE = 52;

const Paginate = ({ skip = 52, totalRecipes = 164959 }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchPage, setSearchPage] = useState('');
  
  // Calculate current page from skip parameter with default values
  const currentPage = Math.floor((skip || 0) / RECIPES_PER_PAGE) + 1;
  const totalPages = Math.max(1, Math.ceil(totalRecipes / RECIPES_PER_PAGE));

  // Get visible page numbers
  const getVisiblePages = () => {
    if (!totalRecipes) return [1];
    
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const createQueryString = (page) => {
    const params = new URLSearchParams(searchParams.toString());
    const newSkip = (page - 1) * RECIPES_PER_PAGE;
    params.set('skip', newSkip.toString());
    return params.toString();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`/?${createQueryString(page)}`);
    }
  };

  const handleJumpToPage = (e) => {
    e.preventDefault();
    const page = parseInt(searchPage);
    if (page >= 1 && page <= totalPages) {
      router.push(`/?${createQueryString(page)}`);
      setSearchPage('');
    }
  };

  // Calculate recipe range with safety checks
  const startRecipe = totalRecipes ? skip + 1 : 0;
  const endRecipe = Math.min((skip || 0) + RECIPES_PER_PAGE, totalRecipes || 0);

  // If there are no recipes, show a simplified view
  if (!totalRecipes) {
    return (
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="text-center text-gray-600">
          No recipes found
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Recipe Range Display */}
      <div className="text-center mb-4 text-gray-600">
        Showing recipes {startRecipe.toLocaleString()} - {endRecipe.toLocaleString()} of {totalRecipes.toLocaleString()}
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