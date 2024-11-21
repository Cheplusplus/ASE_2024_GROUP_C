"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingCartIcon,
  PlusIcon,
  TrashIcon,
  ShareIcon,
  CheckIcon,
} from "lucide-react";
import {
  useNotification,
  NOTIFICATION_TYPES,
} from "../components/NotificationContext";

const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const { addNotification } = useNotification();

  // Sync with localStorage for offline mode
  useEffect(() => {
    const storedItems = localStorage.getItem("shoppingList");
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (newItem.trim()) {
      const existingItemIndex = items.findIndex(
        (item) => item.name.toLowerCase() === newItem.toLowerCase()
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...items];
        updatedItems[existingItemIndex].quantity += 1;
        setItems(updatedItems);
        addNotification(
          `Increased quantity of ${newItem}`,
          NOTIFICATION_TYPES.SUCCESS
        );
      } else {
        setItems([
          ...items,
          {
            name: newItem,
            quantity: 1,
            purchased: false,
          },
        ]);
        addNotification(
          `Added ${newItem} to shopping list`,
          NOTIFICATION_TYPES.SUCCESS
        );
      }
      setNewItem("");
    }
  };

  const removeItem = (index) => {
    const removedItem = items[index];
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
    addNotification(
      `Removed ${removedItem.name} from shopping list`, 
      NOTIFICATION_TYPES.WARNING
    );
  };

  const togglePurchased = (index) => {
    const newItems = [...items];
    newItems[index].purchased = !newItems[index].purchased;
    setItems(newItems);
    addNotification(
      `Marked ${newItems[index].name} as ${newItems[index].purchased ? 'purchased' : 'not purchased'}`, 
      NOTIFICATION_TYPES.SUCCESS
    );
  };

  const updateQuantity = (index, newQuantity) => {
    const newItems = [...items];
    newItems[index].quantity = newQuantity;
    setItems(newItems);
    addNotification(
      `Updated quantity of ${newItems[index].name}`, 
      NOTIFICATION_TYPES.SUCCESS
    );
  };

  const clearList = () => {
    if (items.length > 0) {
      setItems([]);
      addNotification(
        'Cleared entire shopping list', 
        NOTIFICATION_TYPES.WARNING
      );
    }
  };

  const shareList = () => {
    const listText = items
      .map((item) => `${item.name} (${item.quantity})`)
      .join("\n");

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(listText)}`;
    window.open(whatsappUrl, "_blank");
  };

//   const addFromRecipe = (recipeIngredients) => {
//     const newItemsToAdd = recipeIngredients.map((ingredient) => ({
//       name: ingredient.name,
//       quantity: ingredient.quantity,
//       purchased: false,
//     }));

//     const mergedItems = [...items];
//     newItemsToAdd.forEach((newItem) => {
//       const existingItemIndex = mergedItems.findIndex(
//         (item) => item.name.toLowerCase() === newItem.name.toLowerCase()
//       );

//       if (existingItemIndex > -1) {
//         mergedItems[existingItemIndex].quantity += newItem.quantity;
//       } else {
//         mergedItems.push(newItem);
//       }
//     });

//     setItems(mergedItems);
//   };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center">
          <ShoppingCartIcon className="mr-2" /> Shopping List
        </h1>
        <div className="flex space-x-2">
          <button
            onClick={shareList}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            <ShareIcon />
          </button>
          <button
            onClick={clearList}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
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

      {items.map((item, index) => (
        <div
          key={index}
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
            onClick={() => togglePurchased(index)}
            className={`mr-2 p-1 rounded ${
              item.purchased ? "bg-green-500 text-white" : "bg-gray-200"
            }`}
          >
            <CheckIcon />
          </button>
          <button
            onClick={() => removeItem(index)}
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