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
    case 'GET':
      try {
        // Fetch user's shopping list
        const shoppingList = await ShoppingList.findOne({ user: user._id });
        return res.status(200).json(shoppingList ? shoppingList.items : []);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'POST':
      try {
        // Create or update shopping list
        const { items } = req.body;
        
        const shoppingList = await ShoppingList.findOneAndUpdate(
          { user: user._id },
          { items },
          { upsert: true, new: true }
        );

        return res.status(201).json(shoppingList.items);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'PUT':
      try {
        // Update entire shopping list
        const { items } = req.body;
        
        const shoppingList = await ShoppingList.findOneAndUpdate(
          { user: user._id },
          { items },
          { new: true }
        );

        if (!shoppingList) {
          return res.status(404).json({ error: "Shopping list not found" });
        }

        return res.status(200).json(shoppingList.items);
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    case 'DELETE':
      try {
        // Delete entire shopping list
        await ShoppingList.findOneAndDelete({ user: user._id });
        return res.status(200).json({ message: "Shopping list deleted successfully" });
      } catch (error) {
        return res.status(400).json({ error: error.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}