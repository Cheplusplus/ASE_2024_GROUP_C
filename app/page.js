import RecipeGrid from "./components/RecipeGrid";
import Image from "next/image";
import Carousel from "./components/Carousel";

export default async function Home({ searchParams, theme }) {
  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-gray-50 via-white to-gray-50"
      }`}
    >
      <div className="relative h-64 lg:min-h-72  overflow-hidden">
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "bg-black/40" : "bg-white/10"
          } z-10 `}
        />
        <Image
          priority={true}
          src={"/wallpaper1.jpg"}
          alt={"wallpaper"}
          fill
          quality={100}
          style={{ objectFit: "cover" }}
          className={`${
            theme === "dark" ? "brightness-75" : "brightness-100"
          } transition-all duration-300`}
        />
        
      </div>
      <div className="absolute top-64 z-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg w-11/12 p-4 shadow-lg ">
          <Carousel heading={'Recipes You Might Like...'} />
        </div>

      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pt-40 sm:pt-44 sm:py-16">
        {/* Decorative elements */}

        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-y-0 left-1/2 -z-10 overflow-hidden opacity-30">
            <div
              className={`absolute -left-48 w-96 h-96 rounded-full bg-gradient-to-tr ${
                theme === "dark"
                  ? "from-rose-900 to-rose-800"
                  : "from-rose-200 to-rose-50"
              } blur-2xl transition-colors duration-300`}
            />
            <div
              className={`absolute -right-48 w-96 h-96 rounded-full bg-gradient-to-tl ${
                theme === "dark"
                  ? "from-blue-900 to-blue-800"
                  : "from-blue-200 to-blue-50"
              } blur-2xl transition-colors duration-300`}
            />
          </div>
        </div>

        {/**This is Favourites SEction */}

        <div>
          <Carousel heading={'My Favourites'}/>
        </div>
      </main>
    </div>
  );
}
