import Link from "next/link";
import Image from "next/image";


export default function MobileBar() {
    return (
      <div className="sticky bottom-4 mx-6 ">
        <div className="justify-center rounded-3xl px-2 w-full shadow-md z-10 md:hidden backdrop-blur-md bg-white/50 dark:bg-gray-900/30  transition-colors duration-200">
          <div className="flex justify-between items-center text-center p-4">
            <div className="text-center flex flex-col items-center">
              <Link href={"/shopping-list"}>
                <Image width={10} height={10} className=" w-6" src={"/cart.svg"} alt="" />
              </Link>
              <p className="text-[12px]">Shopping</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <Link href={"/search"}>
                <Image width={10} height={10}  className=" w-6" src={"/search2.svg"} alt="" />
              </Link>
              <p className="text-[12px]">Search</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <Link href="/favorites">
                <Image width={10} height={10}  className=" w-6" src={"/wishlist.svg"} alt="" />
              </Link>
              <p className="text-[12px]">Favourite</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <Link href="/profile">
                <Image width={10} height={10}  className=" w-6" src={"/user.svg"} alt="" />
              </Link>
              <p className="text-[12px]">Account</p>
            </div>
          </div>
        </div>
      </div>
    );
  }