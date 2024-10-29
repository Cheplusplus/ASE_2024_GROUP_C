import React, { useState, useEffect } from 'react';
import { Filter } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";

const FilterSortComponent = ({ recipes = [], onFilterSort }) => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [numSteps, setNumSteps] = useState([0]);
  const [ingredients, setIngredients] = useState('');
  const [sortOption, setSortOption] = useState('default');

  // Extract unique categories and tags from recipes
  const categories = ['all', ...new Set(recipes.map(recipe => recipe.category))];
  const tags = [...new Set(recipes.flatMap(recipe => recipe.tags || []))];

  // Sort options
  const sortOptions = [
    { value: 'default', label: 'Sort By: Default' },
    { value: 'prep_asc', label: '⏱️ Prep Time: Low to High' },
    { value: 'prep_desc', label: '⏱️ Prep Time: High to Low' },
    { value: 'cook_asc', label: '🍳 Cook Time: Low to High' },
    { value: 'cook_desc', label: '🍳 Cook Time: High to Low' },
    { value: 'steps_asc', label: '📝 Steps: Least to Most' },
    { value: 'steps_desc', label: '📝 Steps: Most to Least' },
    { value: 'newest', label: '🆕 Newest First' },
    { value: 'oldest', label: '📅 Oldest First' }
  ];

  // Filter and sort logic
  useEffect(() => {
    filterAndSortRecipes();
  }, [selectedCategory, selectedTags, numSteps, ingredients, sortOption]);

  // Fixed ingredient search helper function
  const matchesIngredientSearch = (recipeIngredients, searchTerms) => {
    if (!searchTerms.length) return true;
    const ingredientsArray = Array.isArray(recipeIngredients) ? recipeIngredients : [];
    if (ingredientsArray.length === 0) return false;

    const normalizedIngredients = ingredientsArray.map(ingredient => {
      if (typeof ingredient !== 'string') return '';
      return ingredient.toLowerCase()
        .replace(/\d+(\.\d+)?/g, '')
        .replace(/\s*(cup|tbsp|tsp|oz|gram|kg|ml|g|lb|pound|ounce)s?\b/gi, '')
        .replace(/\s+/g, ' ')
        .trim();
    });

    return searchTerms.every(term => {
      const normalizedTerm = term
        .toLowerCase()
        .replace(/\s+/g, ' ')
        .trim();
      return normalizedIngredients.some(ingredient => 
        ingredient.includes(normalizedTerm)
      );
    });
  };

  const filterAndSortRecipes = () => {
    let filteredRecipes = [...recipes];

    if (selectedCategory && selectedCategory !== 'all') {
      filteredRecipes = filteredRecipes.filter(recipe => 
        recipe.category === selectedCategory
      );
    }

    if (selectedTags.length > 0) {
      filteredRecipes = filteredRecipes.filter(recipe =>
        selectedTags.every(tag => recipe.tags?.includes(tag))
      );
    }

    filteredRecipes = filteredRecipes.filter(recipe => 
      recipe.instructions?.length >= numSteps[0]
    );

    if (ingredients) {
      const searchTerms = ingredients
        .toLowerCase()
        .split(',')
        .map(term => term.trim())
        .filter(term => term.length > 0);

      filteredRecipes = filteredRecipes.filter(recipe =>
        matchesIngredientSearch(recipe.ingredients || [], searchTerms)
      );
    }

    switch (sortOption) {
      case 'prep_asc':
        filteredRecipes.sort((a, b) => a.prepTime - b.prepTime);
        break;
      case 'prep_desc':
        filteredRecipes.sort((a, b) => b.prepTime - a.prepTime);
        break;
      case 'cook_asc':
        filteredRecipes.sort((a, b) => a.cookTime - b.cookTime);
        break;
      case 'cook_desc':
        filteredRecipes.sort((a, b) => b.cookTime - a.cookTime);
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

  const clearFilters = () => {
    setSelectedCategory('');
    setSelectedTags([]);
    setNumSteps([0]);
    setIngredients('');
    setSortOption('default');
  };

  const handleIngredientInput = (e) => {
    const value = e.target.value;
    setIngredients(value);
  };

  const handleTagSelect = (value) => {
    if (selectedTags.includes(value)) {
      setSelectedTags(selectedTags.filter(tag => tag !== value));
    } else {
      setSelectedTags([...selectedTags, value]);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Recipes</h1>
        <div className="flex items-center space-x-4">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Sort by..." />
            </SelectTrigger>
            <SelectContent className="max-h-[300px] overflow-y-auto">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button 
            variant="outline"
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
          </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[375px] [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Filter
              <Button 
                variant="destructive"
                size="sm"
                onClick={clearFilters}
                className="text-sm"
              >
                Clear Filters
              </Button>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' 
                        ? 'All Categories' 
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tags
              </label>
              <div className="space-y-2">
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map(tag => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                      >
                        {tag}
                        <button
                          onClick={() => handleTagSelect(tag)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
                <Select
                  value=""
                  onValueChange={handleTagSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tag..." />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px] overflow-y-auto">
                    {tags
                      .filter(tag => !selectedTags.includes(tag))
                      .map((tag) => (
                        <SelectItem key={tag} value={tag}>
                          {tag}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Number of Steps: {numSteps[0]}
              </label>
              <Slider
                value={numSteps}
                onValueChange={setNumSteps}
                max={20}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Search by Ingredients
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={handleIngredientInput}
                placeholder="Enter ingredients (comma-separated)"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Separate multiple ingredients with commas (e.g., tomatoes, garlic, olive oil)
              </p>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={() => {
                  filterAndSortRecipes();
                  setIsOpen(false);
                }}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterSortComponent;