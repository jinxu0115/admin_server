'use client';

import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for client-side navigation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default function Home() {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const [error, setError] = useState({ name: "", password: "" });
  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      setError({ ...error, name: "Name field is required" });
      return;
    }
    if (!formData.password) {
      setError({ ...error, password: "Password field is required" });
      return;
    }

    // axios.defaults.withCredentials = true;
     try {
      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/auth/login", formData);
      if (res.data.token) {
        toast.success("Login successful, redirecting...");
        sessionStorage.setItem("token", res.data.token); // Store token
        router.push('/dashboard'); // Navigate to dashboard
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      toast.error("An error occurred during authentication. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-gray-50 dark:bg-gray-900 text-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 bg-gray-500 dark:bg-gray-800">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="text-left">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your name
                  </label>
                  <input
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name"
                    required
                  />
                  {error.name && <p className="text-sm text-red-500">{error.name}</p>}
                </div>
                <div className="text-left">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {error.password && <p className="text-sm text-red-500">{error.password}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-indigo-400 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
