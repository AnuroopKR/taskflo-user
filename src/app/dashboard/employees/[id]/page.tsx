"use client";

import { useParams } from "next/navigation";
import { dummyUsers } from "@/data/dummyData";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   image: string;
//   company: {
//     id: string;
//     name: string;
//   };
//   projects: {
//     id: number;
//     name: string;
//   }[];
//   tasks: {
//     id: number;
//     title: string;
//     status: string;
//   }[];
// }

export default function UserDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const getUser=async ()=>{
    const employees=await api.get(`/user/get-user/${id}`)
    return employees.data
  }


    const { data, isLoading, isError } = useQuery({
    queryKey: ["user",id],
    queryFn: getUser,
    enabled:!!id
  });

  // ✅ Loading state
  if (isLoading) {
    return <div className="p-6">Loading users...</div>;
  }

  // ❌ Error state
  if (isError) {
    return <div className="p-6 text-red-500">Failed to load users</div>;
  }

  const user = data || null;
  console.log(333,user) 


  if (!user) {
    return (
      <p className="p-6 text-gray-400">
        User not found
      </p>
    );
  }

  const doneTasks = user.tasks.filter(
    (t:any) => t.status === "DONE"
  ).length;

  const progress =
    user.tasks.length > 0
      ? (doneTasks / user.tasks.length) * 100
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      {/* 🔥 Header Card */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm flex justify-between items-center">
        
        <div className="flex items-center gap-4">
          <img
            src={user.image}
            alt={user.name}
            className="w-16 h-16 rounded-full"
          />

          <div>
            <h1 className="text-xl font-semibold text-gray-800">
              {user.name}
            </h1>
            <p className="text-sm text-gray-500">
              {user.email}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Company: {user.company.name}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Task Progress
          </p>
          <p className="text-lg font-semibold text-yellow-500">
            {doneTasks}/{user.tasks.length}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
        <div className="w-full bg-gray-100 h-2 rounded-full">
          <div
            className="bg-yellow-400 h-2 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-6">

        {/* 📁 Projects */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Projects
          </h2>

          <div className="space-y-3">
            {user.projects.map((project:any) => (
              <div
                key={project.id}
                className="p-3 bg-gray-50 rounded-xl text-sm text-gray-700"
              >
                {project.name}
              </div>
            ))}
          </div>
        </div>

        {/* 📋 Tasks */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Tasks
          </h2>

          <div className="space-y-3">
            {user.tasks.map((task:any) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
              >
                <span className="text-sm text-gray-700">
                  {task.title}
                </span>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.status === "DONE"
                      ? "bg-green-100 text-green-600"
                      : task.status === "IN_PROGRESS"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}