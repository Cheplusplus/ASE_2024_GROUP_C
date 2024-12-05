// app/components/Paginate.js
"use client"
import React, {useEffect, useState} from 'react';
import { useRouter,useSearchParams  } from 'next/navigation';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useMyContext3 } from './pageNumberReset';

const RECIPES_PER_PAGE = 50; // Recipes per page
const totalRecipes = 150000;

const Paginate = ({ skip, }) => {
  const router = useRouter();
 // const [currentPage, setCurrentPage] = useState(1); // Track current page
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [searchPage, setSearchPage] = useState('')

  const category = searchParams.get('category') || '';
  const tags = searchParams.get('tags') ? searchParams.get('tags').split(',') : [];
  const numSteps = parseInt(searchParams.get('numSteps')) || '';
  const ingredients = searchParams.get('ingredients') || '';
  const sortOption = searchParams.get('sortOption') || '';
  const currentPage = Math.floor((skip || 0) / RECIPES_PER_PAGE) + 1;
  const totalPages = Math.ceil(totalRecipes / RECIPES_PER_PAGE);

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

    // NEW: Create query string preserving existing filters
    const createQueryString = (newSkip) => {
      const params = new URLSearchParams();
      
      // Add existing search parameters
      if (search) params.set('search', search);
      if (category) params.set('category', category);
      if (tags.length > 0) params.set('tags', tags.join(','));
      if (numSteps) params.set('numSteps', numSteps.toString());
      if (ingredients) params.set('ingredients', ingredients);
      if (sortOption) params.set('sortOption', sortOption);
      
      // Set the new skip value
      params.set('skip', newSkip.toString());
  
      return params.toString();
    };

  const handleNext = (newPage) => {
    const newSkip = skip + RECIPES_PER_PAGE;
    const newUrl = search || category || numSteps || sortOption || tags 
      ? `/all?search=${search}&skip=${newSkip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}` 
      : `/all?skip=${newSkip}`;
    router.push(newUrl); // Update the URL with the new skip value
  };

  /**
   * Handles the "Previous" button click by updating the current page and pushing a new URL
   * with the updated skip value.
   *
   * @param {number} newPage - The new page number to navigate to.
   */
  const handlePrevious = (newPage) => {
    const newSkip = skip > RECIPES_PER_PAGE ? skip - RECIPES_PER_PAGE : 0;
    const newUrl = search || category || numSteps || sortOption || tags 
    ? `/all?search=${search}&skip=${newSkip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}` 
    : `/all?skip=${newSkip}`;
    router.push(newUrl);
  };
  //const totalPages = Math.ceil(150000 / RECIPES_PER_PAGE);

  // NEW: Handle page change with more flexible navigation
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      const newSkip = (page - 1) * RECIPES_PER_PAGE;
      const newUrl = `/all?${createQueryString(newSkip)}`;
      router.push(newUrl);
    }
  };

  // NEW: Handle jump to page
  const handleJumpToPage = (e) => {
    e.preventDefault();
    const page = parseInt(searchPage);
    if (page >= 1 && page <= totalPages) {
      const newSkip = (page - 1) * RECIPES_PER_PAGE;
      const newUrl = `/all?${createQueryString(newSkip)}`;
      router.push(newUrl);
      setSearchPage('');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
    {/* Recipe Range Display */}
    <div className="text-center mb-4 text-gray-600">
      Showing recipes {skip + 1} - {Math.min(skip + RECIPES_PER_PAGE, totalRecipes)} of {totalRecipes}
    </div>

    <div className="flex flex-col items-center gap-4">
      {/* Pagination Controls */}
      <div className="flex items-center justify-center gap-1">
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
          onClick={() => handlePrevious(currentPage - 1)}
          disabled={skip === 0}
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
                      ? 'bg-green-600 text-white'
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
          onClick={() => handleNext(currentPage + 1)}
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
      <form onSubmit={handleJumpToPage} className="flex items-center gap-2 mt-4">
        <input
          type="number"
          value={searchPage}
          onChange={(e) => setSearchPage(e.target.value)}
          min="1"
          max={totalPages}
          placeholder="Page #"
          className="w-25 px-2 py-1 border rounded-lg"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Go
        </button>
      </form>
    </div>
  </div>
  );
};

export default Paginate;