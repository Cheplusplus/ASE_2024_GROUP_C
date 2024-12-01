"use client";
import React, { useState,useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MAX_VISIBLE_TAGS = 1;


// SVG Icons as constants for reusability and improved readability
const ClockIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const LightningIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
const PeopleIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const RecipeCard = ({ recipe: { _id, title, images, prep, cook, servings, tags = [] },  onAddToFavourites, onRemoveFromFavourites, isFavourited = false}) => {

  const [stats, setStats] = useState([]);
  const [aveRating,setAveRating] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response2 = await fetch(`${url}/api/getReviews?recipeId=${_id}`,{cache:'force-cache'});

        if (!response2.ok) {
          throw new Error(`HTTP error! Status: ${response2.status}`);
        }

        const reviewsData = await response2.json();
        setStats(reviewsData.stats);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    const fetchFavourites = async () => {
      try {
        const response = await fetch(`${url}/api/favourites`);
        if (!response.ok) throw new Error('Failed to fetch favourites');
        const data = await response.json();
        console.log(data,_id)
        setFavourites(data.favourites);
      } catch (error) {
        console.error('Error fetching favourites:', error);
      }
    };
    fetchFavourites();

  },[]); // Dependency array

  


  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const remainingTags = tags.length - MAX_VISIBLE_TAGS;
  const handleMouseEnter = () => {
    const id = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 1000); // Change image every 1 second
    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentImageIndex(0); // Reset to the first image
  };

  const handleFavouriteClick = async (e) => {
     console.log('clicked',_id)
    e.preventDefault(); // Prevent link navigation
    try {
      const response = await fetch(`${url}/api/favourites`, {
        method: isFavourited ? 'DELETE' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId: _id })
      });

      if (!response.ok) throw new Error('Failed to update favourites');
      if (isFavourited) {
        onRemoveFromFavourites && onRemoveFromFavourites();
      } else {
        onAddToFavourites && onAddToFavourites();
      }
    } catch (error) {
      console.error('Error updating favourites:', error);
    }
  };

  return (
    <Link href={`/recipes/${_id}`} className="block">
      <div
        className="group relative bg-card text-card-foreground rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Main Image Container */}
        <div className="relative h-40 sm:h-40  overflow-hidden">
          <Image
            priority="true"
            src={images[currentImageIndex]}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            className="transform transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw , (max-width:1200px)  50vw ,33vw"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Container */}
        <div className="p-1">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-3 line-clamp-1">
            {title}
          </h2>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-2 text-sm text-gray-600  mb-2 md:mb-4">
            <div className="flex items-center gap-1">
              {ClockIcon}
              <span>Prep: {prep} mins</span>
            </div>
            <div className="flex items-center gap-1">
              {LightningIcon}
              <span>Cook: {cook} mins</span>
            </div>
            <div className="flex items-center gap-1">
              {PeopleIcon}
              <span>{servings} servings</span>
            </div>
          </div>
          {/* Tags with "more" indicator */}
          {tags.length > 0 && (
            <div className="flex items-center gap-2">
              {/* Find the shortest tag */}
              <span
                key="shortest-tag"
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {tags.reduce(
                  (shortest, tag) =>
                    tag.length < shortest.length ? tag : shortest,
                  tags[0]
                )}
              </span>
              {remainingTags > 0 && (
                <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
                  +{remainingTags} more
                </span>
              )}
            </div>
          )}
          <p className="text-lg">
            <span className="text-yellow-500">
              {`★`.repeat(stats.averageRating)}
            </span>
            <span className="text-gray-300">
              {`★`.repeat(5 - stats.averageRating)}
            </span>
          </p>

          <p className="bold">
            {stats.numberOfComments} <i>reviews</i>{" "}
          </p>
          <button
            onClick={handleFavouriteClick}
            className="relative group focus:outline-none"
          >
            {favourites.some((fav) => fav._id === _id)? (
              // Filled Heart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7 text-red-500 transition-all duration-200 transform scale-100 group-hover:scale-110"
              >
                <path d="M12.1 18.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.4 10.05z" />
              </svg>
            ) : (
              // Outlined Heart
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-7 h-7 text-gray-600 transition-all duration-200 transform scale-100 group-hover:scale-110"
              >
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 20.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
