'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signUpWithEmailAndPassword, signUpWithGoogle } from '../utils/auth'; // Mock functions for signup

/**
 * Handles sign-up authentication with email and password
 * @async
 * @function
 * @param {React.FormEvent<HTMLFormElement>} e - The form event
 * @returns {undefined}
 */
const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signUpWithEmailAndPassword(email, password);
      router.push('/'); // Redirect to home on successful signup
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

/**
 * Handles Google sign-up authentication
 * @async
 * @function
 * @returns {undefined}
 */
  const handleGoogleSignUp = async () => {
    setLoading(true);
    setError(null);
    try {
      await signUpWithGoogle();
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign Up for Recipe Rush
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/account/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign In
            </Link>
          </p>
        </div>
       