/**
 * SkeletonGrid
 * @description A skeleton component that displays a grid of recipe cards.
 * This component displays a low-fidelity representation of a recipe card grid, using Tailwind CSS utility classes to create a responsive layout.
 * The component displays 30 recipe card skeletons, with each skeleton containing a gray background rectangle and two placeholder text rectangles.
 * The component is intended to be used as a loading state for the recipe card grid, and can be used as a fallback when the actual recipe data is not yet available.
 * @return {JSX.Element} The skeleton component.
 * @example
 * <SkeletonGrid />
 */
const SkeletonGrid = () => {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] bg-[#f4f4f4] dark:bg-gray-900">
      {/* Hero Section Skeleton */}
      <div className="relative h-64 md:min-h-96 overflow-hidden bg-gray-300 dark:bg-gray-700 animate-pulse">
        <div className="absolute inset-0 bg-gray-400/40 dark:bg-gray-800/40"></div>
        <div className="absolute top-20 md:top-32 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-600 w-40 h-10 rounded-full"></div>
      </div>

      {/* Carousel Skeleton */}
      <div className="absolute top-52 md:top-72 z-20 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 rounded-lg w-11/12 max-w-7xl mx-auto p-4 shadow-lg">
        <div className="flex space-x-4 overflow-x-hidden">
          {Array(5).fill("").map((_, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 w-48 h-48 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-40 sm:pt-44 sm:py-16">
        {/* Recipes Section Header */}
        <div className="flex items-center mb-6">
          <div className="bg-gray-300 dark:bg-gray-700 h-8 w-1/4 rounded animate-pulse"></div>
          <div className="flex-grow ml-4 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(12).fill("").map((_, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden animate-pulse"
            >
              {/* Image Skeleton */}
              <div className="h-48 bg-gray-300 dark:bg-gray-700"></div>
              
              {/* Text Skeleton */}
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Banner Skeleton */}
        <div className="mt-16 relative h-64 md:min-h-80 overflow-hidden bg-gray-300 dark:bg-gray-700 animate-pulse">
          <div className="absolute inset-0 bg-gray-400/40 dark:bg-gray-800/40"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-200 dark:bg-gray-600 w-40 h-12 rounded-lg"></div>
          </div>
        </div>

        {/* Team Carousel Skeleton */}
        <div className="mt-16 flex space-x-4">
          {Array(4).fill("").map((_, index) => (
            <div 
              key={index} 
              className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SkeletonGrid;