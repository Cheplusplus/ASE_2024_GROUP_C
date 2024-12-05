import React from 'react'
import { HeartIcon } from 'lucide-react'

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f4f4f4] to-[#e0e0e0] dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="relative w-56 h-56">
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <HeartIcon 
              className="w-24 h-24 text-red-500 animate-bounce" 
              strokeWidth={1} 
            />
          </div>
        </div>
      </div>
  )
}

export default Loading