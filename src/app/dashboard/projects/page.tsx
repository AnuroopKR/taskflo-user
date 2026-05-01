"use client";

import api from "@/lib/axios";
import { Project } from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import { Briefcase, ChevronRight, Plus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";



export default function ProjectsPage() {

    const [search, setSearch] = useState("");
  
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

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));
  }

  return (
    <div className=" min-h-screen bg-[#fffdf5] font-sans text-slate-900 pb-20">

                    <nav className="bg-white border-b border-amber-100 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
            <Briefcase size={20} />
          </div>
          <div>
            <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">
              <span>Main Workspace</span>
              <ChevronRight size={12} className="mx-1" />
              <span>Portfolio</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900">Projects</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative group hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-50 border border-slate-100 rounded-2xl py-2 pl-10 pr-4 text-sm w-64 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 outline-none transition-all shadow-inner"
            />
          </div>
          <button className="flex items-center gap-2 bg-amber-500 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-amber-600 shadow-lg shadow-amber-100 transition-all active:scale-95">
            <Plus size={18} />
            <span>New</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">

        {/* Project Grid */}
        <div className="grid grid-cols-3 gap-6">
          {projects.map((project) => {
            const doneTasks = project.tasks.filter(
              (t) => t.status === "SUBMITTED"
            ).length;

            const progress =
              (doneTasks / project.tasks.length) * 100;

            return (
              <Link
                key={project.id}
                href={`/dashboard/projects/${project.id}`}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
              >
                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-800">
                  {project.name}
                </h3>

                {/* Company */}
                <p className="text-sm text-gray-500 mt-1">
                  {project.company.name}
                </p>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Progress</span>
                    <span>
                      {doneTasks}/{project.tasks.length}
                    </span>
                  </div>

                  <div className="w-full bg-gray-100 h-2 rounded-full mt-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Members */}
                {/* <div className="flex mt-4 -space-x-2">
                  {project.members.slice(0, 4).map((m) => (
                    <img
                      key={m.id}
                      src={m.user.image}
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div> */}

                {/* Footer */}
                <p className="text-xs text-gray-400 mt-4">
                  {new Date(project.createdAt).toDateString()}
                </p>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}

