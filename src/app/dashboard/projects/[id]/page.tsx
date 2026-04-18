"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import AddMembersModal from "@/components/modals/AddMembersModal";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Building2, Calendar, ChevronRight, Settings, ShieldCheck, TrendingUp } from "lucide-react";

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const getProjectById = async (id: string) => {
    const res = await api.get(`/project/${id}`);
    return res.data; // make sure backend returns project object
  };

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
    enabled: !!id,
  });

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/company");
      return res.data.userData;
    },
  });

  const { data: members = [] } = useQuery({
    queryKey: ["members", id],
    queryFn: async () => {
      const res = await api.get(`/project/${id}/members`);
      return res.data.data;
    },
    enabled: !!id,
  });

  console.log(members, users);
  if (isLoading) {
    return <p className="p-6 text-gray-500">Loading project...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load project</p>;
  }

  if (!project) {
    return <p className="p-6 text-gray-400">Project not found</p>;
  }

  const handleAddMembers = async (userIds: string[]) => {
    await api.post(`/project/${id}/members`, {
      userIds,
    });

    // refetch project
    // QueryClient.invalidateQueries({ queryKey: ["project", id] });
  };

  const userData = users.filter((item: any) =>
    members.some((member: any) => member.user.id !== item.id),
  );

  console.log(111, userData);

  function formatDate(date: string) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  }

  const doneTasks = project.tasks.filter(
    (t: any) => t.status === "DONE",
  ).length;

  const totalTasks = project.tasks.length || 1;
  const progress = (doneTasks / totalTasks) * 100;

  return (
    <div className="w-full p-6 space-y-6">
            {/* Dynamic Navigation Bar */}
      <nav className="bg-white border-b border-amber-100 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-6">
          <button className="p-2.5 hover:bg-amber-50 rounded-xl transition-all border border-slate-100">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div>
            <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">
              <span>Workspace</span>
              <ChevronRight size={12} className="mx-1" />
              <span>Project Dashboard</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900">Portfolio Details</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm font-bold text-slate-600 px-4 py-2 hover:bg-amber-50 rounded-xl border border-slate-200 transition-all">
            <Settings size={16} />
            Configure
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-black shadow-lg shadow-slate-200 transition-all">
            <TrendingUp size={16} />
            Global Report
          </button>
        </div>
      </nav>
      {/* HEADER */}
      <section className="bg-white rounded-[2.5rem] border border-amber-100 shadow-sm p-10 overflow-hidden relative">
        {/* Background Highlight */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />

        <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
          <div className="lg:col-span-8 space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-black bg-amber-50 text-amber-600 px-3 py-1 rounded-full border border-amber-100 uppercase tracking-widest">
                  Project Active
                </span>
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                  <Calendar size={14} className="text-rose-400" />
                  Started {formatDate(project.createdAt)}
                </div>
              </div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
                {project.name}
              </h1>
              <div className="mt-4 flex items-center gap-4 text-slate-500">
                <div className="flex items-center gap-2">
                  <Building2 size={16} className="text-amber-500" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    {project.company?.name || "Global Enterprise"}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-50">
              <div className="space-y-1">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Health
                </div>
                <div className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Stable
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Team Size
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {members.length} Members
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Risk Level
                </div>
                <div className="text-sm font-bold text-amber-600">Minimum</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 flex flex-col justify-center items-center text-center">
            <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
              Overall Completion
            </div>

            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="10"
                  className="text-slate-100"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="10"
                  strokeDasharray="364.4"
                  strokeDashoffset={364.4 * (1 - progress / 100)}
                  className="text-amber-500 transition-all duration-1000"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 tracking-tighter">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>

            <div className="text-xs font-bold text-slate-600">
              <span className="text-amber-600">{doneTasks}</span> /{" "}
              {project.tasks.length} Phases Completed
            </div>
          </div>
        </div>
      </section>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TASKS */}
        {/* <div className="bg-white border border-gray-100 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Tasks</h2>
            <Link href={`/dashboard/tasks/create?projectId=${id}`} className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg transition">Create Task</Link>
          </div>

          <div className="space-y-3">
            {project.tasks.map((task: any) => (
              <div
                key={task.id}
                className="flex justify-between items-center p-3 rounded-xl bg-gray-50"
              >
                <span className="text-sm text-gray-700">{task.title}</span>

                <span
                  className={`text-xs px-2 py-1 rounded ${
                    task.status === "COMPLETED"
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
        </div> */}

        {/* TASKS */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>

            <Link
              href={`/dashboard/tasks/create?projectId=${id}`}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg transition shadow-sm"
            >
              + Create Task
            </Link>
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {project.tasks.map((task: any) => {
              const statusStyles =
                task.status === "COMPLETED"
                  ? "bg-green-100 text-green-600"
                  : task.status === "IN_PROGRESS"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-gray-200 text-gray-600";

              const assignee = task.assignedUser; // 👈 adjust based on your API

              return (
                <div
                  key={task.id}
                  className="flex justify-between items-center p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition group"
                >
                  {/* LEFT SIDE */}
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-medium text-gray-800">
                      {task.title}
                    </span>

                    {/* Due Date */}
                    {task.dueDate && (
                      <span className="text-xs text-gray-500">
                        📅 Due: {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center gap-4">
                    {/* Assignee */}
                    {assignee && (
                      <div className="flex items-center gap-2">
                        {assignee.image ? (
                          <img
                            src={assignee.image}
                            alt={assignee.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs font-semibold">
                            {assignee.name.charAt(0).toUpperCase()}
                          </div>
                        )}

                        <span className="text-xs text-gray-600 hidden sm:block">
                          {assignee.name}
                        </span>
                      </div>
                    )}

                    {/* Status */}
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${statusStyles}`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {project.tasks.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">
              No tasks yet. Create your first task 🚀
            </div>
          )}
        </div>

        {/* MEMBERS */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-lg font-semibold text-gray-800">
              Team Members
            </h2>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              + Add Member
            </button>
          </div>

          {/* Members List */}
          <div className="space-y-3">
            {members.map((member: any) => {
              const name = member.user.name;
              const image = member.user.image;

              return (
                <Link
                  href={`/dashboard/employees/${member.user.id}`}
                  key={member.id}
                >
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition">
                    {/* Avatar */}
                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* User Info */}
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {member.user.email}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <AddMembersModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          users={userData}
          onAdd={handleAddMembers}
        />
      </div>
    </div>
  );
}


