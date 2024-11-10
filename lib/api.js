// lib/api.js

export async function getRecipes({ category, tags, numSteps, ingredients, sortOption, skip, search }) {
  const res = await fetch(
    `http://localhost:3000/api/recipe?search=${search}&skip=${skip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`,
    { cache: 'no-store' }
  );
  console.log(res.status);
  if (!res.ok) throw new Error('Failed to fetch recipes');
  const data = await res.json();
  console.log(data);
  return data;
}

export async function getCategories() {
  const res = await fetch('http://localhost:3000/api/categories');
  console.log(res.status);
  if (!res.ok) throw new Error('Failed to fetch categories');
  const data = await res.json();
  console.log(data);
  return data.categories;
}

export async function getUserProfile(userId) {
  const res = await fetch(`http://localhost:3000/api/user/${userId}`);
  console.log(res.status);
  if (!res.ok) throw new Error("Failed to fetch user profile");
  const data = await res.json();
  console.log(data);
  return data;
}

export async function updateUserProfile(userId, data) {
  const res = await fetch(`http://localhost:3000/api/user/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  console.log(res.status);
  if (!res.ok) throw new Error("Failed to update profile");
  const result = await res.json();
  console.log(result);
  return result;
}
