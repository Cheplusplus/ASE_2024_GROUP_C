import RecipeGrid from "./components/RecipeGrid";
import Image from "next/image";
import Carousel from "./components/Carousel";
import Link from "next/link";
import LayoutRecipesGrid from "./components/LayoutRecipesGrid";
// import ViewAll from "./components/ui/ViewAll";

export default async function Home({ theme }) {
  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="relative h-64 md:min-h-96  overflow-hidden">
        <div className="absolute inset-0 bg-background/40 dark:bg-black/40 z-10" />
        <Image
          priority={true}
          src={"/wallpaper2.jpg"}
          alt={"wallpaper"}
          fill
          quality={100} // Balanced quality for performance
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="dark:brightness-75 brightness-100 transition-all duration-300"
        />
      </div>
      <div className="absolute top-64 md:top-96 z-20 left-1/2 transform -translate-x-1/2 bg-white rounded-lg w-11/12 p-4 py-6 shadow-lg ">
        <Carousel heading={"Recipes You Might Like..."} />
        {/* <ViewAll/> */}
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

        <div className="pt-4">
          <h1 className="flex items-center text-3xl font-bold text-gray-800 mb-3">
            Recipes
            <hr className="flex-grow ml-4 border-t-4 border-gray-800" />
          </h1>

          <LayoutRecipesGrid />
        </div>

        <div className="relative h-64 md:min-h-80  overflow-hidden">
          <div className="absolute inset-0 bg-background/40 dark:bg-black/40 z-10" />
          <Image
            priority={true}
            src={"/wallpaper2.jpg"}
            alt={"wallpaper"}
            fill
            quality={100} // Balanced quality for performance
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="dark:brightness-75 w-full brightness-100 transition-all duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <Link
              className="inline-flex items-center gap-2 rounded border border-[#26442a] bg-[#26442a] px-8 py-3 text-white hover:bg-transparent hover:text-[#26442a] focus:outline-none focus:ring active:text-[#26442a]"
              href="/all"
            >
              <span className="text-md font-medium"> All Recipes </span>

              <svg
                className="size-5 rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/**This is Favourites SEction */}

        {/* <div>
          <Carousel heading={"My Favourites"} />
        </div> */}
      </main>
    </div>
  );
}
