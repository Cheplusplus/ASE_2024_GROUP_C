// lib/api.js

export async function getUserProfile(user,db) {
  try {
    const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${url}/api/user/?user=${user}&db=${db}`);
    console.log(`getUserProfile response status: ${res.status}`);
    if (!res.ok) throw new Error("Failed to fetch user profile");
    
    const data = await res.json();
    // console.log('Fetched user profile:', data);
    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw error;
  }
}

export async function updateUserProfile(user, data) {
  try {
    const res = await fetch(`http://localhost:3000/api/user/?email=${user.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), // Contains updated name and email
    });

    console.log(`updateUserProfile response status: ${res.status}`);
    if (!res.ok) throw new Error("Failed to update profile");

    const result = await res.json();
    console.log("Updated user profile:", result);
    return result;
  } catch (error) {
    console.error("Error in updateUserProfile:", error);
    throw error;
  }
}
