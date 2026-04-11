"use client";

import { useState } from "react";
import { dummyUsers } from "@/data/dummyData";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import Link from "next/link";

export default function UsersPage() {
  const [search, setSearch] = useState("");

  const getUsers=async ()=>{
    const employees=await api.get("/company")
    return employees.data.userData
  }


    const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // ✅ Loading state
  if (isLoading) {
    return <div className="p-6">Loading users...</div>;
  }

  // ❌ Error state
  if (isError) {
    return <div className="p-6 text-red-500">Failed to load users</div>;
  }

  const users = data || [];
  console.log(333,users) 


  const filteredUsers = users.filter((user:any) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Users
          </h1>
          <p className="text-sm text-gray-500">
            Manage team members
          </p>
        </div>

        <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl text-sm shadow">
          + Add User
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-300"
        />
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user:any) => {
          const doneTasks = user.tasks.filter(
            (t:any) => t.status === "DONE"
          ).length;

          const progress =
            user.tasks.length > 0
              ? (doneTasks / user.tasks.length) * 100
              : 0;

          return (
            <Link href={`/dashboard/employees/${user.id}`} key={user.id}><div
              
              className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
            >
              {/* User Info */}
              <div className="flex items-center gap-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />

                <div>
                  <h3 className="text-sm font-semibold text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Company */}
              <p className="text-xs text-gray-400 mt-3">
                Company: {user.company.name}
              </p>

              {/* Stats */}
              <div className="flex justify-between text-xs text-gray-500 mt-4">
                <span>{user.projects.length} Projects</span>
                <span>{user.tasks.length} Tasks</span>
              </div>

              {/* Progress */}
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Completed</span>
                  <span>
                    {doneTasks}/{user.tasks.length}
                  </span>
                </div>

                <div className="w-full bg-gray-100 h-2 rounded-full mt-1">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Recent Task */}
              <div className="mt-4">
                <p className="text-xs text-gray-400 mb-1">
                  Recent Task
                </p>

                {user.tasks[0] ? (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">
                      {user.tasks[0].title}
                    </span>

                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        user.tasks[0].status === "DONE"
                          ? "bg-green-100 text-green-600"
                          : user.tasks[0].status === "IN_PROGRESS"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {user.tasks[0].status}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs text-gray-400">
                    No tasks
                  </p>
                )}
              </div>
            </div>
            </Link>
          );
        })}
      </div>
      

      {/* Empty State */}
      {filteredUsers.length === 0 && (
        <div className="text-center text-gray-400 mt-10">
          No users found
        </div>
      )}
    </div>
  );
}