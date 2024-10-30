// FilterSortComponent.js
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Filter } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

const FilterSortComponent = ({ categories = [], tags = [] }) => {
  const router = useRouter();
  
  // State management for filters and sorting
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [numSteps, setNumSteps] = useState(0);
  const [ingredients, setIngredients] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const params = new URLSearchParams();
  // Apply the filters by updating the URL query parameters
  const applyFilters = (value = sortOption) => {
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedTags.length) params.set('tags', selectedTags.join(','));
    if (numSteps > 0) params.set('numSteps', numSteps);
    if (ingredients) params.set('ingredients', ingredients);
    if (sortOption) params.set('sortOption', value);
    // Store filters in localStorage
    localStorage.setItem('filterSort', JSON.stringify({
      category: selectedCategory,
      tags: selectedTags,
      numSteps,
      ingredients,
      sortOption,
    }));

    router.push(`/?${params.toString()}`);
  };

  useEffect(() => {
    // Retrieve filters from localStorage
    const savedFilters = JSON.parse(localStorage.getItem('filterSort'));
    if (savedFilters) {
      if (savedFilters.category) setSelectedCategory(savedFilters.category);
      if (savedFilters.tags) setSelectedTags(savedFilters.tags);
      if (savedFilters.numSteps) setNumSteps(savedFilters.numSteps);
      if (savedFilters.ingredients) setIngredients(savedFilters.ingredients);
      if (savedFilters.sortOption) setSortOption(savedFilters.sortOption);
      
      // Update URL parameters with saved filters
      if (savedFilters.category) params.set('category', savedFilters.category);
      if (savedFilters.tags) params.set('tags', savedFilters.tags.join(','));
      if (savedFilters.numSteps) params.set('numSteps', savedFilters.numSteps);
      if (savedFilters.ingredients) params.set('ingredients', savedFilters.ingredients);
      if (savedFilters.sortOption) params.set('sortOption', savedFilters.sortOption);
      
      router.push(`/?${params.toString()}`);
    }
  }, []);
  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    setTagInput('');
    setNumSteps(0);
    setIngredients('');
    setSortOption('default');
    applyFilters();
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
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Recipes</h1>
        <div className="flex items-center space-x-4">
          <Select 
            value={sortOption} 
            onValueChange={(value) => {setSortOption(value);applyFilters(value)}}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue>Sort By</SelectValue>
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="prep_asc">⏱️ Prep Time: Low to High</SelectItem>
              <SelectItem value="prep_desc">⏱️ Prep Time: High to Low</SelectItem>
              <SelectItem value="cook_asc">🍳 Cook Time: Low to High</SelectItem>
              <SelectItem value="cook_desc">🍳 Cook Time: High to Low</SelectItem>
              <SelectItem value="steps_asc">📝 Steps: Least to Most</SelectItem>
              <SelectItem value="steps_desc">📝 Steps: Most to Least</SelectItem>
              <SelectItem value="newest">🆕 Newest Recipes</SelectItem>
              <SelectItem value="oldest">📅 Oldest Recipes</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => setIsOpen(true)}>
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[375px]">
          <DialogHeader>
            <DialogTitle>Filter Options</DialogTitle>
            <Button variant="destructive" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  <SelectItem value="All Categories">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Tags</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={handleTagInputChange}
                  placeholder="Type and press enter..."
                  onKeyDown={(e) => e.key === 'Enter' && addTag()}
                  className="input"
                />
                <Button onClick={addTag}>Add</Button>
              </div>
              <div className="flex flex-wrap mt-2 space-x-2">
                {selectedTags.map(tag => (
                  <span
                    key={tag}
                    className="flex items-center space-x-1 px-2 py-1 bg-gray-200 rounded-full cursor-pointer"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <span className="text-red-500">×</span>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium ">Number of Steps</label>
              <Slider
              
                value={[numSteps]}
                onValueChange={(value) => setNumSteps(value[0])}
                max={20}
                step={1}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Ingredients</label><br/>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="e.g., tomatoes, garlic"
                className="input"
              />
            </div>

            <Button variant="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterSortComponent;
