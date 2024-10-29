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
    // Handle empty search
    if (!searchTerms.length) return true;

    // Ensure recipeIngredients is an array and handle empty/null cases
    const ingredientsArray = Array.isArray(recipeIngredients) ? recipeIngredients : [];
    if (ingredientsArray.length === 0) return false;

    // Normalize recipe ingredients for better matching
    const normalizedIngredients = ingredientsArray.map(ingredient => {
      if (typeof ingredient !== 'string') return '';
      
      // Remove quantities and common measurements
      return ingredient.toLowerCase()
        .replace(/\d+(\.\d+)?/g, '') // Remove numbers
        .replace(/\s*(cup|tbsp|tsp|oz|gram|kg|ml|g|lb|pound|ounce)s?\b/gi, '') // Remove common measurements
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
    });

    // Check if all search terms match any ingredient
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

    // Improved ingredient filtering
    if (ingredients) {
      const searchTerms = ingredients
        .toLowerCase()
        .split(',')
        .map(term => term.trim())
        .filter(term => term.length > 0); // Remove empty terms

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

  // Handle ingredient input
  const handleIngredientInput = (e) => {
    const value = e.target.value;
    setIngredients(value);
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
        <DialogContent className="sm:max-w-[375px]">
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
              <Select
                value={selectedTags}
                onValueChange={(value) => setSelectedTags([value])}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select tag..." />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] overflow-y-auto">
                  {tags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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