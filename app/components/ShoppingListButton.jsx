"use client";
import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import { useNotification, NOTIFICATION_TYPES } from './NotificationContext';

const ShoppingListButton = ({ ingredients, recipeName }) => {
  const { addNotification } = useNotification();

  const handleAddToShoppingList = async () => {
    try {
      // Convert ingredients object to array of items
      const ingredientsToAdd = Object.entries(ingredients || {}).map(([name, quantity]) => ({
        name,
        quantity: parseFloat(quantity) || 1,
        purchased: false,
        source: recipeName
      }));

      const response = await fetch('/api/shopping-list/item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: ingredientsToAdd })
      });

      if (!response.ok) {
        throw new Error('Failed to add items to shopping list');
      }

      addNotification(
        `Added ingredients from "${recipeName}" to your shopping list!`, 
        NOTIFICATION_TYPES.SUCCESS
      );
    } catch (error) {
      addNotification(
        `Failed to add ingredients: ${error.message}`, 
        NOTIFICATION_TYPES.ERROR
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