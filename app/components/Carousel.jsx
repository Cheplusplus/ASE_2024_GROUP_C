"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ViewAll from "./ui/ViewAll";
import SkeletonGrid from "./SkeletonMain";



const Carousel = ({heading}) => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
        const res = await fetch(`${url}/api/10Recipes`, {cache: "force-cache"});
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

  if(recipes.length === 0) {
    return (
      <SkeletonGrid/>
    )
  }

  return (
    <div >
      <h2 className="text-center text-lg font-semibold mb-3">
        {heading}
      </h2>

      {/* Carousel */}
      <div className="flex items-center">
        <div className="flex gap-4 overflow-x-auto text-center scrollbar-hide">
          {recipes.map((recipe, index) => (
            <div key={index} className="min-w-[150px]">
              <Link href={`/recipes/${recipe._id}`}>
                <Image
                  priority={true}
                  style={{ objectFit: "cover", width: "auto", height: "112px" }}
                  src={recipe.images[0]}
                  alt={recipe.title}
                  width={150}
                  height={150}
                  className="rounded-sm"
                />
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
