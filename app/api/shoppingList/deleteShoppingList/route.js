import { getServerSession } from "next-auth";
import ShoppingList from "@/app/models/shoppingList";

export async function DELETE(req) {
  try {
    // const user = await initialize(req); // Authenticate and retrieve user

    const shoppingList = await ShoppingList.findOneAndDelete({ user: user.id });
    if (!shoppingList) throw new Error("Shopping list not found");

    return new Response(
      JSON.stringify({ message: "Shopping list deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

