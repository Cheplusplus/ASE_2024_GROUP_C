"use client";
import React, { useState, useEffect } from "react";
import {ShoppingCartIcon, PlusIcon, TrashIcon, ShareIcon, CheckIcon,} from "lucide-react";
import { useSession } from "next-auth/react";
import {useNotification, NOTIFICATION_TYPES,} from "../components/NotificationContext";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const { data: session } = useSession();
  const { addNotification } = useNotification();
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  
  // Fetch shopping list from backend
  useEffect(() => {
    const fetchShoppingList = async () => {
      console.log(session.user.id)
      try {
        const response = await fetch(`${url}/api/shoppingList/item?user=${session.user.id}`);
        if (response.ok) {
          const data = await response.json();
          setItems(data);
        } else {
          throw new Error('Failed to fetch shopping list');
        }
      } catch (error) {
        addNotification(error.message, NOTIFICATION_TYPES.ERROR);
      }
    };

    if (session) {
      fetchShoppingList();
    }
  }, [session]);

  const addItem = async () => {
    if (!newItem.trim()) return;

    try {
      const response = await fetch(`${url}/api/shoppingList/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          item: {
            name: newItem,
            quantity: 1,
            purchased: false
          }
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

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(`${url}/api/shopping-list/item`, {
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

  const togglePurchased = async (itemId) => {
    try {
      const itemToUpdate = items.find(item => item._id === itemId);
      const response = await fetch('/api/shopping-list/item', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemId, 
          updates: { purchased: !itemToUpdate.purchased }
        })
      });

      if (!response.ok) throw new Error('Failed to update item');

      const updatedItems = await response.json();
      setItems(updatedItems);

      addNotification(
        `Marked item as ${itemToUpdate.purchased ? 'not purchased' : 'purchased'}`,
        NOTIFICATION_TYPES.SUCCESS
      );
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPES.ERROR);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const response = await fetch('/api/shopping-list/item', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          itemId, 
          updates: { quantity }
        })
      });

      if (!response.ok) throw new Error('Failed to update quantity');

      const updatedItems = await response.json();
      setItems(updatedItems);

      addNotification(
        'Quantity updated',
        NOTIFICATION_TYPES.SUCCESS
      );
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPES.ERROR);
    }
  };

  const clearList = async () => {
    try {
      const response = await fetch('/api/shopping-list', { method: 'DELETE' });
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

  if (!session) {
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
          key={item.id}
          className={`flex items-center mb-2 p-2 rounded ${
            item.purchased ? "bg-gray-100 line-through" : "bg-white"
          }`}
        >
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(index, parseInt(e.target.value))}
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
            onClick={() => togglePurchased(item.id)}
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
