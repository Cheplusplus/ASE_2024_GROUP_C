import { useState } from "react";
import { Star, ChevronDown } from "lucide-react";

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`${
            index < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

const getRandomName = () => {
  const firstNames = [
    "Emma", "Liam", "Olivia", "Noah", "Ava", "Lucas", "Sophia", "Mason",
    "Isabella", "William", "Mia", "James", "Charlotte", "Oliver", "Amelia",
    "Benjamin", "Harper", "Elijah", "Evelyn", "Alexander"
  ];
  const lastNames = [
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller",
    "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez",
    "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"
  ];
  
  const randomFirst = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLast = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${randomFirst} ${randomLast}`;
};

const getRandomDate = () => {
  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(today.getMonth() - 6);
  
  return new Date(
    sixMonthsAgo.getTime() + Math.random() * (today.getTime() - sixMonthsAgo.getTime())
  );
};

const generateReviewComment = (recipe) => {
  if (!recipe) return "Great recipe!";

  const positive = [
    `These ${recipe.title.toLowerCase()} turned out perfectly!`,
    `Great recipe! Will definitely make this again.`,
    `My family loved this! Adding it to our regular rotation.`,
    `The texture was perfect and it came out exactly as described.`,
    `Followed the recipe exactly and it was amazing!`
  ];

  const constructive = [
    `Good recipe, might adjust the seasoning next time.`,
    `Needed a few more minutes of ${recipe.cook > recipe.prep ? 'cooking' : 'prep'} time for my taste.`,
    `Solid basic recipe that's easy to customize with your favorite ingredients.`,
    `Came out well but I'd recommend adjusting the seasonings to taste.`,
    `Nice recipe overall. Would love to see more variations.`
  ];

  const specific = [
    `The instructions were clear and easy to follow.`,
    `Great combination of flavors in this recipe.`,
    `${recipe.prep > 30 ? 'Prep time was worth it' : 'Quick and easy to prepare'} - the end result was delicious.`,
    `The ${recipe.category} flavors really came through beautifully.`,
    `Perfect portion for ${recipe.servings} people.`
  ];

  // Add ingredient-specific comments if available
  if (recipe.ingredients && Object.keys(recipe.ingredients).length > 0) {
    const mainIngredient = Object.keys(recipe.ingredients)[0];
    specific.push(`Love how the ${mainIngredient.toLowerCase()} adds to the overall taste.`);
  }

  // Add tag-specific comments if available
  if (recipe.tags && recipe.tags.length > 0) {
    specific.push(`Great ${recipe.tags[0].toLowerCase()} recipe!`);
  }

  const allComments = [...positive, ...constructive, ...specific];
  return allComments[Math.floor(Math.random() * allComments.length)];
};

const RecipeDetailCard = ({ recipe }) => {
  if (!recipe) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">Recipe not found</p>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedImage, setSelectedImage] = useState(recipe.images?.[0]);
  const [randomNames] = useState(() => 
    Array(50).fill(null).map(() => getRandomName())
  );
  const [randomDates] = useState(() => 
    Array(50).fill(null).map(() => getRandomDate())
  );
  const [sortBy, setSortBy] = useState("newest");

  const formatReviewerName = (reviewer, index) => {
    if (!reviewer) return randomNames[index % randomNames.length];
    return `${reviewer.firstName || ''} ${reviewer.lastName || ''}`.trim() || 
           randomNames[index % randomNames.length];
  };

  const enrichedReviews = (recipe.reviews || []).map((review, index) => ({
    ...review,
    comment: review.comment || generateReviewComment(recipe),
    date: review.date || randomDates[index % randomDates.length]
  }));

  const sortedReviews = [...enrichedReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date) - new Date(a.date);
      case "oldest":
        return new Date(a.date) - new Date(b.date);
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
      {/* Image gallery section */}
      <div className="w-full lg:sticky top-0 flex flex-col gap-3">
        <div className="w-full">
          {recipe.images && recipe.images.length > 0 ? (
            <img
              src={selectedImage || recipe.images[0]}
              alt={recipe.title}
              className="w-[540px] h-[403px] rounded-lg object-cover"
            />
          ) : (
            <div className="w-[540px] h-[403px] rounded-lg bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No image available</p>
            </div>
          )}
        </div>
        {recipe.images && recipe.images.length > 1 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {recipe.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index}`}
                className={`w-16 h-16 rounded-md cursor-pointer object-cover ${
                  selectedImage === image ? "border-2 border-gray-800" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        )}
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{recipe.title}</h1>

        {recipe.tags && recipe.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-4">
            {recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-lg italic text-gray-600 mb-6">
          Discover how to make this delicious {recipe.title}.{" "}
          {recipe.description || "Perfect for any occasion"}.
        </p>

        <div className="text-lg text-gray-800 space-y-2">
          <p>
            <strong>Prep Time:</strong> {formatTime(recipe.prep || 0)}
          </p>
          <p>
            <strong>Cook Time:</strong> {formatTime(recipe.cook || 0)}
          </p>
          <p>
            <strong>Category:</strong> {recipe.category || "Uncategorized"}
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings || 1} servings
          </p>
          <p>
            <strong>Published:</strong>{" "}
            {new Date(recipe.published).toLocaleDateString()}
          </p>
        </div>

        <ul className="grid grid-cols-4 mt-10 border-b-2">
          <li
            className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
              activeTab === "ingredients" ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setActiveTab("ingredients")}
          >
            Ingredients
          </li>
          <li
            className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
              activeTab === "instructions" ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setActiveTab("instructions")}
          >
            Instructions
          </li>
          <li
            className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
              activeTab === "nutrition" ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setActiveTab("nutrition")}
          >
            Nutrition
          </li>
          <li
            className={`text-gray-800 font-semibold text-base text-center py-3 cursor-pointer ${
              activeTab === "reviews" ? "border-b-2 border-gray-800" : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </li>
        </ul>

        <div className="mt-6">
          {activeTab === "ingredients" ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Ingredients</h2>
              {recipe.ingredients && Object.keys(recipe.ingredients).length > 0 ? (
                <ul className="list-disc pl-6 text-gray-700">
                  {Object.entries(recipe.ingredients).map(
                    ([ingredient, quantity], index) => (
                      <li key={index}>
                        {ingredient}: {quantity}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-gray-500">No ingredients listed</p>
              )}
            </div>
          ) : activeTab === "instructions" ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              {recipe.instructions && recipe.instructions.length > 0 ? (
                <ol className="list-decimal pl-6 text-gray-700 space-y-4">
                  {recipe.instructions.map((instruction, index) => (
                    <li key={index} className="pl-2">{instruction}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500">No instructions available</p>
              )}
            </div>
          ) : activeTab === "nutrition" ? (
            <div className="recipe-nutrition">
              <h3 className="text-2xl font-semibold mb-4">Nutrition Information</h3>
              {recipe.nutrition ? (
                <ul className="list-disc pl-6 text-gray-700">
                  <li>Calories: {recipe.nutrition.calories || 0}</li>
                  <li>Fat: {recipe.nutrition.fat || 0}g</li>
                  <li>Saturated Fat: {recipe.nutrition.saturated || 0}g</li>
                  <li>Sodium: {recipe.nutrition.sodium || 0}mg</li>
                  <li>Carbohydrates: {recipe.nutrition.carbohydrates || 0}g</li>
                  <li>Fiber: {recipe.nutrition.fiber || 0}g</li>
                  <li>Sugar: {recipe.nutrition.sugar || 0}g</li>
                  <li>Protein: {recipe.nutrition.protein || 0}g</li>
                </ul>
              ) : (
                <p className="text-gray-500">Nutrition information not available</p>
              )}
            </div>
          ) : (
            <div className="recipe-reviews">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-semibold">User Reviews</h3>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rated</option>
                    <option value="lowest">Lowest Rated</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
              </div>
              
              {sortedReviews.length > 0 ? (
                <div className="space-y-6">
                  {sortedReviews.map((review, index) => (
                    <div 
                      key={index} 
                      className="bg-gray-50 rounded-lg p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {formatReviewerName(review.reviewer, index)}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {new Date(review.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="mt-3 text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">No reviews yet. Be the first to review this recipe!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailCard;