// "use client";
// import React, { useState, useEffect } from 'react';
// import RecipeCard from '../components/RecipeCard';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';

// const FavouritesPage = () => {
//   const [favourites, setFavourites] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/sign-in');
//       return;
//     }

//     if (status === 'authenticated') {
//       fetchFavourites();
//     }
//   }, [status]);

//   const fetchFavourites = async () => {
//     try {
//       const response = await fetch('/api/favourites');
//       if (!response.ok) throw new Error('Failed to fetch favourites');
//       const data = await response.json();
//       setFavourites(data.favourites);
//     } catch (error) {
//       console.error('Error fetching favourites:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveFavourite = async (recipeId) => {
//     try {
//       const response = await fetch('/api/favourites', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ recipeId })
//       });

//       if (!response.ok) throw new Error('Failed to remove favourite');
//       setFavourites(prev => prev.filter(recipe => recipe._id !== recipeId));
//     } catch (error) {
//       console.error('Error removing favourite:', error);
//     }
//   };

//   if (loading) {
//     return <div className="container mx-auto p-4">Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">My Favourites</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {favourites.length > 0 ? (
//           favourites.map(recipe => (
//             <RecipeCard
//               key={recipe._id}
//               recipe={recipe}
//               onRemoveFromFavourites={() => handleRemoveFavourite(recipe._id)}
//               isFavourited={true}

//             />
//           ))
//         ) : (
//           <p className="text-gray-500">You have no favourite recipes yet. Start adding some!</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FavouritesPage;



"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import RecipeCard from '../components/RecipeCard';
const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/sign-in');
      return;
    }

    if (status === 'authenticated') {
      fetchFavourites();
    }
  }, [status]);

  const fetchFavourites = async () => {
    try {
      const response = await fetch('/api/favourites');
      if (!response.ok) throw new Error('Failed to fetch favourites');
      const data = await response.json();
      setFavourites(data.favourites);
    } catch (error) {
      console.error('Error fetching favourites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavourite = async (recipeId) => {
    try {
      const response = await fetch('/api/favourites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipeId })
      });

      if (!response.ok) throw new Error('Failed to remove favourite');
      
      const data = await response.json();
      setFavourites(prev => prev.filter(recipe => recipe._id !== recipeId));
      
      // Update global favourites count (you might want to use a global state management solution)
      document.dispatchEvent(new CustomEvent('favouritesUpdated', { 
        detail: { count: data.count } 
      }));
    } catch (error) {
      console.error('Error removing favourite:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 mt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6">My Favourites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favourites.length > 0 ? (
          favourites.map(recipe => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              onRemoveFromFavourites={() => handleRemoveFavourite(recipe._id)}
              isFavourited={true}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p className="text-gray-500 text-lg">You have no favourite recipes yet.</p>
            <button
              onClick={() => router.push('/all')}
              className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Browse Recipes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavouritesPage;