// components/Carousel.js
import Link from "next/link";
import Image from "next/image";

const Carousel = async ({ heading }) => {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Fetch data with revalidation set to 10 minutes (600 seconds)
  const res = await fetch(`${url}/api/10Recipes`, {
    next: { revalidate: 600 }, // Revalidate after 10 minutes
  });

  if (!res.ok) {
    throw new Error("Failed to fetch recipes");
  }

  const data = await res.json();
  const recipes = data.recipes; // Assuming the API response has a 'recipes' key

  if (!recipes || recipes.length === 0) {
    return <p>No recipes available at the moment.</p>;
  }

  return (
    <div>
      <h2 className="text-center text-lg font-semibold mb-3">
        {heading}
      </h2>

      {/* Carousel */}
      <div className="flex items-center">
        <div className="flex gap-4 overflow-x-auto text-center scrollbar-hide">
          {recipes.map((recipe, index) => (
            <div key={index} className="min-w-[150px]">
              <Link href={`/recipes/${recipe._id}`}>
                <Image
                  priority={true}
                  style={{ objectFit: "cover", width: "auto", height: "112px" }}
                  src={recipe.images[0]}
                  alt={recipe.title}
                  width={150}
                  height={150}
                  className="rounded-sm"
                />
                <p className="text-center text-sm mt-2">
                  {recipe.title.length > 20
                    ? `${recipe.title.substring(0, 10)}...`
                    : recipe.title}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
