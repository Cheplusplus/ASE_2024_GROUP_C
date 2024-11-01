
export async function getRecipes({ category, tags, numSteps, ingredients, sortOption ,skip ,search }) {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  const res = await fetch(`${url}/api/recipe?search=${search}&skip=${skip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`,{cache:'no-cache'});
  console.log(res.status)
  if (!res.ok) throw new Error('Failed to fetch recipes');
  const data = await res.json();
  //console.log(data)
  //console.log(data)
  return await data;
}
  
  export async function getCategories() {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${url}/api/categories`);
    //console.log(res)
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
   //console.log(data)
    return await data.categories;
  }

  

  


  