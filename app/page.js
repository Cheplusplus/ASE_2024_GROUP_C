import RecipeGrid from "./components/RecipeGrid";
import UserSession from "./components/UserSession";

export default function Home({searchParams}) {

  

 return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-background dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Decorative elements */}
        <UserSession/>
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-y-0 left-1/2 -z-10 overflow-hidden opacity-30">
            <div className="absolute -left-48 w-96 h-96 rounded-full bg-gradient-to-tr from-rose-200 to-rose-50 dark:from-rose-900 dark:to-rose-800 blur-2xl transition-colors duration-300" />
            <div className="absolute -right-48 w-96 h-96 rounded-full bg-gradient-to-tl from-blue-200 to-blue-50 dark:from-blue-900 dark:to-blue-800 blur-2xl transition-colors duration-300" />
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          <section className="w-full">
            <RecipeGrid searchParams={searchParams}/>
          </section>
        </div>
      </main>
    </div>
  );
}