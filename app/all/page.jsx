

import React, { Suspense } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import SkeletonGrid from '../components/SkeletonMain'
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

/**
 * @function AllRecipes
 * @description The AllRecipes component renders a grid of all recipes using the RecipeGrid component.
 * @param {object} searchParams - The search parameters passed down from the parent component.
 * @returns {ReactElement} A ReactElement representing the AllRecipes component.
 */
const AllRecipes = ({searchParams}) => {

  

  return (
    <div>
       <Link href={'..'}
           
          className="mt-6 ml-6 w-36 flex items-center group text-gray-700 dark:text-gray-300 hover:text-[#26442a] dark:hover:text-[#26442a] transition-all duration-300 bg-white/10 dark:bg-gray-700/20 hover:bg-[#26442a]/10 px-4 py-2 rounded-full shadow-sm hover:shadow-md transform hover:-translate-x-2 hover:scale-105 mr-4"
        >
          <ArrowLeft 
            className="mr-2 transition-transform group-hover:-translate-x-1 group-hover:scale-110 text-[#26442a] dark:text-green-500" 
            strokeWidth={2.5} 
          />
          <span className="font-semibold text-sm uppercase tracking-wider">Back</span>
        </Link>
    <div className="relative pt-6">
    <section className="w-full">
    <Suspense fallback={<SkeletonGrid />}>
          <RecipeGrid searchParams={searchParams} />
        </Suspense>
    </section>
  </div>
  </div>
  )
}

export default AllRecipes
