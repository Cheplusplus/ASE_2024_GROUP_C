export async function getRecipes({ category, tags, numSteps, ingredients, sortOption }) {
    const res = await fetch(`http://localhost:3000/api/recipe?category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`,{cache:'no-cache'});
    console.log(res.status)
    if (!res.ok) throw new Error('Failed to fetch recipes');
    const data = await res.json();
   // console.log(data)
    return await data;
  }
  