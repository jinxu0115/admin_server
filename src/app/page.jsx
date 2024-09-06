'use client';

import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Use 'next/navigation' for client-side navigation
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Link from 'next/link';

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
        if (typeof window !== "undefined") {
          router.push('/call-log');
        }
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
      <section className="bg-[#222e44] text-center">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#222e44] md:text-2xl ">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="text-left">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-[#222e44] ">
                    User Name
                  </label>
                  <input
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-[#222e44] sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 "
                    placeholder="username"
                    required
                  />
                  {error.name && <p className="text-sm text-red-500">{error.name}</p>}
                </div>
                <div className="text-left">
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#222e44] ">
                    Password
                  </label>
                  <input
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 "
                    required
                  />
                  {error.password && <p className="text-sm text-red-500">{error.password}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-[#222e44] hover:bg-[#1e283a] focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Sign in
                </button>
              </form>
              <div>
                <Link href="/call-log" className="w-full flex justify-start">
                  <button className="underline text-blue-400">
                    Call Logs
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
}
