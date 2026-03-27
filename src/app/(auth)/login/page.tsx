"use client";

import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


 const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      console.log("Login success", data);

      // ✅ store token
      localStorage.setItem("accessToken", data.accessToken);

      // ✅ redirect
      window.location.href = "/dashboard";
    },

    onError: (error: any) => {
      console.log("Login failed", error.response?.data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email,password)
    mutation.mutate({ email, password });
  };




  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* LEFT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-6">
          
          {/* Logo */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Task<span className="text-yellow-500">Flow</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Login to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                placeholder="john@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#" className="text-yellow-500 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link href={'/register'}><span className="text-yellow-500 cursor-pointer hover:underline">
              Sign up
            </span></Link>
          </p>
        </div>
      </div>



      {/* RIGHT SIDE */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-yellow-100 to-white items-center justify-center p-10">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to <span className="text-yellow-500">TaskFlow</span>
          </h1>
          <p className="text-gray-600">
            Manage your tasks, boost productivity, and collaborate with your team efficiently.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-sm text-gray-500">
              “Stay organized and never miss a deadline again.”
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}