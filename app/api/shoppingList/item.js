import { getServerSession } from "next-auth";
import ShoppingList from "@/app/models/shoppingList";
import User from "@/app/models/user";
import dbConnect from "@/lib/dbConnect";
import { authOptions } from "../auth/[...nextauth]/route";

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  // Verify user session
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Find the user to ensure they exist
  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  switch (method) {
    case 'POST':
      try {
        // Add new item to shopping list
        const { item } = req.body;
        
        const shoppingList = await ShoppingList.findOne({ user: user._id });
        
        if (!shoppingList) {
          // Create new shopping list if it doesn't exist
          const newShoppingList = new ShoppingList({
            user: user._id,
            items: [item]
          });
          await newShoppingList.save();
          return res.status(201).json(newShoppingList.items);
        }

        // Check if item already exists
        const existingItemIndex = shoppingList.items.findIndex(
          existingItem => existingItem.name.toLowerCase() === item.name.toLowerCase()
        );

        if (existingItemIndex > -1) {
          // Update quantity if item exists
          shoppingList.items[existingItemIndex].quantity += item.quantity;
        } else {
          // Add new item
          shoppingList.items.push(item);
        }

        await shoppingList.save();
        return res.status(201).json(shoppingList.items);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'PUT':
      try {
        // Update specific item in shopping list
        const { itemId, updates } = req.body;
        
        const shoppingList = await ShoppingList.findOne({ user: user._id });
        
        if (!shoppingList) {
          return res.status(404).json({ error: "Shopping list not found" });
        }

        const itemIndex = shoppingList.items.findIndex(
          item => item._id.toString() === itemId
        );

        if (itemIndex === -1) {
          return res.status(404).json({ error: "Item not found" });
        }

        // Update item properties
        shoppingList.items[itemIndex] = { 
          ...shoppingList.items[itemIndex], 
          ...updates 
        };

        await shoppingList.save();
        return res.status(200).json(shoppingList.items);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'DELETE':
      try {
        // Remove specific item from shopping list
        const { itemId } = req.body;
        
        const shoppingList = await ShoppingList.findOne({ user: user._id });
        
        if (!shoppingList) {
          return res.status(404).json({ error: "Shopping list not found" });
        }

        shoppingList.items = shoppingList.items.filter(
          item => item._id.toString() !== itemId
        );

        await shoppingList.save();
        return res.status(200).json(shoppingList.items);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      res.setHeader('Allow', ['POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}