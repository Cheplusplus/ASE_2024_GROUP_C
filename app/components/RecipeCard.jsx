import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const RecipeCard = ({ recipe }) => {
  const MAX_VISIBLE_TAGS = 2;
  const tags = recipe.tags || []; // Ensure tags is an array, even if undefined
  const remainingTags = tags.length - MAX_VISIBLE_TAGS;

  // State for the current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false); // State to control auto-sliding

  // Handle mouse enter and leave to start/stop the automatic sliding
  const handleMouseEnter = () => {
    setCurrentImageIndex(0); // Reset to first image
    setIsSliding(true); // Start the sliding effect
  };

  const handleMouseLeave = () => {
    setIsSliding(false); // Stop the sliding effect
    clearInterval(slideInterval); // Clear the interval to stop changing images
  };

  let slideInterval;

  // Auto slide function
  const autoSlide = () => {
    slideInterval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === recipe.images.length - 1 ? 0 : prevIndex + 1
      );
    }, 1000); // Change image every 2 seconds
  };

  // Effect to start/stop auto-sliding based on isSliding state
  useEffect(() => {
    if (isSliding && recipe.images.length > 1) {
      autoSlide(); // Start auto-sliding if active and there are multiple images
    } else {
      clearInterval(slideInterval); // Clear the interval if not sliding
    }

    return () => clearInterval(slideInterval); // Cleanup interval on unmount
  }, [isSliding, recipe.images.length]); // Re-run effect when isSliding or number of images changes

  return (
    <Link href={`/recipes/${recipe._id}`} className="block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="group relative bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Main Image Container */}
        <div className="relative h-64 sm:overflow-hidden">
          <img
            src={recipe.images[currentImageIndex]}
            alt={recipe.title}
            className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content Container */}
        <div className="p-6">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
            {recipe.title}
          </h2>
          
          {/* Meta Information */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
            {/* Prep Time */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Prep: {recipe.prep} mins</span>
            </div>

            {/* Cook Time */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Cook: {recipe.cook} mins</span>
            </div>

            {/* Servings */}
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{recipe.servings} servings</span>
            </div>
          </div>

          {/* Tags with "more" indicator */}
          <div className="flex flex-wrap items-center gap-2">
            {tags.slice(0, MAX_VISIBLE_TAGS).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {tag}
              </span>
            ))}
            {remainingTags > 0 && (
              <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                +{remainingTags} more
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
