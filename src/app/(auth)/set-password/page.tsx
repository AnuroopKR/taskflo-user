"use client";

import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const otp=searchParams.get("otp");

  const setPasswordFn = async (data: {
    email: string;
    password: string;
    otp:string;
  }) => {
    const res = await api.post("/auth/set-password", data);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: setPasswordFn,

    onSuccess: () => {
      console.log("Password updated successfully");

      router.push("/login");
    },

    onError: (error: any) => {
      console.log("Error:", error.response?.data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    mutation.mutate({
      email: email || "",
      password,
      otp:otp!
    });
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
              Set your new password
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            {/* Error */}
            {mutation.isError && (
              <p className="text-red-500 text-sm text-center">
                Something went wrong
              </p>
            )}

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
            >
              {mutation.isPending ? "Saving..." : "Set Password"}
            </button>
          </form>

          {/* Back */}
          <p className="text-center text-sm text-gray-500">
            <Link href="/login" className="text-yellow-500 hover:underline">
              Back to Login
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-yellow-100 to-white items-center justify-center p-10">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Create <span className="text-yellow-500">New Password</span>
          </h1>
          <p className="text-gray-600">
            Choose a strong password to keep your account secure.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-sm text-gray-500">
              “Security starts with a strong password.”
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}