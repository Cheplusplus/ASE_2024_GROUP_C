import React from 'react'
import RecipeGrid from '../components/RecipeGrid'

const AllRecipes = ({searchParams}) => {
  return (
    <div className="relative pt-6">
    <section className="w-full">
      <RecipeGrid searchParams={searchParams} />
    </section>
  </div>
  )
}

export default AllRecipes
