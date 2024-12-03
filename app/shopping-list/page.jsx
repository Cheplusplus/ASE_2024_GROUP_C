"use client";
import React, { useState, useEffect } from "react";
import {ShoppingCartIcon, PlusIcon, TrashIcon, ShareIcon, CheckIcon,} from "lucide-react";
import { useSession } from "next-auth/react";
import {useNotification, NOTIFICATION_TYPES,} from "../components/NotificationContext";

/**
 * The ShoppingList component displays a shopping list and allows users to
 * add, remove, and update items on the list. It also allows users to clear
 * the entire list and share it with others.
 * 
 * @returns A React component that renders a shopping list
 */
const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const { data: session } = useSession();
  const { addNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(true);
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  // Fetch shopping list from backend
  useEffect(() => {
/**
 * Fetches the user's shopping list from the backend.
 *
 * This asynchronous function sends a GET request to the API endpoint 
 * for retrieving the shopping list based on the authenticated user's ID.
 * If the request is successful and the list is not empty, it updates the 
 * state with the list of items. If the request fails, it logs an error and 
 * sets the items to an empty array. Regardless of the outcome, it sets the 
 * loading state to false after the fetch completes.
 *
 * @throws Will add an error notification if the fetch request fails for 
 * reasons other than an empty list.
 */
    const fetchShoppingList = async () => {
      console.log(session.user.id)
      try {
        const response = await fetch(`${url}/api/shoppingList/item?user=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setItems(data.length > 0 ? data : []);
        } else {
          console.log('123fail')
          throw new Error('Failed to fetch shopping list');
        }
      } catch (error) {
        // Only add notification if it's not an empty list
        if (error.message !== 'Failed to fetch shopping list') {
          addNotification(error.message, NOTIFICATION_TYPES.ERROR);
      }
      setItems([]);
    } finally {
      setIsLoading(false)
    }
    };

    if (session) {
      fetchShoppingList();
    }
  }, [session, url, addNotification]);

  if (isLoading) {
    return (
      <div className="container mx-auto p-4 mt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>);
  }

/**
 * Adds a new item to the shopping list.
 *
 * This function sends a POST request to add a new item to the user's
 * shopping list. It uses the current user's session information to
 * associate the item with the user. The item is initially marked as
 * not purchased and has a default quantity of 1.
 *
 * If the request is successful, it updates the local items state with
 * the response from the server and shows a success notification. If
 * there's an error, it shows an error notification.
 *
 * @async
 * @throws Will add an error notification if the request fails.
 */
  const addItem = async () => {
    if (!newItem.trim()) return;
    
    try {
      const response = await fetch(`${url}/api/shoppingList/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          items: [{
            name: newItem,
            quantity: 1,
            purchased: false,
            source: `${session.user.name}`
          }],user:session.user 
        })
      });

      if (!response.ok) throw new Error('Failed to add item');

      const updatedItems = await response.json();
      setItems(updatedItems);

      addNotification(
        `Added ${newItem} to shopping list`,
        NOTIFICATION_TYPES.SUCCESS
      );
      setNewItem("");
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPES.ERROR);
    }
  };

/**
 * Removes an item from the shopping list.
 *
 * This function sends a DELETE request to remove a specified item from the
 * user's shopping list using the item's ID. It uses the current user's session
 * information to identify the user's shopping list. If the request is
 * successful, it updates the local items state with the response from the
 * server and shows a warning notification. If there's an error, it shows an
 * error notification.
 *
 * @async
 * @param {string} itemId - The ID of the item to be removed.
 * @throws Will add an error notification if the request fails.
 */
  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`${url}/api/shoppingList/item?user=${session.user.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId })
      });
  
      if (!response.ok) throw new Error('Failed to remove item');
  
      const updatedItems = await response.json();
      setItems(updatedItems);
  
      addNotification(
        'Item removed from shopping list', 
        NOTIFICATION_TYPES.WARNING
      );
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPES.ERROR);
    }
  };

  /**
   * Toggles the purchased status of an item in the shopping list.
   *
   * This function sends a PUT request to update the purchased status of a
   * specified item in the user's shopping list using the item's ID. It uses
   * the current user's session information to identify the user's shopping
   * list. If the request is successful, it updates the local items state with
   * the response from the server and shows a success notification. If there's
   * an error, it shows an error notification and reverts the local state to
   * its previous state.
   *
   * @async
   * @param {string} itemId - The ID of the item to be toggled.
   * @throws Will add an error notification if the request fails.
   */

  
  const togglePurchased = async (itemId) => {
    const itemToUpdate = items.find(item => item._id === itemId);

     // Optimistically update the local state first
    const updatedItems = items.map(item => 
      item._id === itemId 
        ? { ...item, purchased: !item.purchased }
        : item
    );

    setItems(updatedItems)

    try {
      const response = await fetch(`${url}/api/shoppingList/item?user=${session.user.id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemId, 
          updates: { purchased: !itemToUpdate.purchased }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update item');
      };

      const serverUpdatedItems = await response.json();
      setItems(serverUpdatedItems);

      addNotification(
        `Marked item as ${itemToUpdate.purchased ? 'not purchased' : 'purchased'}`,
        NOTIFICATION_TYPES.SUCCESS
      );
    } catch (error) {
      setItems(items)
      addNotification(error.message, NOTIFICATION_TYPES.ERROR);
    }
  };

  const updateQuantity = async (itemId, quantity) => {

    if (quantity < 1) return;

  // Optimistically update the local state first
  const updatedQuantity = items.map(item => 
    item._id === itemId 
      ? { ...item, quantity: quantity }
      : item
  );

  setItems(updatedQuantity)

    try {
      const response = await fetch(`${url}/api/shoppingList/item?user=${session.user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemId, 
          updates: { quantity }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update quantity');
      };

      const serverUpdatedItems = await response.json();
      setItems(serverUpdatedItems);

      addNotification(
        'Quantity updated',
        NOTIFICATION_TYPES.SUCCESS
      );
    } catch (error) {
      setItems(items)
      addNotification(error.message, NOTIFICATION_TYPES.ERROR);
    }
  };

  const clearList = async () => {
    try {
      const response = await fetch(`${url}/api/shoppingList/deleteShoppingList?user=${session.user.id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to clear list');

      setItems([]);
      addNotification(
        'Cleared entire shopping list', 
        NOTIFICATION_TYPES.WARNING
      );
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPES.ERROR);
    }
  };

  const shareList = () => {
    const listText = items
      .map((item) => `${item.name} (${item.quantity})`)
      .join("\n");

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(listText)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!session?.user?.id) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Please log in to view your shopping list</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold flex items-center">
        <ShoppingCartIcon className="mr-2" /> 
        Hi, {session.user.name ? session.user.name.split(' ')[0] : 'Shopper'}
      </h1>
      <div className="flex space-x-2">
        <button
          onClick={shareList}
          className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          title="Share Shopping List"
        >
          <ShareIcon />
        </button>
        <button
          onClick={clearList}
          className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
          title="Clear Shopping List"
        >
          <TrashIcon />
        </button>
      </div>
    </div>

      <div className="flex mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="flex-grow p-2 border rounded-l"
        />
        <button
          onClick={addItem}
          className="bg-blue-500 text-white p-2 rounded-r"
        >
          <PlusIcon />
        </button>
      </div>

      {items.map((item) => (
        <div
          key={item._id}
          className={`flex items-center mb-2 p-2 rounded ${
            item.purchased ? "bg-gray-100 line-through" : "bg-white"
          }`}
        >
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
            min="1"
            className="w-16 mr-2 p-1 border rounded"
          />
          <div className="flex-grow">
            <span>{item.name}</span>
            {item.source && (
              <span className="text-xs text-gray-500 ml-2">
                (from {item.source})
              </span>
            )}
          </div>
          <button
            onClick={() => togglePurchased(item._id)}
            className={`mr-2 p-1 rounded ${
              item.purchased ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            <CheckIcon />
          </button>
          <button
            onClick={() => removeItem(item._id)}
            className="p-1 bg-red-500 text-white rounded"
          >
            <TrashIcon />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingList;
