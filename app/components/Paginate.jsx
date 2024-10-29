// app/components/Paginate.js
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Paginate = ({ skip }) => {
  const router = useRouter();

  const handleNext = () => {
    const newSkip = skip + 52;
    router.push(`/?skip=${newSkip}`); // Update the URL with the new skip value
  };

  const handlePrevious = () => {
    const newSkip = skip > 52 ? skip - 52 : 0;
    router.push(`/?skip=${newSkip}`);
  };

  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={handlePrevious}
        disabled={skip === 0}
        className="px-4 py-2 mx-2 text-white bg-gray-500 rounded disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        className="px-4 py-2 mx-2 text-white bg-gray-900 rounded"
      >
        Next
      </button>
    </div>
  );
};

export default Paginate;
