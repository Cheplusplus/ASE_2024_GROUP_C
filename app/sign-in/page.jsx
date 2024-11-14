'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession, signIn } from "next-auth/react"

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');

  // const { data: session } = useSession()
  // if(session) {
  //   console.log('password123')
  //   router.back()
  // }

  const login = async(e)=>{
    e.preventDefault();
    console.log('slidelogin123')
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    console.log(result)
    if (result.error) {
      setError(result.error);
    } else {
      console.log('home')
      router.push('/') // Redirect to homepage after successful login
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In to Recipe Rush
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            New to Recipe Rush?{' '}
            <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign Up
            </Link>
          </p>
        </div>
        <form onSubmit={login} className="mt-8 space-y-6" >
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
            <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                // value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            {/* {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>} */}
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        <div className="mt-6">
          <button
            onClick={() => {signIn("google");router.back()}}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign In with Google
          </button>
        </div>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignIn;

