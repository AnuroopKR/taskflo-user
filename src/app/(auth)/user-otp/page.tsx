"use client";

import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const [token, setToken] = useState("");
    const [loading, setLoading] = useState(true);


  const router = useRouter();

   useEffect(() => {
    const storedToken =
      localStorage.getItem("emailToken");

    if (!storedToken) {
      router.replace("/login");
      return;
    }

    setToken(storedToken);
    setLoading(false);
  }, [router]);

  // const searchParams = useSearchParams();

  // const email = searchParams.get("email"); // passed from login/register

  const verifyOtp = async (data: { token: string; code: string }) => {
    console.log(222,data.code)
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: verifyOtp,

    onSuccess: (data) => {
      console.log("OTP verified", data);

      // store token
      // localStorage.setItem("accessToken", data.accessToken);

      router.push("/login");
    },

    onError: (error: any) => {
      console.log("OTP failed", error.response?.data);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(1111,otp)
    mutation.mutate({ token: token || "", code:otp });
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
              Enter the OTP sent to your email
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="text-sm text-gray-600">OTP</label>
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg text-center tracking-widest text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-semibold transition"
            >
              Verify OTP
            </button>
          </form>

          {/* Resend */}
          <p className="text-center text-sm text-gray-500">
            Didn’t receive OTP?{" "}
            <span className="text-yellow-500 cursor-pointer hover:underline">
              Resend
            </span>
          </p>

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
            Secure <span className="text-yellow-500">Verification</span>
          </h1>
          <p className="text-gray-600">
            We’ve sent a one-time password to your email. Please enter it to continue.
          </p>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <p className="text-sm text-gray-500">
              “Your security is our priority.”
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}