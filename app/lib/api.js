
export async function getRecipes({ category, tags, numSteps, ingredients, sortOption ,skip ,search }) {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
  console.log(url)
  const res = await fetch(`${url}/api/recipe?search=${search}&skip=${skip}&category=${category}&tags=${tags.join(',')}&numSteps=${numSteps}&ingredients=${ingredients}&sortOption=${sortOption}`,{cache:'no-store'},{
  headers: { 'Content-Type': 'application/json' }
});
  console.log(res)
  if (!res.ok) throw new Error('Failed to fetch recipes');
  const data = await res.json();
  console.log(data.recipes[0])
  //console.log(data)
  return  data;
}
  
  export async function getCategories() {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const res = await fetch(`${url}/api/categories`);
  //  console.log(res)
    if (!res.statusText == 'OK') throw new Error('Failed to fetch categories');
    const data = await res.json();
    console.log(data)
    return  data.categories;
  }

  

  


  