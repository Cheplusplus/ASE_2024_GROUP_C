"use client"

import React, { Suspense } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import SkeletonGrid from '../components/SkeletonMain'

/**
 * @function AllRecipes
 * @description The AllRecipes component renders a grid of all recipes using the RecipeGrid component.
 * @param {object} searchParams - The search parameters passed down from the parent component.
 * @returns {ReactElement} A ReactElement representing the AllRecipes component.
 */
const AllRecipes = ({searchParams}) => {
  return (
    <div className="relative pt-6">
    <section className="w-full">
    <Suspense fallback={<SkeletonGrid />}>
          <RecipeGrid searchParams={searchParams} />
        </Suspense>
    </section>
  </div>
  )
}

export default AllRecipes
