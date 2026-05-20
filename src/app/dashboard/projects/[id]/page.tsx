"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import AddMembersModal from "@/components/modals/AddMembersModal";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Calendar,
  ChevronRight,
  Settings,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { useCurrentUser } from "@/hooks/useFetchUser";

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [isModalOpen, setIsModalOpen] = useState(false);

const { data: user } =
  useCurrentUser();

console.log(444,user);

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
  

  
  if (isLoading) {
    return <p className="p-6 text-gray-500">Loading project...</p>;
  }

  if (isError) {
    return <p className="p-6 text-red-500">Failed to load project</p>;
  }

  if (!project) {
    return <p className="p-6 text-gray-400">Project not found</p>;
  }

  console.log(666,project);

  const handleAddMembers = async (userIds: string[]) => {
    await api.post(`/project/${id}/members`, {
      userIds,
    });

    // refetch project
    // QueryClient.invalidateQueries({ queryKey: ["project", id] });
  };

  const userData = users.filter((item: any) =>
    members.every((member: any) => member.user.id !== item.id),
  );

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
    <div className="  min-h-screen bg-[#fffdf5] font-sans text-slate-900 pb-20">
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
            <h1 className="text-lg font-bold text-slate-900">
              Portfolio Details
            </h1>
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
      <div className="w-full p-6 space-y-6">
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
                    Started {formatDate(project.project.createdAt)}
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
                  <div className="text-sm font-bold text-amber-600">
                    Minimum
                  </div>
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
                  <Link href={`/dashboard/tasks/${task.id}`} key={task.id}>
                  <div
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
                  </Link>
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
    </div>
  );
}

// "use client"
// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Calendar,
//   CheckCircle2,
//   Clock,
//   ChevronRight,
//   MoreHorizontal,
//   Plus,
//   Users,
//   Layers,
//   Building2,
//   AlertCircle,
//   TrendingUp,
//   Mail,
//   ExternalLink,
//   MessageSquare,
//   ShieldCheck,
//   UserPlus,
//   Settings,
//   User
// } from "lucide-react";

// /**
//  * MOCK IMPLEMENTATION
//  * Since external modules like '@/lib/axios' and '@tanstack/react-query' are context-specific,
//  * we provide local mocks to ensure the component remains functional and visually accurate
//  * in this environment.
//  */

// // Mock Link component with default parameters to prevent implicit 'any' type errors
// const Link = ({ href = "#", children, className = "" }) => (
//   <div
//     className={`${className} cursor-pointer`}
//     onClick={() => console.log(`Navigating to: ${href}`)}
//   >
//     {children}
//   </div>
// );

// // Mock AddMembersModal
// const AddMembersModal = ({ isOpen, onClose, users, onAdd }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
//       <div className="bg-white rounded-[2.5rem] w-full max-w-md p-8 shadow-2xl border border-amber-100">
//         <h2 className="text-xl font-bold text-slate-900 mb-2">Add Team Members</h2>
//         <p className="text-sm text-slate-500 mb-6">Select users to invite to this project workspace.</p>
//         <div className="space-y-3 mb-8 max-h-60 overflow-y-auto pr-2">
//           {users.map(user => (
//             <div key={user.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl hover:bg-amber-50 transition-colors group cursor-pointer">
//               <div className="flex items-center gap-3">
//                 <img src={user.image} className="w-10 h-10 rounded-xl" alt="" />
//                 <div>
//                   <div className="text-sm font-bold text-slate-800">{user.name}</div>
//                   <div className="text-[10px] text-slate-400 font-bold uppercase">{user.role || 'Member'}</div>
//                 </div>
//               </div>
//               <Plus size={18} className="text-slate-300 group-hover:text-amber-600" />
//             </div>
//           ))}
//         </div>
//         <div className="flex gap-3">
//           <button onClick={onClose} className="flex-1 py-3 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-2xl transition-all">Cancel</button>
//           <button onClick={onClose} className="flex-1 py-3 text-sm font-bold bg-amber-500 text-white rounded-2xl hover:bg-amber-600 shadow-lg shadow-amber-100 transition-all">Done</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function ProjectDetailsPage() {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [project, setProject] = useState(null);
//   const [members, setMembers] = useState([]);
//   const [users, setUsers] = useState([]);

//   // Mock Fetching Logic
//   useEffect(() => {
//     const initData = async () => {
//       setIsLoading(true);
//       await new Promise(resolve => setTimeout(resolve, 800));

//       const mockProject = {
//         id: "prj-101",
//         name: "Enterprise Rebrand Phase 2",
//         createdAt: "2024-01-15T10:00:00Z",
//         deadline: "2024-05-20",
//         company: { name: "DesignCo Global" },
//         tasks: [
//           { id: "t1", title: "Finalize Color Palette", status: "DONE", dueDate: "2024-03-10", assignedUser: { name: "Sarah J.", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" } },
//           { id: "t2", title: "Mobile UI Kit Audit", status: "IN_PROGRESS", dueDate: "2024-03-25", assignedUser: { name: "Michael C.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" } },
//           { id: "t3", title: "Client Presentation Deck", status: "PENDING", dueDate: "2024-04-05", assignedUser: { name: "Anya P.", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" } }
//         ]
//       };

//       const mockMembers = [
//         { id: "m1", user: { id: "1", name: "Sarah Jenkins", email: "sarah.j@company.com", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" } },
//         { id: "m2", user: { id: "2", name: "Michael Chen", email: "m.chen@techflow.io", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" } }
//       ];

//       const mockUsersList = [
//         { id: "3", name: "Anya Petrova", email: "anya@creative.net", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100" },
//         { id: "4", name: "David Miller", email: "david@m.com", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100" }
//       ];

//       setProject(mockProject);
//       setMembers(mockMembers);
//       setUsers(mockUsersList);
//       setIsLoading(false);
//     };
//     initData();
//   }, []);

//   if (isLoading || !project) {
//     return (
//       <div className="min-h-screen bg-[#fffdf5] flex flex-col items-center justify-center space-y-4 font-sans text-slate-900">
//         <div className="w-12 h-12 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin"></div>
//         <p className="text-sm font-bold text-amber-900/40 uppercase tracking-widest italic">Accessing Project Data...</p>
//       </div>
//     );
//   }

//   const formatDate = (date) => {
//     return new Intl.DateTimeFormat("en-GB", {
//       day: "2-digit",
//       month: "long",
//       year: "numeric",
//     }).format(new Date(date));
//   };

//   const doneTasks = project.tasks.filter((t) => t.status === "DONE").length;
//   const totalTasks = project.tasks.length || 1;
//   const progress = (doneTasks / totalTasks) * 100;

//   return (
//     <div className="min-h-screen bg-[#fffdf5] font-sans text-slate-900 pb-20">

//       {/* Dynamic Navigation Bar */}
//       <nav className="bg-white border-b border-amber-100 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
//         <div className="flex items-center gap-6">
//           <button className="p-2.5 hover:bg-amber-50 rounded-xl transition-all border border-slate-100">
//             <ArrowLeft size={18} className="text-slate-600" />
//           </button>
//           <div>
//             <div className="flex items-center text-[10px] text-slate-400 font-black uppercase tracking-widest mb-0.5">
//               <span>Workspace</span>
//               <ChevronRight size={12} className="mx-1" />
//               <span>Project Dashboard</span>
//             </div>
//             <h1 className="text-lg font-bold text-slate-900">Portfolio Details</h1>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 text-sm font-bold text-slate-600 px-4 py-2 hover:bg-amber-50 rounded-xl border border-slate-200 transition-all">
//             <Settings size={16} />
//             Configure
//           </button>
//           <button className="flex items-center gap-2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-black shadow-lg shadow-slate-200 transition-all">
//             <TrendingUp size={16} />
//             Global Report
//           </button>
//         </div>
//       </nav>

//       <main className="max-w-7xl mx-auto mt-8 px-8 space-y-8">

//         {/* Project Command Center (Header) */}
//         <section className="bg-white rounded-[2.5rem] border border-amber-100 shadow-sm p-10 overflow-hidden relative">
//           {/* Background Highlight */}
//           <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />

//           <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
//             <div className="lg:col-span-8 space-y-6">
//               <div>
//                 <div className="flex items-center gap-3 mb-4">
//                   <span className="text-xs font-black bg-amber-50 text-amber-600 px-3 py-1 rounded-full border border-amber-100 uppercase tracking-widest">
//                     Project Active
//                   </span>
//                   <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
//                     <Calendar size={14} className="text-rose-400" />
//                     Started {formatDate(project.createdAt)}
//                   </div>
//                 </div>
//                 <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">
//                   {project.name}
//                 </h1>
//                 <div className="mt-4 flex items-center gap-4 text-slate-500">
//                   <div className="flex items-center gap-2">
//                     <Building2 size={16} className="text-amber-500" />
//                     <span className="text-sm font-bold uppercase tracking-wider">{project.company?.name || "Global Enterprise"}</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-50">
//                 <div className="space-y-1">
//                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Health</div>
//                   <div className="text-sm font-bold text-emerald-600 flex items-center gap-1.5">
//                     <ShieldCheck size={14} /> Stable
//                   </div>
//                 </div>
//                 <div className="space-y-1">
//                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Team Size</div>
//                   <div className="text-sm font-bold text-slate-900">{members.length} Members</div>
//                 </div>
//                 <div className="space-y-1">
//                   <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Level</div>
//                   <div className="text-sm font-bold text-amber-600">Minimum</div>
//                 </div>
//               </div>
//             </div>

//             <div className="lg:col-span-4 bg-slate-50/50 rounded-[2rem] p-8 border border-slate-100 flex flex-col justify-center items-center text-center">
//               <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Overall Completion</div>

//               <div className="relative w-32 h-32 flex items-center justify-center mb-4">
//                 <svg className="w-full h-full transform -rotate-90">
//                   <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="10" className="text-slate-100" />
//                   <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="10" strokeDasharray="364.4" strokeDashoffset={364.4 * (1 - progress / 100)} className="text-amber-500 transition-all duration-1000" strokeLinecap="round" />
//                 </svg>
//                 <div className="absolute flex flex-col items-center">
//                   <span className="text-2xl font-black text-slate-900 tracking-tighter">{Math.round(progress)}%</span>
//                 </div>
//               </div>

//               <div className="text-xs font-bold text-slate-600">
//                 <span className="text-amber-600">{doneTasks}</span> / {project.tasks.length} Phases Completed
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Action Grid */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//           {/* TASKS HUB (2/3 Column) */}
//           <div className="lg:col-span-2 space-y-6">
//             <div className="bg-white border border-amber-100 rounded-[2.5rem] shadow-sm p-8">
//               <div className="flex justify-between items-center mb-8">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2.5 bg-amber-50 rounded-xl text-amber-600">
//                     <Layers size={20} />
//                   </div>
//                   <h2 className="text-xl font-bold text-slate-900">Task Hub</h2>
//                 </div>
//                 <Link
//                   href={`/dashboard/tasks/create?projectId=${project.id}`}
//                   className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-black px-5 py-2.5 rounded-xl transition shadow-lg shadow-amber-100 flex items-center gap-2 uppercase tracking-widest"
//                 >
//                   <Plus size={16} /> Create Task
//                 </Link>
//               </div>

//               <div className="space-y-3">
//                 {project.tasks.map((task) => (
//                   <div
//                     key={task.id}
//                     className="flex justify-between items-center p-5 rounded-[1.5rem] border border-slate-50 hover:border-amber-100 hover:bg-amber-50/20 transition-all group"
//                   >
//                     <div className="flex flex-col gap-1.5 max-w-[60%]">
//                       <span className="text-sm font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
//                         {task.title}
//                       </span>
//                       <div className="flex items-center gap-3">
//                         {task.dueDate && (
//                           <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//                             <Clock size={12} className="text-rose-400" />
//                             Exp: {new Date(task.dueDate).toLocaleDateString()}
//                           </div>
//                         )}
//                         <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase">
//                           <AlertCircle size={12} />
//                           Task #{task.id.slice(-4)}
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-6">
//                       {task.assignedUser && (
//                         <div className="flex items-center gap-2.5">
//                           <img
//                             src={task.assignedUser.image}
//                             alt=""
//                             className="w-8 h-8 rounded-lg object-cover ring-2 ring-white shadow-sm"
//                           />
//                           <span className="text-[11px] font-bold text-slate-600 hidden sm:block">
//                             {task.assignedUser.name}
//                           </span>
//                         </div>
//                       )}

//                       <span
//                         className={`text-[9px] font-black px-3 py-1 rounded-full border uppercase tracking-widest min-w-[90px] text-center ${
//                           task.status === "DONE" || task.status === "COMPLETED"
//                             ? "bg-emerald-50 text-emerald-600 border-emerald-100"
//                             : task.status === "IN_PROGRESS"
//                               ? "bg-amber-50 text-amber-600 border-amber-100"
//                               : "bg-slate-50 text-slate-400 border-slate-200"
//                         }`}
//                       >
//                         {task.status.replace("_", " ")}
//                       </span>
//                     </div>
//                   </div>
//                 ))}

//                 {project.tasks.length === 0 && (
//                   <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-slate-100 rounded-[2rem]">
//                     <div className="bg-slate-50 p-4 rounded-full mb-4">
//                       <Layers size={32} className="text-slate-300" />
//                     </div>
//                     <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No Active Tasks</p>
//                     <button className="mt-4 text-amber-500 text-xs font-bold hover:underline underline-offset-4">Initialize Workspace</button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* SQUAD / MEMBERS (1/3 Column) */}
//           <div className="space-y-6">
//             <div className="bg-white border border-amber-100 rounded-[2.5rem] shadow-sm p-8">
//               <div className="flex justify-between items-center mb-8">
//                 <div className="flex items-center gap-3">
//                   <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
//                     <Users size={20} />
//                   </div>
//                   <h2 className="text-xl font-bold text-slate-900">Squad</h2>
//                 </div>
//                 <button
//                   onClick={() => setIsModalOpen(true)}
//                   className="p-2 bg-slate-50 text-slate-400 hover:bg-amber-50 hover:text-amber-600 rounded-xl transition-all"
//                 >
//                   <UserPlus size={18} />
//                 </button>
//               </div>

//               <div className="space-y-4">
//                 {members.map((member) => (
//                   <Link
//                     href={`/dashboard/employees/${member.user.id}`}
//                     key={member.id}
//                     className="block group"
//                   >
//                     <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
//                       <div className="relative">
//                         <img
//                           src={member.user.image}
//                           alt=""
//                           className="w-11 h-11 rounded-xl object-cover shadow-md"
//                         />
//                         <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white" />
//                       </div>

//                       <div className="flex-1 min-w-0">
//                         <div className="text-sm font-bold text-slate-900 group-hover:text-amber-600 transition-colors truncate">
//                           {member.user.name}
//                         </div>
//                         <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">
//                           {member.user.email}
//                         </div>
//                       </div>

//                       <ChevronRight size={14} className="text-slate-200 group-hover:text-amber-300 transition-colors" />
//                     </div>
//                   </Link>
//                 ))}
//               </div>
//             </div>

//             {/* Project Support Card */}
//             <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200 relative overflow-hidden group">
//               <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
//                 <ShieldCheck size={100} />
//               </div>
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="bg-white/10 p-2 rounded-lg">
//                   <MessageSquare size={16} />
//                 </div>
//                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Collaboration</span>
//               </div>
//               <h3 className="text-lg font-bold mb-2">Need Workspace Support?</h3>
//               <p className="text-xs text-slate-400 leading-relaxed mb-6">
//                 Connect with the company admin or project leads for access overrides and high-level strategy notes.
//               </p>
//               <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-black uppercase tracking-widest transition-all backdrop-blur-sm border border-white/5">
//                 Contact Admin
//               </button>
//             </div>
//           </div>
//         </div>

//         <AddMembersModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           users={users}
//           onAdd={async () => {}}
//         />
//       </main>
//     </div>
//   );
// }
