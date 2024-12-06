"use client";

import React, { useState, useEffect } from "react";
import {
  ChefHat,
  Slice,
  Salad,
  Soup,
  CookingPot,
  UtensilsCrossed,
  Apple,
} from "lucide-react";

const LoadingStages = [
  {
    icon: Slice,
    text: "Sharpening knives...",
    color: "orange-500",
    progress: "w-1/3",
  },
  {
    icon: Salad,
    text: "Chopping fresh ingredients...",
    color: "green-500",
    progress: "w-1/2",
  },
  {
    icon: CookingPot,
    text: "Bringing flavors to life...",
    color: "red-500",
    progress: "w-2/3",
  },
  {
    icon: UtensilsCrossed,
    text: "Setting the table...",
    color: "blue-500",
    progress: "w-3/4",
  },
  {
    icon: Apple,
    text: "Final taste test...",
    color: "yellow-500",
    progress: "w-5/6",
  },
];

const ShoppingListLoading = () => {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStage((prev) => (prev + 1) % LoadingStages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const stage = LoadingStages[currentStage];

  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="relative w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl p-8 overflow-hidden border-4 border-yellow-200 transform transition-all duration-500 ease-in-out hover:scale-105">
          {/* Background Ingredient Animation */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 overflow-hidden">
            <div className="animate-kitchen-scene">
              {["🥕", "🍅", "🥬", "🧅", "🫑"].map((emoji, index) => (
                <div
                  key={index}
                  className={`absolute animate-float`}
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Main Loading Content */}
          <div className="relative z-10 flex flex-col items-center space-y-6">
            {/* Animated Chef Hat */}
            <div className="relative">
              <div className="absolute -inset-4 bg-yellow-200 rounded-full animate-ping"></div>
              <ChefHat
                className={`text-${stage.color} z-20 relative`}
                size={100}
                strokeWidth={1.5}
              />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-xs animate-bounce">
                {currentStage + 1}
              </div>
            </div>

            {/* Loading Text */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-orange-800 mb-2 animate-pulse">
                Preparing Your List
              </h2>
              <p className="text-gray-600 animate-pulse delay-100">
                {stage.text}
              </p>
            </div>

            {/* Dynamic Progress Indicators */}
            <div className="w-full space-y-3">
              {LoadingStages.map((loadStage, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 group ${
                    index <= currentStage ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <loadStage.icon
                    className={`text-gray-400 group-hover:text-${loadStage.color} transition-colors`}
                    size={24}
                  />
                  <div className="flex-grow bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`bg-${
                        loadStage.color
                      } h-full animate-chop-progress ${
                        index === currentStage
                          ? loadStage.progress
                          : index < currentStage
                          ? "w-full"
                          : "w-0"
                      }`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Animated Spinner */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-yellow-100 border-t-orange-500 rounded-full animate-spin"></div>
              <Soup
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-orange-600"
                size={32}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingListLoading;
