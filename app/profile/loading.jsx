import { UserIcon, ChefHat } from 'lucide-react'

const Loading = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f4f4f4] to-[#e0e0e0] dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="relative w-64 h-64">
          <div 
            className="absolute inset-0 bg-[#26442a]/20 rounded-full animate-pulse"
            style={{ animationDuration: '2s' }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <UserIcon 
                className="w-32 h-32 text-[#26442a] animate-wiggle" 
                strokeWidth={1} 
              />
              <ChefHat 
                className="absolute top-0 right-0 w-16 h-16 text-green-600 transform translate-x-1/4 -translate-y-1/4 animate-float" 
                strokeWidth={1} 
              />
            </div>
          </div>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <p className="mt-4 text-2xl font-bold text-[#26442a] dark:text-white">
              Loading Profile...
            </p>
          </div>
        </div>
      </div>
  )
}

export default Loading