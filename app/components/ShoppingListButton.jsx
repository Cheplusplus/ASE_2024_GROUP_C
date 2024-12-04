"use client";
import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import { useNotification, NOTIFICATION_TYPES } from './NotificationContext';
import { useSession } from "next-auth/react";

const ShoppingListButton = ({ ingredients, recipeName }) => {
  const { addNotification } = useNotification();
  const { data: session, status } = useSession();
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const handleAddToShoppingList = async () => {
    try {
      // Convert ingredients object to array of items
      const ingredientsToAdd = Object.entries(ingredients || {}).map(([name, quantity]) => ({
        name,
        quantity: parseFloat(quantity) || 1,
        purchased: false,
        source: recipeName
      }));
      console.log(ingredientsToAdd)
      const response = await fetch(`${url}/api/shoppingList/item`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: ingredientsToAdd})
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message ||'Failed to add items to shopping list');
      }

      const { count } = await response.json();
    
      // Dispatch an event to update global shopping list count
      document.dispatchEvent(new CustomEvent('shoppingListUpdated', { 
        detail: { count } 
      }));
      console.log(shoppingList.count)

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