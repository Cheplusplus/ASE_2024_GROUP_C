import RecipeGrid from "./components/RecipeGrid";

export default function Home({ searchParams }) {

  const skip = parseInt(searchParams.skip, 10) || 0;
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Decorative elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-y-0 left-1/2 -z-10 overflow-hidden bg-gray-50 opacity-30">
            <div className="absolute -left-48 w-96 h-96 rounded-full bg-gradient-to-tr from-rose-200 to-rose-50 blur-2xl" />
            <div className="absolute -right-48 w-96 h-96 rounded-full bg-gradient-to-tl from-blue-200 to-blue-50 blur-2xl" />
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <section className="w-full">
            <RecipeGrid skip={skip} />
          </section>
        </div>
      </main>
    </div>
  );
}