// app/components/Paginate.js
"use client"
import React, {useEffect, useState} from 'react';
import { useRouter,useSearchParams  } from 'next/navigation';

const RECIPES_PER_PAGE = 50; // Recipes per page

const Paginate = ({ skip, totalRecipes }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1); // Track current page
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