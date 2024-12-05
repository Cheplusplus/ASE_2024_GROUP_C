"use client"

const SkeletonGrid = () => {
  return (
    <div className="min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {Array(12).fill("").map((_, index) => (
          <div 
            key={index} 
            className="relative overflow-hidden bg-white shadow rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            {/* Animated Gradient Loader */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
            
            {/* Image Skeleton */}
            <div className="bg-gray-100 h-48 w-full relative overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 opacity-50"></div>
            </div>
            
            {/* Text Skeleton with Staggered Animation */}
            <div className="p-4 space-y-3">
              <div 
                className="bg-gray-200 h-4 w-3/4 rounded"
                style={{ animationDelay: `${index * 0.1}s` }}
              ></div>
              <div 
                className="bg-gray-200 h-4 w-1/2 rounded"
                style={{ animationDelay: `${index * 0.1 + 0.05}s` }}
              ></div>
              <div 
                className="bg-gray-200 h-3 w-2/3 rounded"
                style={{ animationDelay: `${index * 0.1 + 0.1}s` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Custom Styles for Shimmer Effect */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default SkeletonGrid;