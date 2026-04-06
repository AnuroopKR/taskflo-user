"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export default function CreateEmployeePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    // image: "",
    role: "EMPLOYEE",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const userSubmit = async (data:any) => {
    const res = await api.post("/company/create-user", data);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: userSubmit,

    onSuccess: (data) => {
      console.log("Login success", data);

      // ✅ store token
      localStorage.setItem("accessToken", data.accessToken);

      // ✅ redirect
      router.push("/employees");
    },

    onError: (error: any) => {
      console.log("Login failed", error.response?.data);
    },
  });



  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    console.log("Employee Data:", form);

    mutation.mutate(form)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">
            Create Employee
          </h1>
          <p className="text-sm text-gray-500">
            Add a new team member
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5"
        >

          {/* Avatar Preview */}
          {/* <div className="flex items-center gap-4">
            <img
              src={
                form.image ||
                "https://via.placeholder.com/100x100?text=Avatar"
              }
              className="w-16 h-16 rounded-full border"
            />

            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={form.image}
              onChange={handleChange}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
            />
          </div> */}

          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.push("/dashboard/employees")}
              className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-600"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-sm bg-yellow-400 hover:bg-yellow-500 text-white shadow"
            >
              Create Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}