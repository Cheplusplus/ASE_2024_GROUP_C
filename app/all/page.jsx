"use client"

import React, { Suspense } from 'react';
import RecipeGrid from '../components/RecipeGrid';
import SkeletonGrid from '../components/SkeletonMain'

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
