import connectToDatabase from "@/lib/connectMongoose";
import User from "@/app/models/User";

// Fetch and update user profile
export default async function handler(req, res) {
  await connectToDatabase();

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user data" });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, email, username } = req.body;
      const user = await User.findByIdAndUpdate(
        id,
        { name, email, username },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error updating user data" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
