import { getServerSession } from "next-auth";
import ShoppingList from "@/app/models/shoppingList";
import User from "@/app/models/user";
import connectToDatabase from "@/app/lib/connectMongoose";
import { authOptions } from "../../auth/[...nextauth]/route";


// POST method handler
export async function POST(req) {
  try {
    await connectToDatabase();
    
    // Parse request body
    const { items, user } = await req.json();

    // Validate input
    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: "Items must be a non-empty array" }), { status: 400 });
    }

    // Find or create the user's shopping list
    let shoppingList = await ShoppingList.findOne({ user: user.id });

    if (!shoppingList) {
      // Create a new shopping list if none exists
      shoppingList = new ShoppingList({ user: user.id, items: [] });
    }

    // Add or update items in the shopping list
    items.forEach(newItem => {
      const existingItem = shoppingList.items.find(
        item => item.name.toLowerCase() === newItem.name.toLowerCase()
      );

      if (existingItem) {
        // Update quantity if item already exists
        existingItem.quantity += newItem.quantity;
      } else {
        // Add the new item
        shoppingList.items.push(newItem);
      }
    });

    // Save the shopping list
    await shoppingList.save();

    return new Response(JSON.stringify(shoppingList.items), { status: 201 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}


// PUT method handler
export async function PUT(req) {
  try {
    const user = await initialize(req);
    const { itemId, updates } = await req.json();

    if (!itemId || !updates) throw new Error("Item ID and updates are required");

    const shoppingList = await ShoppingList.findOne({ user: user._id });
    if (!shoppingList) throw new Error("Shopping list not found");

    const itemIndex = shoppingList.items.findIndex(
      (item) => item._id.toString() === itemId
    );
    if (itemIndex === -1) throw new Error("Item not found");

    // Update the item properties
    shoppingList.items[itemIndex] = { 
      ...shoppingList.items[itemIndex].toObject(), 
      ...updates 
    };

    await shoppingList.save();
    return new Response(JSON.stringify(shoppingList.items), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}


// DELETE method handler
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("user");
    const { itemId } = await req.json();

    if (!itemId) throw new Error("Item ID is required");

    const shoppingList = await ShoppingList.findOne({ user: id });
    if (!shoppingList) throw new Error("Shopping list not found");

    shoppingList.items = shoppingList.items.filter(
      (item) => item._id.toString() !== itemId
    );

    await shoppingList.save();
    return new Response(JSON.stringify(shoppingList.items), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}


export async function GET(req) {
  try {
     
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("user");

    console.log(id);

    const shoppingList = await ShoppingList.findOne({ user: id });
    if (!shoppingList) throw new Error("Shopping list not found");

    return new Response(JSON.stringify(shoppingList.items), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
