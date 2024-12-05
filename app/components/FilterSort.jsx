"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { useMyContext3 } from './pageNumberReset';

const FilterSortComponent = ({ categories = [], count1 = null, search }) => {
  const router = useRouter();

  // State management for filters and sorting
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [numSteps, setNumSteps] = useState(0);
  const [ingredients, setIngredients] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [displayCount, setDisplayCount] = useState(false);
  const [count, setCount] = useState(count1);
  const params = new URLSearchParams();
  const { update } = useMyContext3();

  // Apply the filters by updating the URL query parameters
  const applyFilters = (value, clear = false) => {
    if (!clear) {
      if (typeof value == 'object') {
        value = sortOption;
      }
      if (selectedCategory) params.set('category', selectedCategory);
      if (selectedTags.length) params.set('tags', selectedTags.join(','));
      if (numSteps > 0) params.set('numSteps', numSteps);
      if (ingredients) params.set('ingredients', ingredients);
      if (value) params.set('sortOption', value);
      if (search) params.set('search', search);

      setIsOpen(false);
      router.push(`/all?${params.toString()}`);
      update(true)
      if (count1) {
        setDisplayCount(true);
      } else {
        setDisplayCount(false);
      }
      setCount(count1);
    } else {
      setIsOpen(false);
      router.push('/all');
    }
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    setTagInput('');
    setNumSteps(0);
    setIngredients('');
    setSortOption('default');
    applyFilters({}, true);
    update(true)
  };

  const handleTagInputChange = (e) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput && !selectedTags.includes(tagInput)) {
      setSelectedTags([...selectedTags, tagInput]);
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="dark:text-foreground">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">All Recipes</h1>
        <div className="flex items-center space-x-4">
          <Select
            value={sortOption}
            onValueChange={(value) => { setSortOption(value); applyFilters(value) }}
          >
            <SelectTrigger className="w-[200px] bg-white dark:bg-card dark:text-foreground-dark">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto bg-white dark:bg-card">
            <SelectItem className="dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800" value="default">Default</SelectItem>
              <SelectItem className="dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800" value="prep_asc">⏱️ Prep Time: Low to High</SelectItem>
              <SelectItem className="dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800" value="prep_desc">⏱️ Prep Time: High to Low</SelectItem>
              <SelectItem className="dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800" value="cook_asc">🍳 Cook Time: Low to High</SelectItem>
              <SelectItem className="dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800" value="cook_desc">🍳 Cook Time: High to Low</SelectItem>
              <SelectItem className="dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800" value="steps_asc">📝 Steps: Least to Most</SelectItem>
              <SelectItem className="dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800" value="steps_desc">📝 Steps: Most to Least</SelectItem>
              <SelectItem className="dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800" value="newest">🆕 Newest Recipes</SelectItem>
              <SelectItem className="dark:text-foreground-dark hover:bg-gray-100 dark:hover:bg-gray-800" value="oldest">📅 Oldest Recipes</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={() => setIsOpen(true)} 
            className="bg-white dark:bg-card dark:text-foreground-dark dark:hover:bg-muted "
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-card rounded-lg shadow-lg w-full max-w-sm p-6 sm:max-w-[375px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold dark:text-foreground-dark">Filter Options</h2>
              <Button variant="destructive" size="sm" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>

            <div className="text-sm text-gray-600 dark:text-muted-foreground mb-4">
              Use the filters below to narrow down the recipe results.
            </div>

            <div className="space-y-4">
              {/* Category filter */}
              <div>
                <label className="text-sm font-medium dark:text-foreground">Category</label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full bg-white dark:bg-card dark:text-foreground">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto bg-white dark:bg-card">
                    <SelectItem className="dark:text-foreground" value="All Categories">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem className="dark:text-foreground" key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tags filter */}
              <div>
                <label className="text-sm font-medium dark:text-foreground">Tags</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    placeholder="Type and press enter..."
                    onKeyDown={(e) => e.key === 'Enter' && addTag()}
                    className="w-full px-3 py-2 border rounded-md dark:bg-card dark:text-foreground dark:border-gray-700"
                  />
                  <Button onClick={addTag}>Add</Button>
                </div>
                <div className="flex flex-wrap mt-2 gap-2">
                  {selectedTags.map(tag => (
                    <span
                      key={tag}
                      className="flex items-center space-x-1 px-2 py-1 bg-gray-200 dark:bg-muted dark:text-foreground rounded-full cursor-pointer"
                      onClick={() => removeTag(tag)}
                    >
                      <span>{tag}</span>
                      <span className="text-red-500 ml-1">×</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Number of Steps filter */}
              <div>
                <label className="text-sm font-medium dark:text-foreground">Number of Steps</label>
                <Slider
                  value={[numSteps]}
                  onValueChange={(value) => setNumSteps(value[0])}
                  max={20}
                  step={1}
                  className="mt-2"
                />
                {numSteps}
              </div>

              {/* Ingredients filter */}
              <div>
                <label className="text-sm font-medium dark:text-foreground">Ingredients</label>
                <input
                  type="text"
                  value={ingredients}
                  onChange={(e) => setIngredients(e.target.value)}
                  placeholder="e.g., tomatoes, garlic"
                  className="w-full px-3 py-2 mt-1 border rounded-md dark:bg-card dark:text-foreground dark:border-gray-700"
                />
                <Button 
                  variant="secondary"
                  onClick={() => setIngredients('')}
                  className="mt-2 dark:bg-yellow-400 dark:text-black dark:hover:bg-yellow-500"
                >
                  Clear Ingredients
                </Button>
              </div>

        <Button variant="primary" onClick={applyFilters} className="mt-4 w-full">
          Apply Filters
        </Button>
        <button onClick={() => setIsOpen(false)} className="mt-2 bg-red-600 hover:bg-red-700 w-full text-white">
          Close
        </button>
      </div>
    </div>
  </div>
)}
         {console.log(displayCount)}
     {displayCount && <div >
       {count} results found
      </div>}

    </div>
  );
};

export default FilterSortComponent;