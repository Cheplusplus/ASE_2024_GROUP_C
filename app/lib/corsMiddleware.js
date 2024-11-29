// app/lib/corsMiddleware.js
export function setCORSHeaders(res) {
    res.setHeader("Access-Control-Allow-Origin", "https://ase-2024-group-c.vercel.app/"); // Replace with your frontend domain
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  