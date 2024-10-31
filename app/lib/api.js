
export async function getRecipes({ category, tags, numSteps, ingredients, sortOption ,skip ,search }) {
  const res = await fetch(`http://localhost:3000/api/recipe?search=${search}&skip=${skip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`);
  console.log(res.status)
  if (!res.ok) throw new Error('Failed to fetch recipes');
  const data = await res.json();
  console.log(data)
  //console.log(data)
  return await data;
}
  
  export async function getCategories() {
    const res = await fetch('http://localhost:3000/api/categories');
    //console.log(res)
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
   console.log(data)
    return await data.categories;
  }

  

  


  