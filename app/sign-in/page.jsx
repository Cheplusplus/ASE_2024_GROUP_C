"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { useTheme } from "../components/ThemeProvider";
import Image from "next/image";

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useTheme();

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        setError(result.error);
        setTimeout(() => {
          setError("");
        }, 2000); // Reset message after 3 seconds
      } else {
        router.push("/");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    // Redirect to the current page after successful sign-in
    const callbackUrl = router.asPath;
    signIn("google", { callbackUrl: "/" });
  };
  return (
    <>
      <div className=" w-full h-full">
        <Image
          priority={true}
          src={"/wallpaper2.jpg"}
          alt={"wallpaper"}
          fill
          quality={99} // Balanced quality for performance
          sizes="(max-width: 768px) 100vw, (max-width: 2560px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="dark:brightness-75 w-full brightness-75 transition-all duration-300"
        />
      </div>
      <div
        className={`flex items-center justify-center px-3 min-h-screen ${
          theme === "dark" ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="relative max-w-md w-full space-y-8">
          <div>
            <h2
              className={`mt-6 text-center text-3xl font-extrabold ${
                theme === "dark" ? "text-white" : "text-gray-200"
              }`}
            >
              Sign In to Recipe Rush
            </h2>
            <p
              className={`mt-2 text-center text-sm ${
                theme === "dark" ? "text-gray-300" : "text-white"
              }`}
            >
              New to Recipe Rush?{" "}
              <Link
                href="/sign-up"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
          <form onSubmit={login} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border
                    ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-300 placeholder-gray-500 text-gray-900"
                    }
                    rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border
                    ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        : "border-gray-300 placeholder-gray-500 text-gray-900"
                    }
                    rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative gap-2 w-full flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="25"
                  height="25"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#4caf50"
                    d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"
                  ></path>
                  <path
                    fill="#1e88e5"
                    d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"
                  ></path>
                  <polygon
                    fill="#e53935"
                    points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"
                  ></polygon>
                  <path
                    fill="#c62828"
                    d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"
                  ></path>
                  <path
                    fill="#fbc02d"
                    d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"
                  ></path>
                </svg>
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <button
              onClick={handleSignIn}
              className="group relative w-full gap-2 flex justify-center items-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="25"
                height="25"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#FFC107"
                  d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
                <path
                  fill="#FF3D00"
                  d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                ></path>
                <path
                  fill="#4CAF50"
                  d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                ></path>
                <path
                  fill="#1976D2"
                  d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                ></path>
              </svg>
              Sign In with Google
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
