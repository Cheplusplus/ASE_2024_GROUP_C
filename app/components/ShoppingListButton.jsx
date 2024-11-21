"use client";
import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import { useNotification, NOTIFICATION_TYPES } from './NotificationContext';

const ShoppingListButton = ({ ingredients, recipeName }) => {
  const { addNotification } = useNotification();

  const handleAddToShoppingList = () => {
    // Check if localStorage is available
    if (typeof window !== 'undefined') {
      // Retrieve existing shopping list
      const existingList = JSON.parse(localStorage.getItem('shoppingList') || '[]');
      
      // Check if recipe is already in the list
      const isRecipeAlreadyAdded = existingList.some(
        item => item.source === recipeName
      );

      if (isRecipeAlreadyAdded) {
        addNotification(
          `Ingredients from "${recipeName}" are already in your shopping list.`, 
          NOTIFICATION_TYPES.WARNING
        );
        return;
      }

      // Convert ingredients object to array of items
      const ingredientsToAdd = Object.entries(ingredients || {}).map(([name, quantity]) => ({
        name,
        quantity: parseFloat(quantity) || 1,
        purchased: false,
        source: recipeName // Add source to track origin
      }));

      // Merge with existing list, updating quantities for existing items
      const updatedList = [...existingList];
      ingredientsToAdd.forEach(newItem => {
        const existingItemIndex = updatedList.findIndex(
          item => item.name.toLowerCase() === newItem.name.toLowerCase()
        );

        if (existingItemIndex > -1) {
          // If item exists, add to its quantity
          updatedList[existingItemIndex].quantity += newItem.quantity;
        } else {
          // If item doesn't exist, add new item
          updatedList.push(newItem);
        }
      });

      // Save updated list
      localStorage.setItem('shoppingList', JSON.stringify(updatedList));

      // Dispatch custom event for shopping list update
      window.dispatchEvent(new Event('shopping-list-updated'));

      // Show success notification
      addNotification(
        `Added ingredients from "${recipeName}" to your shopping list!`, 
        NOTIFICATION_TYPES.SUCCESS
      );
    }
  };

  return (
    <button 
      onClick={handleAddToShoppingList}
      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
      title="Add ingredients to shopping list"
    >
      <ShoppingCartIcon className="mr-2" />
      Add to List
    </button>
  );
};

export default ShoppingListButton;