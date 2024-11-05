'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword, signInWithGoogle } from '../utils/auth'; // Mock functions for signin

/**
 * Handles sign-in authentication with email and password
 * @async
 * @function
 * @param {React.FormEvent<HTMLFormElement>} e - The form event
 * @returns {undefined}
 */
const SignIn = () => {
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
      await signInWithEmailAndPassword(email, password);
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles Google sign-in authentication
   * @async
   * @function
   * @returns {undefined}
   */
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  