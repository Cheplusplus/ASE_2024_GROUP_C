"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ViewAll from "./ui/ViewAll";
import SkeletonGrid from "./SkeletonMain";

/**
 * A component that displays a list of recipes in a carousel.
 * @param {Object} props Component props
 * @param {string} props.heading The heading to display above the carousel
 * @returns {JSX.Element} The component
 */
const Carousel = ({ heading }) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

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
        setRecipes(data.recipes); // Assuming the API response has a 'recipes' key
      } catch (error) {
        console.error("Failed to fetch data", error);
        setError(error.message);
      }
    };

    fetchRecipes();
  }, []);

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (recipes.length === 0) {
    return <SkeletonGrid />;
  }

  return (
    <div>
      <h2 className="text-center text-lg font-semibold mb-3">{heading}</h2>

      {/* Carousel */}
      <div className="flex items-center">
        <div className="flex gap-4 overflow-x-auto text-center scrollbar-hide">
          {recipes.map((recipe, index) => (
            <div key={index} className="relative min-w-[150px]">
              <Link href={`/recipes/${recipe._id}`}>
                <div className="relative w-[150px] h-[112px]">
                  <Image
                    priority={true}
                    src={recipe.images[0]}
                    alt={recipe.title}
                    fill
                     sizes="(max-width: 768px) 100px, (max-width: 1024px) 150px, 150px"
                    className="object-cover rounded-sm"

                  />
                </div>
                <p className="text-center text-sm mt-2">
                  {recipe.title.length > 20
                    ? `${recipe.title.substring(0, 10)}...`
                    : recipe.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
        {/* <div className=""><ViewAll/></div> */}
      </div>
    </div>
  );
};

export default Carousel;
