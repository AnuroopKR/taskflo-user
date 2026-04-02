"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export default function CreateProjectPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "ACTIVE",
    priority: "MEDIUM",
    startDate: "",
    dueDate: "",
    color: "#FACC15",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const projectSubmit = async (data:any) => {
    const res = await api.post("/project", data);
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: projectSubmit,

    onSuccess: (data) => {
      console.log("Login success", data);

      // ✅ store token
      localStorage.setItem("accessToken", data.accessToken);

      // ✅ redirect
      router.push("/dashboard");
    },

    onError: (error: any) => {
      console.log("Login failed", error.response?.data);
    },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(form);
      mutation.mutate(form)
    } catch (err) {
      console.error(err);
      alert("Error creating project");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full flex justify-center mt-10 px-4">
      <div className="w-full max-w-2xl bg-white border border-gray-100 shadow-md rounded-3xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Create New Project
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-600">Project Name</label>
            <input
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter project name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400"
              rows={3}
              placeholder="Project description"
            />
          </div>

          {/* Row: Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400"
              >
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          {/* Row: Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Start Date</label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>

          {/* Color Picker */}
          <div>
            <label className="text-sm text-gray-600">Project Color</label>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="color"
                name="color"
                value={form.color}
                onChange={handleChange}
                className="w-12 h-10 border rounded-lg cursor-pointer"
              />
              <span className="text-sm text-gray-500">{form.color}</span>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 hover:bg-yellow-500 text-white py-3 rounded-xl mt-4 transition"
          >
            {loading ? "Creating..." : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
}
