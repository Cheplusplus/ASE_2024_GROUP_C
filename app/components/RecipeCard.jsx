"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useNotification, NOTIFICATION_TYPES } from "./NotificationContext";
import { Heart, HeartOff } from "lucide-react";
import { useMyContext2 } from "./favCountContext";
import DownloadRecipeBtn from "./DownloadRecipeBtn";

const MAX_VISIBLE_TAGS = 1;

// SVG Icons as constants for reusability and improved readability
const ClockIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
const LightningIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);
const PeopleIcon = (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const RecipeCard = ({
  recipe: { _id, title, images, prep, cook, servings, tags = [],description },
  onAddToFavourites,
  onRemoveFromFavourites,
  isFavourited = false,
}) => {
  const [stats, setStats] = useState([]);
  const [aveRating, setAveRating] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favourites, setFavourites] = useState([]);
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const { updateFavCount } = useMyContext2();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isCurrentlyFavourited, setIsCurrentlyFavourited] =
    useState(isFavourited);
  const remainingTags = tags.length - MAX_VISIBLE_TAGS;
  const { addNotification } = useNotification();
  const [reviews,setReviews] = useState([]);

  const [loadingUpdate, setLoadingUpdate] = useState(false); // State to show loading status
  const [updateMessage, setUpdateMessage] = useState(""); // Message for indication
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateDownloadedRecipes = async () => {
      const downloadedRecipes =
        JSON.parse(localStorage.getItem("downloadedRecipes")) || [];

      if (downloadedRecipes.length > 0) {
        for (let i = 0; i < downloadedRecipes.length; i++) {
          const res = downloadedRecipes[i];
          if (res._id === _id) {
            if (
              res.description === description &&
              res.reviews.length === reviews.length
            ) {
              console.log("The recipe already matches.");
              break; // Exit if the recipe matches
            } else {
              setLoadingUpdate(true); // Show the update status
              setUpdateMessage("Updating...");


                          // Simulate progress bar
            let progressValue = 0;
            const intervalId = setInterval(() => {
              progressValue += 10;
              setProgress(progressValue);
              if (progressValue >= 100) {
                clearInterval(intervalId);
              }
            }, 400); // Update progress every 700ms

              // Simulate a delay for demonstration purposes
              await new Promise((resolve) => setTimeout(resolve, 3000));

              // Update the particular recipe in downloadedRecipes
              downloadedRecipes[i] = {
                ...res,
                description,
                reviews,
              };

              localStorage.setItem(
                "downloadedRecipes",
                JSON.stringify(downloadedRecipes)
              );

              console.log("Recipe updated in downloadedRecipes.");
              setUpdateMessage("Successfully updated!");
              setTimeout(() => {setLoadingUpdate(false); setUpdateMessage("")}, 8000); // Clear message after 3 seconds
              break; // Exit after updating
            }
          }
        }
      }
    };

    const delayedUpdate = setTimeout(() => {
      updateDownloadedRecipes();
    }, 7000); // Delay by 7 seconds before calling
  
    return () => clearTimeout(delayedUpdate); // Cleanup in case of component unmount
  }, []);

  const fetchFavourites = async () => {
    try {
      const response = await fetch(`${url}/api/favourites/fav`);
      if (!response.ok) throw new Error("Failed to fetch favourites");
      const data = await response.json();
      data.favourites.some((fav) => fav._id === _id)
        ? setIsCurrentlyFavourited(true)
        : null;
      setFavourites(data.favourites);
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        console.log("123");
        const response2 = await fetch(`${url}/api/getReviews?recipeId=${_id}`, {
          cache: "force-cache",
        });

        if (!response2.ok) {
          throw new Error(`HTTP error! Status: ${response2.status}`);
        }

        const reviewsData = await response2.json();
        setReviews(reviewsData);
        setStats(reviewsData.stats);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
    fetchFavourites();
    
  }, []); // Dependency array

  const handleMouseEnter = () => {
    const id = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1000); // Change image every 1 second
    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentImageIndex(0); // Reset to the first image
  };

  const handleFavouriteClick = async (e) => {
    console.log("clicked", _id);
    e.preventDefault(); // Prevent link navigation

    try {
      const response = await fetch(`${url}/api/favourites/fav`, {
        method: isCurrentlyFavourited ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId: _id }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update favourites");
      }
      updateFavCount(isCurrentlyFavourited);
      // Update local favourited state
      setIsCurrentlyFavourited(!isCurrentlyFavourited);

      // Trigger parent component callbacks if provided
      if (isCurrentlyFavourited) {
        onRemoveFromFavourites && onRemoveFromFavourites();
        addNotification(
          `Removed "${title}" from favourites`,
          NOTIFICATION_TYPES.WARNING
        );
      } else {
        onAddToFavourites && onAddToFavourites();
        addNotification(
          `Added "${title}" to favourites`,
          NOTIFICATION_TYPES.SUCCESS
        );
      }
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPES.ERROR);
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
            src={images[currentImageIndex]}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={currentImageIndex === 0} // Preload the first image
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <button
            onClick={handleFavouriteClick}
            className="bg-white/50 p-1 right-2 top-1 rounded-full absolute hover:bg-white/75 transition-all"
          >
            {isCurrentlyFavourited ? (
              <HeartOff className="text-red-500 w-5 h-5" fill="currentColor" />
            ) : (
              <Heart className="text-gray-600 w-5 h-5" />
            )}
          </button>
          <DownloadRecipeBtn id={_id} />
        </div>
{/* Indication bar with progress bar on top of the image */}
{loadingUpdate && (
  <div className="absolute inset-x-0 top-0 bg-gray-200 bg-opacity-75 rounded-b-lg h-6 flex items-center">
    <div
      className="bg-blue-500 h-full rounded-b-lg transition-all duration-400"
      style={{ width: `${progress}%` }}
    ></div>
    <p className="absolute inset-0 text-center text-sm text-green-800">
      {updateMessage}
    </p>
  </div>
)}

        {/* Content Container */}
        <div className="p-1">
          {/* Title */}
          <h2 className="md:text-xl  text-md font-bold text-gray-800 mb-2 line-clamp-1">
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
          <p className="text-sm font-medium text-gray-700 mt-2 flex items-center gap-1">
            <span className="text-green-600">{stats.numberOfComments}</span>
            <i className="text-gray-500">reviews</i>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;