import React, { useState, useEffect, useRef } from 'react';

const FilterSort = ({ recipes, onFilterSort }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('default');
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const categoryRef = useRef(null);
  const sortRef = useRef(null);

  // Extract unique categories from recipes
  const categories = ['all', ...new Set(recipes.map(recipe => recipe.category))];
  
  const sortOptions = [
    { value: 'default', label: 'Default Order' },
    { value: 'prep_asc', label: '⏱️ Prep Time: Low to High' },
    { value: 'prep_desc', label: '⏱️ Prep Time: High to Low' },
    { value: 'cook_asc', label: '🍳 Cook Time: Low to High' },
    { value: 'cook_desc', label: '🍳 Cook Time: High to Low' },
    { value: 'steps_asc', label: '📝 Steps: Least to Most' },
    { value: 'steps_desc', label: '📝 Steps: Most to Least' },
    { value: 'newest', label: '🆕 Newest Recipes' },
    { value: 'oldest', label: '📅 Oldest Recipes' },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    filterAndSortRecipes();
  }, [selectedCategory, sortOption]);

  const filterAndSortRecipes = () => {
    let filteredRecipes = [...recipes];

    if (selectedCategory !== 'all') {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.category === selectedCategory);
    }

    switch (sortOption) {
      case 'prep_asc':
        filteredRecipes.sort((a, b) => a.prep - b.prep);
        break;
      case 'prep_desc':
        filteredRecipes.sort((a, b) => b.prep - a.prep);
        break;
      case 'cook_asc':
        filteredRecipes.sort((a, b) => a.cook - b.cook);
        break;
      case 'cook_desc':
        filteredRecipes.sort((a, b) => b.cook - a.cook);
        break;
      case 'steps_asc':
        filteredRecipes.sort((a, b) => a.instructions.length - b.instructions.length);
        break;
      case 'steps_desc':
        filteredRecipes.sort((a, b) => b.instructions.length - a.instructions.length);
        break;
      case 'newest':
        filteredRecipes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filteredRecipes.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        break;
    }

    onFilterSort(filteredRecipes);
  };

  return (
    <div className="mb-8 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Discover Recipes</h2>
      
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Category Dropdown */}
        <div className="relative flex-1 sm:max-w-xs" ref={categoryRef}>
          <button
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              setIsSortOpen(false);
            }}
            className="w-full px-4 py-3 text-left bg-gradient-to-r from-purple-50 to-pink-50 
                     border-2 border-purple-200 rounded-xl shadow-sm hover:shadow-md
                     transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700 truncate">
                {selectedCategory === 'all' 
                  ? 'All Categories' 
                  : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  isCategoryOpen ? 'transform rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
          
          {isCategoryOpen && (
            <div className="absolute left-0 right-0 z-50 mt-2 bg-white rounded-xl shadow-lg 
                          border-2 border-purple-100 max-h-60 overflow-y-auto
                          transform transition-all duration-300 ease-in-out">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsCategoryOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-purple-50 transition-colors
                            ${selectedCategory === category ? 'bg-purple-100' : ''}
                            ${selectedCategory === category ? 'font-medium' : 'font-normal'}
                            text-gray-700 hover:text-gray-900`}
                >
                  {category === 'all' 
                    ? 'All Categories' 
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-1 sm:max-w-xs" ref={sortRef}>
          <button
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsCategoryOpen(false);
            }}
            className="w-full px-4 py-3 text-left bg-gradient-to-r from-blue-50 to-purple-50 
                     border-2 border-blue-200 rounded-xl shadow-sm hover:shadow-md
                     transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-700 truncate max-w-[calc(100%-2rem)]">
                {sortOptions.find(option => option.value === sortOption)?.label || 'Sort By'}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  isSortOpen ? 'transform rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </button>
          
          {isSortOpen && (
            <div className="absolute left-0 right-0 z-50 mt-2 bg-white rounded-xl shadow-lg 
                          border-2 border-blue-100 max-h-60 overflow-y-auto
                          transform transition-all duration-300 ease-in-out">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setSortOption(option.value);
                    setIsSortOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors
                            ${sortOption === option.value ? 'bg-blue-100' : ''}
                            ${sortOption === option.value ? 'font-medium' : 'font-normal'}
                            text-gray-700 hover:text-gray-900`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedCategory !== 'all' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm
                         bg-purple-100 text-purple-800">
            Category: {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
            <button
              onClick={() => setSelectedCategory('all')}
              className="ml-2 focus:outline-none hover:text-purple-900"
              aria-label="Remove category filter"
            >
              ×
            </button>
          </span>
        )}
        {sortOption !== 'default' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm
                         bg-blue-100 text-blue-800">
            {sortOptions.find(option => option.value === sortOption)?.label}
            <button
              onClick={() => setSortOption('default')}
              className="ml-2 focus:outline-none hover:text-blue-900"
              aria-label="Remove sort filter"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default FilterSort;