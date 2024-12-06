"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import SkeletonGrid from "./SkeletonMain";

/**
 * A component that displays a list of recipes in a carousel.
 * @param {Object} props Component props
 * @param {string} props.heading The heading to display above the carousel
 * @returns {JSX.Element} The component
 */
const Carousel = ({ heading, autoSlide = true, slideInterval = 3000 }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const intervalRef = useRef(null);
  const [isAutoSliding, setIsAutoSliding] = useState(autoSlide);

  // Fetch recipes
  useEffect(() => {
  /**
   * Fetches 10 recipes from the API and updates the state with the data
   * @throws {Error} If the request fails
   * @returns {Promise<void>}
   */
    const fetchRecipes = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${url}/api/10Recipes`, {
          cache: "force-cache",
        });
        if (!res.ok) {
          throw new Error("Failed to fetch recipes");
        }
        const data = await res.json();
        setRecipes(data.recipes);
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError(error.message);
      }
    };

    fetchRecipes();
  }, []);

  // Auto-sliding logic
  const slideToNextRecipe = useCallback(() => {
    if (!carouselRef.current || !isAutoSliding) return;

    const carousel = carouselRef.current;
    const cardWidth =
      carousel.querySelector("div[data-carousel-item]")?.offsetWidth || 0;
    const scrollAmount = cardWidth + 16; // Width + gap

    carousel.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });

    setCurrentSlide((prev) => (prev < recipes.length - 1 ? prev + 1 : 0));
  }, [isAutoSliding, recipes.length]);

  // Setup auto-sliding interval
  useEffect(() => {
    if (isAutoSliding && recipes.length > 0) {
      intervalRef.current = setInterval(slideToNextRecipe, slideInterval);
      return () => clearInterval(intervalRef.current);
    }
  }, [isAutoSliding, slideToNextRecipe, slideInterval, recipes.length]);

  // Manual navigation
  const handleManualNavigation = (direction) => {
    // Stop auto-sliding when user manually navigates
    setIsAutoSliding(false);

    if (!carouselRef.current) return;

    const carousel = carouselRef.current;
    const cardWidth =
      carousel.querySelector("div[data-carousel-item]")?.offsetWidth || 0;
    const scrollAmount = cardWidth + 16;

    if (direction === "next") {
      carousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setCurrentSlide((prev) => (prev < recipes.length - 1 ? prev + 1 : 0));
    } else {
      carousel.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : recipes.length - 1));
    }
  };

  // Toggle auto-sliding
  const toggleAutoSliding = () => {
    setIsAutoSliding((prev) => !prev);
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (recipes.length === 0) {
    return <SkeletonGrid />;
  }

  return (
    <div className="relative">
      <h2 className="text-center text-lg font-semibold mb-3">{heading}</h2>

      <div className="relative flex items-center">
        {/* Previous Button */}
        <button
          onClick={() => handleManualNavigation("prev")}
          className="absolute left-0 z-10 bg-white/70 rounded-full p-2 shadow-md"
        >
          ←
        </button>

        {/* Carousel Scrollable Area */}
        <div
          ref={carouselRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {recipes.map((recipe, index) => (
            <div
              key={index}
              data-carousel-item
              className="flex-shrink-0 w-[250px] h-[187px]"
            >
              <Link href={`/recipes/${recipe._id}`} className="block">
                <div className="relative w-full h-[160px]">
                  <Image
                    src={recipe.images[0]}
                    alt={recipe.title}
                    fill
                    loading="lazy" // Defer loading for better performance
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 250px"
                    className="object-cover rounded-sm"
                  />
                </div>
                <p className="text-center text-sm mt-2 truncate">
                  {recipe.title}
                </p>
              </Link>
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handleManualNavigation("next")}
          className="absolute right-0 z-10 bg-white/70 rounded-full p-2 shadow-md"
        >
          →
        </button>

        {/* Auto-slide Toggle */}
        <button
          onClick={toggleAutoSliding}
          className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 
                     bg-gray-200 px-3 py-1 rounded-full text-xs"
        >
          {isAutoSliding ? "Pause Auto-Slide" : "Resume Auto-Slide"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
