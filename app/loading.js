const SkeletonGrid = () => {
    // console.log('12345678ioiuygfv')
    return (
        <div className=" min-h-screen  font-[family-name:var(--font-geist-sans)]">
          <div className="bg-gray-700 h-64 w-full rounded-md"></div>
            {/* Text Skeleton */}
            <div className="space-y-2">
              
            </div>
      <div className="grid grid-cols-2  sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 p-4">
        {/* Creating 8 skeletons to mimic the recipe cards */}
        {Array(30).fill("").map((_, index) => (
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
    );
  };
  
  export default SkeletonGrid;