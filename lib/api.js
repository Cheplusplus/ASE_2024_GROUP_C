// lib/api.js

export async function getRecipes({ category, tags, numSteps, ingredients, sortOption, skip, search }) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/recipe?search=${search}&skip=${skip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`,
      { cache: 'no-store' }
    );
    console.log(`getRecipes response status: ${res.status}`);
    if (!res.ok) throw new Error('Failed to fetch recipes');
    
    const data = await res.json();
    console.log('Fetched recipes:', data);
    return data;
  } catch (error) {
    console.error('Error in getRecipes:', error);
    throw error;
  }
}

export async function getCategories() {
  try {
    const res = await fetch('http://localhost:3000/api/categories');
    console.log(`getCategories response status: ${res.status}`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    
    const data = await res.json();
    console.log('Fetched categories:', data.categories);
    return data.categories;
  } catch (error) {
    console.error('Error in getCategories:', error);
    throw error;
  }
}

export async function getUserProfile(userId) {
  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`);
    console.log(`getUserProfile response status: ${res.status}`);
    if (!res.ok) throw new Error("Failed to fetch user profile");
    
    const data = await res.json();
    console.log('Fetched user profile:', data);
    return data;
  } catch (error) {
    console.error('Error in getUserProfile:', error);
    throw error;
  }
}

export async function updateUserProfile(userId, data) {
  try {
    const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(`updateUserProfile response status: ${res.status}`);
    if (!res.ok) throw new Error("Failed to update profile");

    const result = await res.json();
    console.log('Updated user profile:', result);
    return result;
  } catch (error) {
    console.error('Error in updateUserProfile:', error);
    throw error;
  }
}