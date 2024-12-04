
// app/lib/corsMiddleware.js
export function setCORSHeaders(req) {
  const headers = new Headers();

  headers.set("Access-Control-Allow-Origin", "https://ase-2024-group-c.vercel.app");
  headers.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  headers.set("Access-Control-Allow-Credentials", "true");

  // Handle OPTIONS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers,
    });
  }

  return headers; // Return headers to apply to the final response
}

