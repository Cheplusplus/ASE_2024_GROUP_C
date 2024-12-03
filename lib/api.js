// lib/api.js


/**
 * Fetches the user profile from the specified database.
 *
 * This asynchronous function sends a GET request to the API endpoint to 
 * retrieve the user's profile data based on the provided user identifier 
 * and database. If the request is successful, it returns the user data. 
 * If the request fails, it throws an error.
 *
 * @param {string} user - The user identifier (e.g., email or user ID).
 * @param {string} db - The database from which to fetch the user profile (e.g., 'test' or 'devdb').
 * @throws {Error} If the request fails or the response is not successful.
 * @returns {Promise<Object>} A promise that resolves to the user's profile data.
 */
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

/**
 * Updates the user profile in the database.
 *
 * This asynchronous function sends a PUT request to the API endpoint to update
 * the user's profile data. It expects the user's email and the updated fields
 * (name and/or email) as part of the request body. If the request is successful,
 * it returns the updated user data. If the request fails, it throws an error.
 *
 * @param {Object} user - The user object with an email property.
 * @param {Object} data - The object containing the updated name and/or email.
 * @throws {Error} If the request fails or the response is not successful.
 * @returns {Promise<Object>} A promise that resolves to the updated user's profile data.
 */

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
