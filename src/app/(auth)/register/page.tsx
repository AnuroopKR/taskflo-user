"use client";

import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useState } from "react";

export default function CompanyRegisterPage() {
  const [form, setForm] = useState({
    companyName: "",
    email: "",
    name:"",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const loginUser = async (data: {
    companyName:string;
  email: string;
  name:string;
  password: string;
  confirmPassword:string;
}) => {
  const res = await api.post("/auth/", data);
  return res.data;
};

const mutation = useMutation({
    mutationFn: loginUser,

    onSuccess: (data) => {
      console.log("register success", data);

      // ✅ store token
      localStorage.setItem("accessToken", data.accessToken);

      // ✅ redirect
    //   window.location.href = "/dashboard";
    },

    onError: (error: any) => {
      console.log("Login failed", error.response?.data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(form);
     mutation.mutate(form);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      
      {/* LEFT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md space-y-6">
          
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Company
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Set up your workspace
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Company Name */}
            <div>
              <label className="text-sm text-gray-600">Company Name</label>
              <input
                type="text"
                name="companyName"
                placeholder="Enter company name"
                value={form.companyName}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                placeholder="company@email.com"
                value={form.email}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
                        <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Team Size */}
            {/* <div>
              <label className="text-sm text-gray-600">Team Size</label>
              <select
                name="teamSize"
                value={form.teamSize}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="">Select team size</option>
                <option value="1-5">1 - 5</option>
                <option value="6-20">6 - 20</option>
                <option value="21-50">21 - 50</option>
                <option value="50+">50+</option>
              </select>
            </div> */}

            {/* Password */}
            <div>
              <label className="text-sm text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Create Company
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href={'/login'}><span className="text-yellow-500 cursor-pointer hover:underline">
              Login
            </span></Link>
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-yellow-100 to-white items-center justify-center p-10">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Start your journey with{" "}
            <span className="text-yellow-500">TaskFlow</span>
          </h1>
          <p className="text-gray-600">
            Create your company workspace and manage your team efficiently.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-sm text-gray-500">
              “Build teams. Track tasks. Deliver faster.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}