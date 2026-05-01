"use client";
// import React, { useState } from 'react';
// import {
//   ArrowLeft,
//   Calendar,
//   Clock,
//   FileText,
//   Paperclip,
//   Send,
//   CheckCircle2,
//   AlertCircle,
//   MoreHorizontal,
//   User,
//   MessageSquare,
//   History,
//   ExternalLink,
//   ChevronRight,
//   UploadCloud,
//   X
// } from 'lucide-react';

// const App = () => {
//   const [task, setTask] = useState({
//     id: 'TSK-4829',
//     title: 'Brand Identity Guidelines - Phase 2',
//     description: 'Finalize the secondary color palette, typography scales, and social media templates. Ensure all assets are exported in SVG and PNG formats for the marketing team.',
//     status: 'In Progress',
//     priority: 'High',
//     dueDate: 'Oct 12, 2024',
//     assignee: { name: 'Sarah Jenkins', role: 'Lead Designer', avatar: 'SJ' },
//     project: 'Rebrand 2024'
//   });

//   const [submissions, setSubmissions] = useState([
//     {
//       id: '1', // Converted to string for consistency
//       date: 'Oct 08, 2024 • 02:30 PM',
//       note: 'Initial draft of the color palette. I used the cool-tone variations we discussed in the last meeting.',
//       files: ['brand_v1_draft.pdf'],
//       status: 'Changes Requested',
//       feedback: 'The blue is a bit too dark for web accessibility. Please check the contrast ratios.'
//     },
//     {
//       id: '2', // Converted to string for consistency
//       date: 'Oct 09, 2024 • 11:15 AM',
//       note: 'Updated the blue shades to meet WCAG AA standards. Also added the typography scale.',
//       files: ['brand_v2_final.pdf', 'assets.zip'],
//       status: 'Approved',
//       feedback: 'Excellent work! These look perfect.'
//     }
//   ]);

//   const [formNote, setFormNote] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleSubmit = (e:any) => {
//     e.preventDefault();
//     if (!formNote.trim()) return;

//     setIsSubmitting(true);
//     // Simulate API delay
//     setTimeout(() => {
//       const newSubmission = {
//         id: String(Date.now()), // Converted to string to match initial state
//         date: new Date().toLocaleString(),
//         note: formNote,
//         files: ['new_submission_file.pdf'],
//         status: 'Pending Review',
//         feedback: ''
//       };
//       setSubmissions([newSubmission, ...submissions]);
//       setFormNote('');
//       setIsSubmitting(false);
//     }, 800);
//   };

//   const getStatusBadge = (status:any) => {
//     switch (status) {
//       case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
//       case 'Changes Requested': return 'bg-amber-50 text-amber-700 border-amber-100';
//       case 'Pending Review': return 'bg-blue-50 text-blue-700 border-blue-100';
//       default: return 'bg-slate-50 text-slate-600 border-slate-100';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
//       {/* Top Header Navigation */}
//       <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
//         <div className="flex items-center gap-4">
//           <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
//             <ArrowLeft size={20} className="text-slate-600" />
//           </button>
//           <div className="flex items-center text-sm text-slate-500">
//             <span>Projects</span>
//             <ChevronRight size={14} className="mx-1" />
//             <span className="font-medium text-slate-900">{task.project}</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="text-sm font-semibold text-slate-600 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors">
//             Edit Task
//           </button>
//           <button className="bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-indigo-700 shadow-sm shadow-indigo-100 transition-all">
//             Mark as Done
//           </button>
//         </div>
//       </nav>

//       <main className="max-w-6xl mx-auto mt-8 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* Left Column: Task Details & History */}
//         <div className="lg:col-span-2 space-y-8">

//           {/* Main Task Card */}
//           <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
//             <div className="flex items-start justify-between mb-6">
//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded tracking-wide uppercase">
//                     {task.id}
//                   </span>
//                   <span className={`text-xs font-bold px-2 py-1 rounded border uppercase ${task.priority === 'High' ? 'bg-orange-50 text-orange-700 border-orange-100' : ''}`}>
//                     {task.priority} Priority
//                   </span>
//                 </div>
//                 <h1 className="text-3xl font-bold text-slate-900">{task.title}</h1>
//               </div>
//               <button className="p-2 text-slate-400 hover:text-slate-600">
//                 <MoreHorizontal size={24} />
//               </button>
//             </div>

//             <div className="prose prose-slate max-w-none">
//               <p className="text-slate-600 leading-relaxed text-lg">
//                 {task.description}
//               </p>
//             </div>

//             <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-6">
//               <div>
//                 <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
//                 <div className="flex items-center gap-2 font-semibold text-slate-700">
//                   <Clock size={16} className="text-blue-500" />
//                   {task.status}
//                 </div>
//               </div>
//               <div>
//                 <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Due Date</span>
//                 <div className="flex items-center gap-2 font-semibold text-slate-700">
//                   <Calendar size={16} className="text-rose-500" />
//                   {task.dueDate}
//                 </div>
//               </div>
//               <div>
//                 <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Project</span>
//                 <div className="flex items-center gap-2 font-semibold text-slate-700">
//                   <FileText size={16} className="text-indigo-500" />
//                   {task.project}
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Submission Form */}
//           <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//             <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-4">
//               <h2 className="font-bold text-slate-800 flex items-center gap-2">
//                 <UploadCloud size={18} className="text-indigo-600" />
//                 Submit Your Work
//               </h2>
//             </div>
//             <form onSubmit={handleSubmit} className="p-8">
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">Submission Notes</label>
//                 <textarea
//                   rows={4}
//                   value={formNote}
//                   onChange={(e) => setFormNote(e.target.value)}
//                   placeholder="Explain what has been completed or any specific details for the reviewer..."
//                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
//                 />
//               </div>

//               <div className="mb-8">
//                 <label className="block text-sm font-semibold text-slate-700 mb-2">Attachments</label>
//                 <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50 transition-colors cursor-pointer group">
//                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
//                     <Paperclip className="text-slate-400" size={20} />
//                   </div>
//                   <p className="text-sm font-medium text-slate-600">Click to upload or drag and drop</p>
//                   <p className="text-xs text-slate-400 mt-1">Maximum file size: 50MB</p>
//                 </div>
//               </div>

//               <div className="flex justify-end">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting || !formNote.trim()}
//                   className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
//                     isSubmitting || !formNote.trim()
//                     ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
//                     : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100'
//                   }`}
//                 >
//                   <Send size={16} />
//                   {isSubmitting ? 'Submitting...' : 'Submit for Review'}
//                 </button>
//               </div>
//             </form>
//           </section>

//           {/* Submission History */}
//           <section className="space-y-4">
//             <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2 px-2">
//               <History size={18} className="text-slate-400" />
//               Submission History
//             </h2>

//             <div className="space-y-4">
//               {submissions.map((sub) => (
//                 <div key={sub.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//                   <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50 bg-slate-50/30">
//                     <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{sub.date}</span>
//                     <span className={`text-[10px] font-bold px-2 py-1 rounded-full border uppercase tracking-wider ${getStatusBadge(sub.status)}`}>
//                       {sub.status}
//                     </span>
//                   </div>
//                   <div className="p-6">
//                     <p className="text-sm text-slate-700 mb-4 italic leading-relaxed">"{sub.note}"</p>

//                     <div className="flex flex-wrap gap-2 mb-4">
//                       {sub.files.map(file => (
//                         <div key={file} className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer group">
//                           <FileText size={14} className="text-slate-400 group-hover:text-slate-600" />
//                           {file}
//                           <ExternalLink size={12} className="ml-1 opacity-50" />
//                         </div>
//                       ))}
//                     </div>

//                     {sub.feedback && (
//                       <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
//                         <MessageSquare size={16} className="text-slate-400 mt-0.5 shrink-0" />
//                         <div>
//                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Feedback from Reviewer</p>
//                           <p className="text-sm text-slate-600">{sub.feedback}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* Right Column: Sidebar Info */}
//         <div className="space-y-6">
//           {/* Assignee Card */}
//           <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Assignee</h3>
//             <div className="flex items-center gap-4">
//               <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-inner">
//                 {task.assignee.avatar}
//               </div>
//               <div>
//                 <h4 className="font-bold text-slate-900">{task.assignee.name}</h4>
//                 <p className="text-sm text-slate-500">{task.assignee.role}</p>
//               </div>
//             </div>
//             <button className="w-full mt-6 py-2 border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
//               View Profile
//             </button>
//           </section>

//           {/* Activity Mini-Feed */}
//           <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Activity</h3>
//             <div className="space-y-5">
//               <div className="flex gap-3 relative">
//                 <div className="absolute left-[7px] top-4 bottom-[-20px] w-[2px] bg-slate-100" />
//                 <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm mt-1 z-10" />
//                 <div>
//                   <p className="text-sm font-medium text-slate-800">Review approved</p>
//                   <p className="text-[10px] text-slate-400 uppercase font-bold">2 hours ago</p>
//                 </div>
//               </div>
//               <div className="flex gap-3 relative">
//                 <div className="absolute left-[7px] top-4 bottom-[-20px] w-[2px] bg-slate-100" />
//                 <div className="absolute left-[7px] top-4 bottom-[-20px] w-[2px] bg-slate-100" />
//                 <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm mt-1 z-10" />
//                 <div>
//                   <p className="text-sm font-medium text-slate-800">New submission</p>
//                   <p className="text-[10px] text-slate-400 uppercase font-bold">5 hours ago</p>
//                 </div>
//               </div>
//               <div className="flex gap-3">
//                 <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm mt-1 z-10" />
//                 <div>
//                   <p className="text-sm font-medium text-slate-800">Status changed</p>
//                   <p className="text-[10px] text-slate-400 uppercase font-bold">1 day ago</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Guidelines/Resources */}
//           <section className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-100">
//             <div className="flex items-center gap-2 mb-4">
//               <AlertCircle size={20} />
//               <h3 className="font-bold">Project Guide</h3>
//             </div>
//             <p className="text-indigo-100 text-sm leading-relaxed mb-6">
//               Review the Brand Identity documentation before submitting the final assets to avoid feedback loops.
//             </p>
//             <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-bold transition-colors backdrop-blur-sm">
//               View Guidelines
//             </button>
//           </section>
//         </div>

//       </main>
//     </div>
//   );
// };

// export default App;

// *************************************************************************************************
// *********************************************code 2***********************************************
// ****************************************************************************************************

// import React, { useState } from 'react';
// import {
//   ArrowLeft,
//   Calendar,
//   Clock,
//   FileText,
//   CheckCircle2,
//   AlertCircle,
//   MoreHorizontal,
//   User,
//   MessageSquare,
//   History,
//   ExternalLink,
//   ChevronRight,
//   ShieldCheck,
//   RotateCcw,
//   UserPlus,
//   Settings,
//   BarChart3,
//   Trash2
// } from 'lucide-react';

// const App = () => {
//   const [task, setTask] = useState({
//     id: 'TSK-4829',
//     title: 'Brand Identity Guidelines - Phase 2',
//     description: 'Finalize the secondary color palette, typography scales, and social media templates. Ensure all assets are exported in SVG and PNG formats for the marketing team.',
//     status: 'Pending Review',
//     priority: 'High',
//     dueDate: 'Oct 12, 2024',
//     assignee: { name: 'Sarah Jenkins', role: 'Lead Designer', avatar: 'SJ' },
//     project: 'Rebrand 2024',
//     estimatedHours: 20,
//     loggedHours: 18.5
//   });

//   const [submissions, setSubmissions] = useState([
//     {
//       id: '3',
//       date: 'Oct 10, 2024 • 04:45 PM',
//       note: 'Final exports are ready. Adjusted the typography scale as requested. Please see the attached brand_v3_final.pdf.',
//       files: ['brand_v3_final.pdf', 'social_assets_v1.zip'],
//       status: 'Pending Review',
//       feedback: ''
//     },
//     {
//       id: '2',
//       date: 'Oct 09, 2024 • 11:15 AM',
//       note: 'Updated the blue shades to meet WCAG AA standards. Also added the typography scale.',
//       files: ['brand_v2_draft.pdf'],
//       status: 'Changes Requested',
//       feedback: 'The typography scale for mobile needs one more pass. It looks too large.'
//     },
//     {
//       id: '1',
//       date: 'Oct 08, 2024 • 02:30 PM',
//       note: 'Initial draft of the color palette.',
//       files: ['brand_v1_draft.pdf'],
//       status: 'Changes Requested',
//       feedback: 'The blue is a bit too dark for web accessibility.'
//     }
//   ]);

//   const [reviewFeedback, setReviewFeedback] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);

//   // Handle Manager Review Actions
//   const handleReview = (status:any) => {
//     setIsProcessing(true);
//     setTimeout(() => {
//       const updatedSubmissions = [...submissions];
//       updatedSubmissions[0] = {
//         ...updatedSubmissions[0],
//         status: status,
//         feedback: reviewFeedback
//       };
//       setSubmissions(updatedSubmissions);
//       setTask({ ...task, status: status === 'Approved' ? 'Completed' : 'In Progress' });
//       setReviewFeedback('');
//       setIsProcessing(false);
//     }, 800);
//   };

//   const getStatusBadge = (status:any) => {
//     switch (status) {
//       case 'Approved': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
//       case 'Changes Requested': return 'bg-amber-50 text-amber-700 border-amber-100';
//       case 'Pending Review': return 'bg-blue-50 text-blue-700 border-blue-100';
//       case 'Completed': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
//       default: return 'bg-slate-50 text-slate-600 border-slate-100';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
//       {/* Manager Header */}
//       <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10">
//         <div className="flex items-center gap-4">
//           <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
//             <ArrowLeft size={20} className="text-slate-600" />
//           </button>
//           <div className="flex items-center text-sm text-slate-500">
//             <span>Management</span>
//             <ChevronRight size={14} className="mx-1" />
//             <span className="font-medium text-slate-900">Task Oversight</span>
//           </div>
//         </div>
//         <div className="flex items-center gap-3">
//           <button className="text-sm font-semibold text-slate-600 px-4 py-2 hover:bg-slate-100 rounded-lg transition-colors border border-slate-200">
//             Edit Details
//           </button>
//           <button className="text-sm font-semibold text-rose-600 px-4 py-2 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-2">
//             <Trash2 size={16} />
//             Delete Task
//           </button>
//         </div>
//       </nav>

//       <main className="max-w-6xl mx-auto mt-8 px-6 grid grid-cols-1 lg:grid-cols-3 gap-8">

//         {/* Left Column: Task & Review */}
//         <div className="lg:col-span-2 space-y-8">

//           {/* Manager Summary Card */}
//           <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
//             <div className="flex items-start justify-between mb-6">
//               <div>
//                 <div className="flex items-center gap-3 mb-2">
//                   <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded tracking-wide uppercase">
//                     {task.id}
//                   </span>
//                   <span className={`text-xs font-bold px-2 py-1 rounded border uppercase ${getStatusBadge(task.status)}`}>
//                     {task.status}
//                   </span>
//                 </div>
//                 <h1 className="text-3xl font-bold text-slate-900">{task.title}</h1>
//               </div>
//               <button className="p-2 text-slate-400 hover:text-slate-600">
//                 <Settings size={20} />
//               </button>
//             </div>

//             <p className="text-slate-600 leading-relaxed mb-8">
//               {task.description}
//             </p>

//             <div className="grid grid-cols-3 gap-4">
//               <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
//                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Due Date</span>
//                 <span className="text-sm font-bold text-slate-700">{task.dueDate}</span>
//               </div>
//               <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
//                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Estimated</span>
//                 <span className="text-sm font-bold text-slate-700">{task.estimatedHours}h</span>
//               </div>
//               <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
//                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Logged</span>
//                 <span className="text-sm font-bold text-indigo-600">{task.loggedHours}h</span>
//               </div>
//             </div>
//           </section>

//           {/* Active Review Portal */}
//           {submissions[0].status === 'Pending Review' && (
//             <section className="bg-white rounded-2xl border-2 border-indigo-100 shadow-lg shadow-indigo-100/20 overflow-hidden ring-4 ring-indigo-50/50">
//               <div className="bg-indigo-600 px-8 py-4 flex justify-between items-center text-white">
//                 <h2 className="font-bold flex items-center gap-2">
//                   <ShieldCheck size={18} />
//                   Action Required: Review Latest Submission
//                 </h2>
//                 <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded">Newest</span>
//               </div>
//               <div className="p-8">
//                 <div className="mb-6">
//                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Assignee's Note</p>
//                   <p className="bg-slate-50 p-4 rounded-xl text-slate-700 border border-slate-100 italic text-sm">
//                     "{submissions[0].note}"
//                   </p>
//                 </div>

//                 <div className="mb-8">
//                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Your Feedback</p>
//                   <textarea
//                     rows={3}
//                     value={reviewFeedback}
//                     onChange={(e) => setReviewFeedback(e.target.value)}
//                     placeholder="Provide feedback or list required changes..."
//                     className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all bg-white"
//                   />
//                 </div>

//                 <div className="flex gap-3">
//                   <button
//                     onClick={() => handleReview('Changes Requested')}
//                     disabled={isProcessing}
//                     className="flex-1 bg-white border border-amber-200 text-amber-700 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-amber-50 transition-all shadow-sm"
//                   >
//                     <RotateCcw size={16} />
//                     Request Changes
//                   </button>
//                   <button
//                     onClick={() => handleReview('Approved')}
//                     disabled={isProcessing}
//                     className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
//                   >
//                     <CheckCircle2 size={16} />
//                     Approve Submission
//                   </button>
//                 </div>
//               </div>
//             </section>
//           )}

//           {/* Submission History List */}
//           <section className="space-y-4">
//             <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2 px-2">
//               <History size={18} className="text-slate-400" />
//               Submission History
//             </h2>
//             <div className="space-y-4">
//               {submissions.map((sub) => (
//                 <div key={sub.id} className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-all ${sub.status === 'Pending Review' ? 'opacity-100' : 'opacity-70 grayscale-[0.3]'}`}>
//                   <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50 bg-slate-50/30">
//                     <div className="flex items-center gap-3">
//                       <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{sub.date}</span>
//                       <span className={`text-[10px] font-bold px-2 py-1 rounded-full border uppercase tracking-wider ${getStatusBadge(sub.status)}`}>
//                         {sub.status}
//                       </span>
//                     </div>
//                     <div className="flex gap-2">
//                       {sub.files.map(f => (
//                         <button key={f} className="p-1.5 bg-white border border-slate-200 rounded text-slate-500 hover:text-indigo-600 hover:border-indigo-200 transition-all">
//                           <ExternalLink size={14} />
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   <div className="p-6">
//                     <p className="text-sm text-slate-700 mb-4">{sub.note}</p>
//                     {sub.feedback && (
//                       <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-100 flex gap-3">
//                         <MessageSquare size={16} className="text-slate-400 mt-0.5 shrink-0" />
//                         <div>
//                           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Your Previous Feedback</p>
//                           <p className="text-sm text-slate-600">{sub.feedback}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
//         </div>

//         {/* Right Column: Manager Sidebar */}
//         <div className="space-y-6">

//           {/* Team Management */}
//           <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Assignee</h3>
//               <button className="text-indigo-600 hover:bg-indigo-50 p-1.5 rounded-lg transition-colors">
//                 <UserPlus size={18} />
//               </button>
//             </div>

//             <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl border border-slate-100">
//               <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-inner">
//                 {task.assignee.avatar}
//               </div>
//               <div className="flex-1">
//                 <h4 className="font-bold text-slate-900 leading-tight">{task.assignee.name}</h4>
//                 <p className="text-xs text-slate-500 font-medium">Design Department</p>
//               </div>
//               <div className="w-2 h-2 rounded-full bg-emerald-500" title="Online" />
//             </div>

//             <div className="mt-6 flex gap-2">
//               <button className="flex-1 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
//                 Message
//               </button>
//               <button className="flex-1 py-2 text-xs font-bold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
//                 Reassign
//               </button>
//             </div>
//           </section>

//           {/* Efficiency & Metrics */}
//           <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden relative">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
//               <BarChart3 size={16} />
//               Resource Efficiency
//             </h3>

//             <div className="space-y-6">
//               <div>
//                 <div className="flex justify-between text-sm font-bold mb-2">
//                   <span className="text-slate-600">Time Usage</span>
//                   <span className="text-indigo-600">92%</span>
//                 </div>
//                 <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                   <div className="bg-indigo-500 h-full rounded-full" style={{ width: '92%' }} />
//                 </div>
//               </div>

//               <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
//                 <div className="flex gap-3">
//                   <AlertCircle size={18} className="text-emerald-600 shrink-0 mt-0.5" />
//                   <p className="text-xs text-emerald-800 leading-relaxed">
//                     <span className="font-bold">On Track:</span> Assignee is working within the estimated range. Productivity is rated as <span className="font-bold">High</span>.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* Administrative Actions */}
//           <section className="bg-slate-900 rounded-2xl p-6 text-white shadow-xl shadow-slate-200">
//             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Admin Controls</h3>
//             <div className="space-y-3">
//               <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
//                 <div className="flex items-center gap-3">
//                   <Calendar size={16} className="text-slate-400" />
//                   <span className="text-sm font-medium">Extend Deadline</span>
//                 </div>
//                 <ChevronRight size={14} className="text-slate-600" />
//               </button>
//               <button className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/5">
//                 <div className="flex items-center gap-3">
//                   <ShieldCheck size={16} className="text-slate-400" />
//                   <span className="text-sm font-medium">Verify Compliance</span>
//                 </div>
//                 <ChevronRight size={14} className="text-slate-600" />
//               </button>
//             </div>
//           </section>

//         </div>

//       </main>
//     </div>
//   );
// };

// export default App;


// *************************************************************************************************
// *********************************************code 3***********************************************
// ****************************************************************************************************


import React, { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  MoreHorizontal,
  User,
  MessageSquare,
  History,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  UserPlus,
  Settings,
  BarChart3,
  Trash2,
  Info,
  Layers,
  Paperclip,
  TrendingUp,
  Mail,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import SubmitTaskForm from "@/components/sections/SubmitTaskForm";

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

  const [reviewFeedback, setReviewFeedback] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const getTaskById = async (id: string) => {
    const res = await api.get(`/task/${id}`);
    return res.data; // make sure backend returns project object
  };

  const {
    data: taskData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getTaskById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fffdf5] flex flex-col items-center justify-center space-y-4 font-sans">
        <div className="w-12 h-12 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin"></div>
        <p className="text-sm font-bold text-amber-900/40 uppercase tracking-widest italic">Loading Task...</p>
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
              <SubmitTaskForm task={taskData.task}/>
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
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 h-[600px] flex flex-col animate-in fade-in duration-500">
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
          {/* Assignee Card */}
          <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                Active Assignee
              </h3>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-xl shadow-slate-200 ring-4 ring-slate-50">
                {task.assignee.avatar}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg leading-tight">
                  {taskData?.user?.name}
                </h4>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  {taskData?.user?.role}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-bold text-slate-700 transition-all border border-slate-200">
                <Mail size={16} />
                Message
              </button>
              <button className="w-full py-3 text-xs font-bold text-indigo-600 bg-indigo-50/50 hover:bg-indigo-100 rounded-xl transition-all border border-indigo-100/50">
                Reassign Task
              </button>
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
