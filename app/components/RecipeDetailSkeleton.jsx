import React from 'react';

const RecipeSkeleton = () => {
  return (
    <div className="animate-pulse flex flex-col lg:flex-row gap-6 p-6">
      {/* Image Skeleton */}
      <div className="w-full lg:w-1/2 h-96 bg-gray-300 rounded-lg"></div>

      {/* Text Skeleton */}
      <div className="w-full lg:w-1/2 space-y-4">
        {/* Title */}
        <div className="h-8 bg-gray-300 rounded-md w-3/4"></div>
        {/* Subtitle */}
        <div className="h-6 bg-gray-200 rounded-md w-1/2"></div>
        {/* Time and Servings */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
          <div className="h-4 bg-gray-200 rounded-md w-1/3"></div>
        </div>
        {/* Ingredients/Instructions Tabs */}
        <div className="flex space-x-4 mt-6">
          <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
          <div className="h-10 w-24 bg-gray-300 rounded-md"></div>
        </div>
        {/* Ingredients List */}
        <div className="space-y-2 mt-4">
          {Array(6).fill('').map((_, index) => (
            <div key={index} className="h-4 bg-gray-200 rounded-md w-2/3"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeSkeleton;