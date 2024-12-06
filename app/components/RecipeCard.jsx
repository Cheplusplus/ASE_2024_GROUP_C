// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useNotification, NOTIFICATION_TYPES } from "./NotificationContext";
// import { Heart, HeartOff } from "lucide-react";
// import { useMyContext2 } from "./favCountContext";
// import DownloadRecipeBtn from "./DownloadRecipeBtn";

// const MAX_VISIBLE_TAGS = 1;

// // SVG Icons as constants for reusability and improved readability
// const ClockIcon = (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//     />
//   </svg>
// );
// const LightningIcon = (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M13 10V3L4 14h7v7l9-11h-7z"
//     />
//   </svg>
// );
// const PeopleIcon = (
//   <svg
//     className="w-4 h-4"
//     fill="none"
//     stroke="currentColor"
//     viewBox="0 0 24 24"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
//     />
//   </svg>
// );

// const RecipeCard = ({
//   recipe: { _id, title, images, prep, cook, servings, tags = [] },
//   onAddToFavourites,
//   onRemoveFromFavourites,
//   isFavourited = false,
// }) => {
//   const [stats, setStats] = useState([]);
//   const [aveRating, setAveRating] = useState(0);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [favourites, setFavourites] = useState([]);
//   const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
//   const { updateFavCount } = useMyContext2();

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [intervalId, setIntervalId] = useState(null);
//   const [isCurrentlyFavourited, setIsCurrentlyFavourited] =
//     useState(isFavourited);
//   const remainingTags = tags.length - MAX_VISIBLE_TAGS;
//   const { addNotification } = useNotification();

//   const fetchFavourites = async () => {
//     try {
//       const response = await fetch(`${url}/api/favourites/fav`);
//       if (!response.ok) throw new Error("Failed to fetch favourites");
//       const data = await response.json();
//       data.favourites.some((fav) => fav._id === _id)
//         ? setIsCurrentlyFavourited(true)
//         : null;
//       setFavourites(data.favourites);
//     } catch (error) {
//       console.error("Error fetching favourites:", error);
//     }
//   };

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         console.log("123");
//         const response2 = await fetch(`${url}/api/getReviews?recipeId=${_id}`, {
//           cache: "force-cache",
//         });

//         if (!response2.ok) {
//           throw new Error(`HTTP error! Status: ${response2.status}`);
//         }

//         const reviewsData = await response2.json();
//         setStats(reviewsData.stats);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//     fetchFavourites();
//   }, []); // Dependency array

//   const handleMouseEnter = () => {
//     const id = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 1000); // Change image every 1 second
//     setIntervalId(id);
//   };

//   const handleMouseLeave = () => {
//     clearInterval(intervalId);
//     setIntervalId(null);
//     setCurrentImageIndex(0); // Reset to the first image
//   };

//   const handleFavouriteClick = async (e) => {
//     console.log("clicked", _id);
//     e.preventDefault(); // Prevent link navigation

//     try {
//       const response = await fetch(`${url}/api/favourites/fav`, {
//         method: isCurrentlyFavourited ? "DELETE" : "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ recipeId: _id }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to update favourites");
//       }
//       updateFavCount(isCurrentlyFavourited);
//       // Update local favourited state
//       setIsCurrentlyFavourited(!isCurrentlyFavourited);

//       // Trigger parent component callbacks if provided
//       if (isCurrentlyFavourited) {
//         onRemoveFromFavourites && onRemoveFromFavourites();
//         addNotification(
//           `Removed "${title}" from favourites`,
//           NOTIFICATION_TYPES.WARNING
//         );
//       } else {
//         onAddToFavourites && onAddToFavourites();
//         addNotification(
//           `Added "${title}" to favourites`,
//           NOTIFICATION_TYPES.SUCCESS
//         );
//       }
//     } catch (error) {
//       addNotification(error.message, NOTIFICATION_TYPES.ERROR);
//     }
//   };

//   return (
//     <Link href={`/recipes/${_id}`} className="block">
//       <div
//         className="group relative bg-card text-card-foreground rounded-sm overflow-hidden transition-all duration-300 hover:shadow-lg"
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {/* Main Image Container */}
//         <div className="relative h-40 sm:h-40  overflow-hidden">
//           <Image
//             src={images[currentImageIndex]}
//             alt={title}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             priority={currentImageIndex === 0} // Preload the first image
//           />
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//           <button
//             onClick={handleFavouriteClick}
//             className="bg-white/50 p-1 right-2 top-1 rounded-full absolute hover:bg-white/75 transition-all"
//           >
//             {isCurrentlyFavourited ? (
//               <HeartOff className="text-red-500 w-5 h-5" fill="currentColor" />
//             ) : (
//               <Heart className="text-gray-600 w-5 h-5" />
//             )}
//           </button>

//           <DownloadRecipeBtn id={_id} />
//         </div>

//         {/* Content Container */}
//         <div className="p-1">
//           {/* Title */}
//           <h2 className="md:text-xl  text-md font-bold text-gray-800 mb-2 line-clamp-1">
//             {title}
//           </h2>

//           {/* Meta Information */}
//           <div className="flex flex-wrap gap-2 text-sm text-gray-600  mb-2 md:mb-4">
//             <div className="flex items-center gap-1">
//               {ClockIcon}
//               <span>Prep: {prep} mins</span>
//             </div>
//             <div className="flex items-center gap-1">
//               {LightningIcon}
//               <span>Cook: {cook} mins</span>
//             </div>
//             <div className="flex items-center gap-1">
//               {PeopleIcon}
//               <span>{servings} servings</span>
//             </div>
//           </div>
//           {/* Tags with "more" indicator */}
//           {tags.length > 0 && (
//             <div className="flex items-center gap-2">
//               {/* Find the shortest tag */}
//               <span
//                 key="shortest-tag"
//                 className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
//               >
//                 {tags.reduce(
//                   (shortest, tag) =>
//                     tag.length < shortest.length ? tag : shortest,
//                   tags[0]
//                 )}
//               </span>
//               {remainingTags > 0 && (
//                 <span className="px-3 py-1 text-xs font-medium text-gray-500 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors">
//                   +{remainingTags} more
//                 </span>
//               )}
//             </div>
//           )}
//           <p className="text-lg">
//             <span className="text-yellow-500">
//               {`★`.repeat(stats.averageRating)}
//             </span>
//             <span className="text-gray-300">
//               {`★`.repeat(5 - stats.averageRating)}
//             </span>
//           </p>
//           <p className="text-sm font-medium text-gray-700 mt-2 flex items-center gap-1">
//             <span className="text-green-600">{stats.numberOfComments}</span>
//             <i className="text-gray-500">reviews</i>
//           </p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default RecipeCard;

"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useNotification, NOTIFICATION_TYPES } from "./NotificationContext";
import { 
  Heart, 
  HeartOff, 
  Clock, 
  Zap, 
  Users, 
  Star, 
  MessageCircle, 
  Download 
} from "lucide-react";
import { useMyContext2 } from "./favCountContext";
import DownloadRecipeBtn from "./DownloadRecipeBtn";

const RecipeCard = ({
  recipe: { _id, title, images, prep, cook, servings, tags = [] },
  onAddToFavourites,
  onRemoveFromFavourites,
  isFavourited = false,
}) => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [isCurrentlyFavourited, setIsCurrentlyFavourited] = useState(isFavourited);
  
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const { updateFavCount } = useMyContext2();
  const { addNotification } = useNotification();

  // Fetch reviews and favourites
  useEffect(() => {
    const fetchData = async () => {
      try {
        const reviewResponse = await fetch(`${url}/api/getReviews?recipeId=${_id}`, {
          cache: "force-cache",
        });
        const reviewData = await reviewResponse.json();
        setStats(reviewData.stats);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [_id, url]);

  // Image hover effects
  const handleMouseEnter = () => {
    const id = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);
    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setCurrentImageIndex(0);
  };

  // Favourite toggle
  const handleFavouriteClick = async (e) => {
    e.preventDefault();

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
      setIsCurrentlyFavourited(!isCurrentlyFavourited);

      // Notifications
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

  // Render rating stars
  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <Star 
            key={index} 
            className={`w-4 h-4 ${
              index < rating 
                ? 'text-amber-400 fill-amber-400' 
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Link href={`/recipes/${_id}`} className="block h-full">
      <div 
        className="relative flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden 
                   transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl 
                   border border-gray-100 dark:border-gray-700"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image Section with Overlay */}
        <div className="relative h-56 overflow-hidden group">
          <Image
            src={images[currentImageIndex]}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={currentImageIndex === 0}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex space-x-2">
            <button
              onClick={handleFavouriteClick}
              className="bg-white/80 dark:bg-gray-700/80 p-2 rounded-full 
                         hover:bg-white dark:hover:bg-gray-600 
                         transition-all shadow-md"
            >
              {isCurrentlyFavourited ? (
                <HeartOff className="text-red-500 w-5 h-5" fill="currentColor" />
              ) : (
                <Heart className="text-gray-600 dark:text-gray-300 w-5 h-5" />
              )}
            </button>
            <DownloadRecipeBtn id={_id} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col flex-grow p-4 space-y-3">
          {/* Title */}
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 line-clamp-2 min-h-[56px]">
            {title}
          </h2>

          {/* Recipe Metadata */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4 text-blue-500" />
              <span>Prep: {prep} mins</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Cook: {cook} mins</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-green-500" />
              <span>{servings} servings</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium 
                           text-blue-600 dark:text-blue-300 
                           bg-blue-50 dark:bg-blue-900/30 
                           rounded-full"
              >
                {tag}
              </span>
            ))}
            {tags.length > 2 && (
              <span className="px-3 py-1 text-xs font-medium 
                             text-gray-500 dark:text-gray-400 
                             bg-gray-100 dark:bg-gray-700 
                             rounded-full">
                +{tags.length - 2} more
              </span>
            )}
          </div>

          {/* Rating and Reviews */}
          <div className="flex justify-between items-center mt-auto">
            <div className="flex items-center space-x-2">
              {renderStars(stats.averageRating || 0)}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({stats.numberOfComments || 0})
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-green-600 dark:text-green-400">
                {stats.numberOfComments} Reviews
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;