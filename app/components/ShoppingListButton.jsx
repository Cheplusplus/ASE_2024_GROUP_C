"use client";
import React from 'react';
import { ShoppingCartIcon } from 'lucide-react';
import { useNotification, NOTIFICATION_TYPES } from './NotificationContext';
import { useSession } from "next-auth/react";
import { useShoppingListContext } from './shopCountContext';

const ShoppingListButton = ({ ingredients, recipeName }) => {
  const { addNotification } = useNotification();
  const { data: session, status } = useSession();
  const { updateShoppingListCount } = useShoppingListContext()
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  /**
   * Handles adding ingredients from the recipe to the user's shopping list
   * @async
   * @function
   * @param {Object} ingredients - An object with ingredient names as keys and quantities as values
   * @param {String} recipeName - The name of the recipe
   * @returns {Promise<void>}
   * @throws {Error} If the request to add the items to the shopping list fails
   */
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


     // Fetch the updated shopping list to get the latest count
     const listResponse = await fetch(`${url}/api/shoppingList/item?user=${session.user.id}`);
     if (listResponse.ok) {
       const updatedItems = await listResponse.json();
       updateShoppingListCount(updatedItems);
     }

      //console.log(shoppingList.count)

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
     +
    </button>
  );
};

export default ShoppingListButton;