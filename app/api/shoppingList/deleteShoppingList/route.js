import { getServerSession } from "next-auth";
import ShoppingList from "@/app/models/shoppingList";

/**
 * Handles the DELETE request to remove a user's shopping list.
 * 
 * This function deletes the shopping list associated with the user ID
 * extracted from the request's URL search parameters. If the shopping list
 * is found and successfully deleted, it returns a success message with a 200 status.
 * If the shopping list is not found, or if any error occurs during the process,
 * it returns an error message with a 400 status.
 *
 * @param {Request} req - The incoming request object containing the URL with search parameters.
 * @returns {Response} - A response object with either a success or error message in JSON format.
 */
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("user");

    const shoppingList = await ShoppingList.findOneAndDelete({ user: id });
    if (!shoppingList) throw new Error("Shopping list not found");

    return new Response(
      JSON.stringify({ message: "Shopping list deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

