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
  // Comments about cooking time
  const timeBasedComments = [
    `Perfect ${recipe.cook > 60 ? 'slow-cooked' : 'quick'} recipe - took exactly ${formatTime(recipe.cook + recipe.prep)} from start to finish.`,
    `Great ${recipe.prep < 30 ? 'weeknight' : 'weekend'} recipe! The prep time of ${formatTime(recipe.prep)} was ${recipe.prep < 30 ? 'manageable' : 'worth it'}.`,
    `Love that this only takes ${formatTime(recipe.cook)} to cook - perfect for ${recipe.cook < 45 ? 'busy evenings' : 'lazy weekends'}.`
  ];

  // Comments about ingredients and category
  const ingredientComments = [
    `The combination of ${Object.keys(recipe.ingredients).slice(0, 2).join(' and ')} really makes this ${recipe.category.toLowerCase()} special.`,
    `I had all the ingredients on hand - great pantry-friendly ${recipe.category.toLowerCase()}.`,
    `The ${Object.keys(recipe.ingredients)[0]} really shines in this recipe!`
  ];

  // Comments about serving size
  const servingComments = [
    `Perfect portion for ${recipe.servings} ${recipe.servings === 1 ? 'person' : 'people'}. Nothing went to waste.`,
    `Made this for a family of ${recipe.servings}, and the portions were spot-on.`,
    `Great recipe to ${recipe.servings > 4 ? 'feed a crowd' : 'serve for a small gathering'}.`
  ];

  // Specific comments about the recipe category
  const categoryComments = {
    'Dessert': [
      `The perfect amount of sweetness!`,
      `Great dessert that isn't too heavy.`,
      `My go-to sweet treat now.`
    ],
    'Main Course': [
      `Filling and satisfying main dish.`,
      `Restaurant-quality main course at home.`,
      `Perfect centerpiece for dinner.`
    ],
    'Appetizer': [
      `Perfect starter for any meal.`,
      `Great party appetizer!`,
      `Just the right size for a starter.`
    ],
    'Breakfast': [
      `Perfect way to start the day.`,
      `Great breakfast that keeps me full until lunch.`,
      `My new favorite morning recipe.`
    ],
    'Soup': [
      `So warming and comforting.`,
      `Perfect consistency for a soup.`,
      `Just what I want on a cold day.`
    ],
    'Salad': [
      `Fresh and crisp - perfect balance of ingredients.`,
      `Light and refreshing.`,
      `Great healthy option that doesn't sacrifice flavor.`
    ]
  };

  const nutritionComments = [
    `Love that it's only ${recipe.nutrition.calories} calories per serving!`,
    `Great protein content (${recipe.nutrition.protein}g) for a ${recipe.category.toLowerCase()}.`,
    `Nice low-carb option with only ${recipe.nutrition.carbohydrates}g of carbs.`
  ];

  // Combine all possible comments
  const allComments = [
    ...timeBasedComments,
    ...ingredientComments,
    ...servingComments,
    ...(categoryComments[recipe.category] || []),
    ...nutritionComments
  ];

  // Return a random comment
  return allComments[Math.floor(Math.random() * allComments.length)];
};

const RecipeDetailCard = ({ recipe }) => {
  const [activeTab, setActiveTab] = useState("ingredients");
  const [selectedImage, setSelectedImage] = useState(recipe.images[0]);
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

  // Generate recipe-specific review comments
  const enrichedReviews = recipe.reviews?.map((review, index) => ({
    ...review,
    comment: review.comment || generateReviewComment(recipe),
    date: randomDates[index % randomDates.length]
  }));

  // Sort reviews based on selected criteria
  const sortedReviews = enrichedReviews ? [...enrichedReviews].sort((a, b) => {
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
  }) : [];

  return (
    <div className="grid items-start grid-cols-1 md:grid-cols-2 gap-6">
      {/* Image gallery section */}
      <div className="w-full lg:sticky top-0 flex flex-col gap-3">
        <div className="w-full">
          <img
            src={selectedImage}
            alt={recipe.title}
            className="w-[540px] h-[403px] rounded-lg object-cover"
          />
        </div>
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
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{recipe.title}</h1>

        <div className="flex flex-wrap gap-2 my-4">
          {recipe.tags &&
            recipe.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {tag}
              </span>
            ))}
        </div>

        <p className="text-lg italic text-gray-600 mb-6">
          Discover how to make this delicious {recipe.title}.{" "}
          {recipe.description || "Perfect for any occasion"}.
        </p>

        <div className="text-lg text-gray-800 space-y-2">
          <p>
            <strong>Prep Time:</strong> {formatTime(recipe.prep)}
          </p>
          <p>
            <strong>Cook Time:</strong> {formatTime(recipe.cook)}
          </p>
          <p>
            <strong>Category:</strong> {recipe.category}
          </p>
          <p>
            <strong>Servings:</strong> {recipe.servings} servings
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
              <ul className="list-disc pl-6 text-gray-700">
                {Object.entries(recipe.ingredients).map(
                  ([ingredient, quantity], index) => (
                    <li key={index}>
                      {ingredient}: {quantity}
                    </li>
                  )
                )}
              </ul>
            </div>
          ) : activeTab === "instructions" ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
              <ol className="list-decimal pl-6 text-gray-700 space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="pl-2">{instruction}</li>
                ))}
              </ol>
            </div>
          ) : activeTab === "nutrition" ? (
            <div className="recipe-nutrition">
              <h3 className="text-2xl font-semibold mb-4">Nutrition Information</h3>
              <ul className="list-disc pl-6 text-gray-700">
                <li>Calories: {recipe.nutrition.calories}</li>
                <li>Fat: {recipe.nutrition.fat}g</li>
                <li>Saturated Fat: {recipe.nutrition.saturated}g</li>
                <li>Sodium: {recipe.nutrition.sodium}mg</li>
                <li>Carbohydrates: {recipe.nutrition.carbohydrates}g</li>
                <li>Fiber: {recipe.nutrition.fiber}g</li>
                <li>Sugar: {recipe.nutrition.sugar}g</li>
                <li>Protein: {recipe.nutrition.protein}g</li>
              </ul>
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
              
              {Array.isArray(sortedReviews) && sortedReviews.length > 0 ? (
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