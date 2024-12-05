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
    <div className=" min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="bg-gray-700 h-64 w-full rounded-md"></div>
      {/* Text Skeleton */}
      <div className="space-y-2"></div>
      <div className="p-8 pb-20 gap-16 sm:p-20 ">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {/* Creating 8 skeletons to mimic the recipe cards */}
          {Array(30)
            .fill("")
            .map((_, index) => (
              <div
                key={index}
                className="animate-pulse p-2 bg-white shadow rounded-lg space-y-4"
              >
                {/* Image Skeleton */}
                <div className="bg-gray-700 h-40 w-full rounded-md"></div>
                {/* Text Skeleton */}
                <div className="space-y-2">
                  <div className="bg-gray-200 h-4 w-3/4 rounded"></div>
                  <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonGrid;
