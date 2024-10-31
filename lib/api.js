// lib/api.js

  export async function getCategories() {
    const res = await fetch('http://localhost:3000/api/categories');
    //console.log(res)
    if (!res.ok) throw new Error('Failed to fetch categories');
    const data = await res.json();
   console.log(data)
    return await data.categories;
  }

  

  


  