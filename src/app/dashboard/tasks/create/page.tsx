"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@/types/project";
import api from "@/lib/axios";
import { useSearchParams } from "next/navigation";

export default function CreateTaskPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
const projectIdFromQuery = searchParams.get("projectId");

  const [form, setForm] = useState({
    title: "",
    description: "",
    projectId: "",
    createdBy: "",
    assignedTo: "",
    status: "PENDING",
    priority: "MEDIUM",
    startDate: "",
    dueDate: "",
  });

  const getProjects = async () => {
  const res = await api.get("/project"); // adjust endpoint
  console.log(res.data)
  return res.data;
};
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

    const { data: members = [] } = useQuery({
    queryKey: ["members", projectIdFromQuery],
    queryFn: async () => {
      const res = await api.get(`/project/${projectIdFromQuery}/members`);
      return res.data.data;
    },
    enabled: !!projectIdFromQuery,
  });

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
    
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  // async function handleSubmit(e: React.FormEvent) {
  //   e.preventDefault();

  //   console.log("Task Data:", form);

  //   await fetch("/api/tasks", {
  //     method: "POST",
  //     body: JSON.stringify(form),
  //   });

  //   router.push("/projects");
  // }
  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  console.log("Task Data:", form);

  createTaskMutation.mutate(form);
}

 const createTaskMutation = useMutation({
  mutationFn: async (data: typeof form) => {
    const payload = {
      ...data,
      projectId: Number(data.projectId), // 🔥 important
      startDate: data.startDate ? new Date(data.startDate) : null,
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
    };

    const res = await api.post("/task", payload);

    return res.data; // ✅ axios returns data here
  },

  onSuccess: () => {
    router.push("/dashboard/projects");
  },

  onError: (error: any) => {
    console.error("❌ Error:", error.response?.data || error.message);
  },
});

  useEffect(() => {
  if (projectIdFromQuery) {
    setForm((prev) => ({
      ...prev,
      projectId: projectIdFromQuery,
    }));
  }
}, [projectIdFromQuery]);
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">

        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h1 className="text-xl font-semibold text-gray-800">
            Create Task
          </h1>
          <p className="text-sm text-gray-500">
            Add a new task with full details
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-5"
        >

          {/* Title */}
          <div>
            <label className="text-sm text-gray-600">Title</label>
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-300 outline-none"
            />
          </div>

          {/* Project */}
          <div>
            <label className="text-sm text-gray-600">Project</label>
            <select
              name="projectId"
              value={form.projectId}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select Project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>


          {/* Assignee */}
          <div>
            <label className="text-sm text-gray-600">Assign To</label>
            <select
              name="assignedTo"
              value={form.assignedTo}
              onChange={handleChange}
              className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select User</option>
              {members.map((u:any) => (
                <option key={u.user.id} value={u.user.id}>
                  {u.user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status + Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-600">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={form.dueDate}
                onChange={handleChange}
                className="w-full mt-1 border border-gray-200 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-lg text-sm shadow"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}