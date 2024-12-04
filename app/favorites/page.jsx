"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import RecipeCard from '../components/RecipeCard';
import { TrashIcon } from 'lucide-react';
import {useNotification, NOTIFICATION_TYPES,} from "../components/NotificationContext";

const FavouritesPage = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const { addNotification } = useNotification();
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

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
      const response = await fetch(`${url}/api/favourites/fav`);
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
      const response = await fetch('/api/favourites/fav', {
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

  const handleClearAllFavourites = async () => {
    try {
      const response = await fetch(`${url}/api/favourites/clear`, { method: 'DELETE' });
      
      if (!response.ok) throw new Error('Failed to clear favourites');
      
      setFavourites([]);
      addNotification( 'Cleared entire Favourites list', NOTIFICATION_TYPES.INFO)
      
      // Update global favourites count
      document.dispatchEvent(new CustomEvent('favouritesUpdated', { 
        detail: { count: 0 } 
      }));
    } catch (error) {
      addNotification(error.message, NOTIFICATION_TYPES.ERROR);
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
       <div className="flex flex-col justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-centre mb-6">My Favourites</h1>
        {favourites.length > 0 && (
          <button
            onClick={handleClearAllFavourites}
            //className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 mt-6 mb-6"
            title="Clear Favourites List"
          >
            <TrashIcon />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favourites.length > 0 ? (
          favourites.map((recipe={}) => (
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
              className="mt-4 px-6 py-2 bg-green-700 text-white rounded-md hover:bg-blue-600 transition-colors"
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