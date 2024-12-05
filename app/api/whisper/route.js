export const runtime = 'nodejs'; // Ensure the handler runs in a Node.js environment

/**
 * Handles a POST request to generate a helpful cooking tip or substitution
 * based on a given recipe and question. The request body should contain a
 * JSON object with two properties:
 *
 * - `question`: A string representing the question or problem the user is
 *   facing while cooking with the given recipe.
 * - `recipe`: An object containing the ingredients and amounts used in the
 *   recipe. The keys should be the ingredient names, and the values should
 *   be strings representing the amount of each ingredient (e.g. "2 cups of
 *   sugar" or "1/4 cup of milk").
 *
 * The response will be a JSON object containing a single property called
 * `answer`, which is a string representing the helpful cooking tip or
 * substitution.
 *
 * @function
 * @param {Request} req The incoming request object.
 * @returns {Response} The response object.
 */
export async function POST(req) {
  try {
    const body = await req.json(); // Parse the JSON body from the request
    const { question, recipe } = body;
    const ingredientsString = Object.entries(recipe)
  .map(([ingredient, amount]) => `${amount} of ${ingredient}`)
  .join(", ");


    // Define the conversation messages
    const messages = [
      {
        role: "system",
        content: "You are a helpful cooking assistant who provides tips and substitutions for recipes.",
      },
      {
        role: "user",
        content: `Recipe: ${ingredientsString}\n\nQuestion: ${question}\n\nProvide a helpful, short, and concise answer.`,
      },
    ];

    // Use fetch to call the OpenAI Chat API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Include your API key here
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Specify the model
        messages: messages,
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    // Handle the response
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`OpenAI API Error: ${errorDetails}`);
    }

    const data = await response.json();

    // Return the answer to the client
    return new Response(
      JSON.stringify({ answer: data.choices[0].message.content.trim() }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // Log the error for debugging
    console.error("Error in POST handler:", error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
