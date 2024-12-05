import React from 'react'
const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f4f4f4] to-[#e0e0e0] dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 bg-[#26442a]/20 rounded-full animate-ping"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-[#26442a] rounded-full flex items-center justify-center">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 100 100" 
                className="w-20 h-20 text-white animate-spin"
              >
                <path 
                  fill="currentColor" 
                  d="M50 10a40 40 0 0 0 0 80 40 40 0 0 0 0-80zm0 70a30 30 0 1 1 0-60 30 30 0 0 1 0 60z"
                />
                <path 
                  fill="currentColor" 
                  d="M50 20a30 30 0 0 1 30 30 10 10 0 0 0 20 0 50 50 0 1 0-50 50 10 10 0 0 0 0-20 30 30 0 0 1-30-30 10 10 0 0 0-20 0 50 50 0 1 0 50-50z"
                />
              </svg>
            </div>
          </div>
        </div>
        <p className="mt-8 text-2xl font-bold text-[#26442a] dark:text-white">
          Loading Recipes...
        </p>
      </div>
  )
}

export default Loading;
