"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MoreHorizontal,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Settings,
  BarChart3,
  Trash2,
  Layers,
  TrendingUp,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import SubmitTaskForm from "@/components/sections/SubmitTaskForm";
import UserDataTasDetails from "@/components/sections/UserDataTasDetails";
import { useCurrentUser } from "@/hooks/useFetchUser";
import TaskReviewForm from "@/components/sections/TaskReviewForm";

const TaskDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [activeTab, setActiveTab] = useState("overview"); // 'overview', 'history', 'discussion'

  const [task, setTask] = useState({
    id: "TSK-4829",
    title: "Brand Identity Guidelines - Phase 2",
    description:
      "Finalize the secondary color palette, typography scales, and social media templates. Ensure all assets are exported in SVG and PNG formats for the marketing team.",
    status: "Pending Review",
    priority: "High",
    risk: "Low",
    dueDate: "Oct 12, 2024",
    assignee: {
      name: "Sarah Jenkins",
      role: "Lead Designer",
      avatar: "SJ",
      email: "sarah.j@company.com",
    },
    project: "Rebrand 2024",
    estimatedHours: 20,
    loggedHours: 18.5,
    budget: "$2,400",
  });

  const [submissions, setSubmissions] = useState([
    {
      id: "3",
      date: "Oct 10, 2024 • 04:45 PM",
      note: "Final exports are ready. Adjusted the typography scale as requested. Please see the attached brand_v3_final.pdf.",
      files: ["brand_v3_final.pdf", "social_assets_v1.zip"],
      status: "Pending Review",
      feedback: "",
    },
    {
      id: "2",
      date: "Oct 09, 2024 • 11:15 AM",
      note: "Updated the blue shades to meet WCAG AA standards. Also added the typography scale.",
      files: ["brand_v2_draft.pdf"],
      status: "Changes Requested",
      feedback:
        "The typography scale for mobile needs one more pass. It looks too large.",
    },
    {
      id: "1",
      date: "Oct 08, 2024 • 02:30 PM",
      note: "Initial draft of the color palette.",
      files: ["brand_v1_draft.pdf"],
      status: "Changes Requested",
      feedback: "The blue is a bit too dark for web accessibility.",
    },
  ]);

  const [isCreator,setIsCreator]=useState(false)
  const [userData,setUserData]=useState()

  const [reviewFeedback, setReviewFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const getTaskById = async (id: string) => {
    const res = await api.get(`/task/${id}`);
    return res.data; // make sure backend returns project object
  };

  const { data: user } =
    useCurrentUser();

  const {
    data: taskData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });

  useEffect(()=>{
if(user?.id===taskData?.createdBy?.id){
    setIsCreator(true)
    setUserData(user)
  }else{
    setIsCreator(false)
    setUserData(taskData?.user)
  }
  },[user,taskData])

  

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffdf5] flex flex-col items-center justify-center space-y-4 font-sans">
        <div className="w-12 h-12 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-amber-900/40 uppercase tracking-widest italic">
          Loading Task...
        </p>
      </div>
    );
  }
  console.log(131, taskData);

  const getStatusBadge = (status: any) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Changes Requested":
        return "bg-amber-50 text-amber-700 border-amber-100";
      case "Pending Review":
        return "bg-blue-50 text-blue-700 border-blue-100";
      case "Completed":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      default:
        return "bg-slate-50 text-slate-600 border-slate-100";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 pb-12">
      {/* Dynamic Header */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-6">
          <button className="p-2.5 hover:bg-slate-100 rounded-xl transition-all border border-slate-100">
            <ArrowLeft size={18} className="text-slate-600" />
          </button>
          <div>
            <div className="flex items-center text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-0.5">
              <span>Management Portal</span>
              <ChevronRight size={12} className="mx-1" />
              <span>{taskData?.project?.name}</span>
            </div>
            <h1 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              {taskData?.task?.title}
              <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full font-mono">
                {task.id}
              </span>
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 text-sm font-bold text-slate-600 px-4 py-2 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all">
            <Settings size={16} />
            Configure
          </button>
          <button className="flex items-center gap-2 bg-slate-900 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-black shadow-lg shadow-slate-200 transition-all">
            <TrendingUp size={16} />
            View Report
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto mt-8 px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Content Area (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 gap-8 mb-4">
            {["overview", "history", "discussion"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold transition-all relative capitalize ${
                  activeTab === tab
                    ? "text-indigo-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "overview" && (
            <div className="space-y-6 animate-in fade-in duration-500">
              {/* Task Core Details */}
              <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-2">
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-lg border uppercase tracking-wider ${getStatusBadge(task.status)}`}
                    >
                      {taskData?.task?.status}
                    </span>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-500 uppercase tracking-wider">
                      Priority: {taskData?.task?.priority}
                    </span>
                    <span className="text-[10px] font-black px-2.5 py-1 rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600 uppercase tracking-wider">
                      Risk: {task.risk}
                    </span>
                  </div>
                  <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
                    <MoreHorizontal size={20} />
                  </button>
                </div>

                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  {taskData?.task?.description}
                </p>

                <div className="grid grid-cols-4 gap-6">
                  {[
                    {
                      label: "Due Date",
                      value: new Date(taskData?.task?.dueDate).toDateString(),
                      icon: Calendar,
                      color: "text-rose-500",
                    },
                    {
                      label: "Estimate",
                      value: task.estimatedHours + "h",
                      icon: Clock,
                      color: "text-blue-500",
                    },
                    {
                      label: "Logged",
                      value: task.loggedHours + "h",
                      icon: Layers,
                      color: "text-indigo-500",
                    },
                    // { label: 'Budget', value: task.budget, icon: BarChart3, color: 'text-emerald-500' },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <stat.icon size={12} className={stat.color} />
                        {stat.label}
                      </div>
                      <div className="text-sm font-bold text-slate-900">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
              {isCreator? <TaskReviewForm task={taskData?.task} setTask={setTask}/>:<SubmitTaskForm task={taskData?.task} />}
              
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
              {submissions.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs uppercase">
                        V{sub.id}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          Submission Point
                        </div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          {sub.date}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-black px-3 py-1 rounded-full border uppercase ${getStatusBadge(sub.status)}`}
                    >
                      {sub.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                    "{sub.note}"
                  </p>
                  {sub.feedback && (
                    <div className="flex gap-3 px-4 py-3 bg-indigo-50/50 rounded-xl border border-indigo-100">
                      <MessageSquare
                        size={16}
                        className="text-indigo-400 mt-0.5 shrink-0"
                      />
                      <div>
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-0.5">
                          Manager Feedback
                        </span>
                        <p className="text-sm text-slate-700">{sub.feedback}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === "discussion" && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 h-150 flex flex-col animate-in fade-in duration-500">
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    AN
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        Anuroop (You)
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Yesterday, 10:00 AM
                      </span>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-md">
                      Hey team, let's make sure the mobile typography scale is
                      prioritized in this phase.
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                    SJ
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">
                        Sarah Jenkins
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Yesterday, 11:20 AM
                      </span>
                    </div>
                    <div className="bg-indigo-50 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 max-w-md border border-indigo-100">
                      Acknowledged! I'm testing the contrast ratios on the
                      updated palette now.
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type a message to the team..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none pr-12 transition-all"
                  />
                  <button className="absolute right-3 top-2.5 p-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-md">
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">

          {userData&&<UserDataTasDetails user={userData} isCreator={isCreator}/>}
                    {/* Activity Mini-Feed */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Activity</h3>
            <div className="space-y-5">
              <div className="flex gap-3 relative">
                <div className="absolute left-1.75 top-4 -bottom-5 w-0.5 bg-slate-100" />
                <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm mt-1 z-10" />
                <div>
                  <p className="text-sm font-medium text-slate-800">Review approved</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3 relative">
                <div className="absolute left-1.75 top-4 -bottom-5 w-0.5 bg-slate-100" />
                <div className="absolute left-1.75 top-4 -bottom-5 w-0.5 bg-slate-100" />
                <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm mt-1 z-10" />
                <div>
                  <p className="text-sm font-medium text-slate-800">New submission</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm mt-1 z-10" />
                <div>
                  <p className="text-sm font-medium text-slate-800">Status changed</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">1 day ago</p>
                </div>
              </div>
            </div>
          </section>

          {/* Efficiency Analytics */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Resource Pulse
              </h3>
              <BarChart3 size={16} className="text-indigo-500" />
            </div>

            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-100"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="351.858"
                    strokeDashoffset={351.858 * (1 - 0.92)}
                    className="text-indigo-600 transition-all duration-1000"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900 tracking-tighter">
                    92%
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Used
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <TrendingUp size={14} className="text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">
                    Efficiency
                  </span>
                </div>
                <span className="text-xs font-black text-emerald-600">
                  High
                </span>
              </div>
              <p className="text-[10px] text-slate-500 text-center font-medium px-4">
                Assignee is tracking 8% below the critical budget threshold.
              </p>
            </div>
          </section>

          {/* Administrative Control Grid */}
          <section className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl shadow-slate-200 border border-slate-800">
            <div className="flex items-center gap-2 mb-6 text-slate-400">
              <ShieldCheck size={16} />
              <h3 className="text-xs font-black uppercase tracking-widest">
                Authority Panel
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                <Calendar
                  size={20}
                  className="mb-2 text-slate-500 group-hover:text-white transition-colors"
                />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Deadline
                </span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group">
                <Trash2
                  size={20}
                  className="mb-2 text-slate-500 group-hover:text-rose-400 transition-colors"
                />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Delete
                </span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 transition-all group col-span-2">
                <Settings
                  size={20}
                  className="mb-2 text-slate-500 group-hover:text-indigo-400 transition-colors"
                />
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  Advanced Configurations
                </span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TaskDetailsPage;

// Helper icons for Send
const Send = ({ size }: any) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);
