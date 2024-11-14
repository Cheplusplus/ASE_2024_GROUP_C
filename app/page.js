import RecipeGrid from "./components/RecipeGrid";
import UserSession from "./components/UserSession";
import Image from "next/image";
// import wallpaper from '@/public/wallpaper1'

export default function Home({searchParams}) {

  

 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="relative h-64 lg:min-h-72 overflow-hidden">
        <Image
              priority = {true}
              src={'/wallpaper1.jpg'}
              alt={'wallpaper'}
              fill
              quality={100} // Increased quality to improve clarity
              style={{objectFit:"cover"}}
              className=""
              // sizes="(max-width: 768px) 100vw , (max-width:1200px)  50vw ,33vw"
            />
      </div>
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Decorative elements */}
        <UserSession/>

        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-y-0 left-1/2 -z-10 overflow-hidden bg-gray-50 opacity-30">
            <div className="absolute -left-48 w-96 h-96 rounded-full bg-gradient-to-tr from-rose-200 to-rose-50 blur-2xl" />
            <div className="absolute -right-48 w-96 h-96 rounded-full bg-gradient-to-tl from-blue-200 to-blue-50 blur-2xl" />
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