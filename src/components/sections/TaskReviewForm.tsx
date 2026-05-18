import { CheckCircle2, ExternalLink, FileText, Info, RotateCcw, ShieldCheck } from 'lucide-react';
import React, { useState } from 'react'

const TaskReviewForm = ({task,setTask}:{task:any; setTask:any}) => {

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


    const handleReview = (status: any) => {
    setIsProcessing(true);
    setTimeout(() => {
      const updatedSubmissions = [...submissions];
      updatedSubmissions[0] = {
        ...updatedSubmissions[0],
        status: status,
        feedback: reviewFeedback,
      };
      setSubmissions(updatedSubmissions);
      setTask({
        ...task,
        status: status === "Approved" ? "Completed" : "In Progress",
      });
      setReviewFeedback("");
      setIsProcessing(false);
    }, 800);
  };
  return (
    <>
    {/* Actionable Submission Portal */}
              {submissions[0].status === "Pending Review" && (
                <section className="bg-white rounded-3xl border-2 border-indigo-100 shadow-xl shadow-indigo-100/10 overflow-hidden">
                  <div className="bg-indigo-600 px-8 py-5 flex justify-between items-center text-white">
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-lg">
                        <ShieldCheck size={20} />
                      </div>
                      <h2 className="font-bold">
                        Latest Work Ready for Review
                      </h2>
                    </div>
                    <div className="text-xs font-bold bg-white text-indigo-600 px-3 py-1 rounded-full uppercase">
                      Review Now
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <Info size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          Assignee's Submission Note
                        </span>
                      </div>
                      <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-slate-700 text-sm leading-relaxed relative">
                        <span className="absolute -left-2 top-4 text-4xl text-slate-200 font-serif leading-none">
                          “
                        </span>
                        {submissions[0].note}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {submissions[0].files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-3 bg-white border border-slate-200 rounded-xl hover:border-indigo-300 transition-colors cursor-pointer group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 rounded-lg text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                              <FileText size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-700">
                              {file}
                            </span>
                          </div>
                          <ExternalLink
                            size={14}
                            className="text-slate-300 group-hover:text-indigo-400"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <textarea
                        rows={3}
                        value={reviewFeedback}
                        onChange={(e) => setReviewFeedback(e.target.value)}
                        placeholder="Provide revision instructions or approval notes..."
                        className="w-full border border-slate-200 rounded-2xl p-5 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all resize-none bg-slate-50/30"
                      />
                      <div className="flex gap-4">
                        <button
                          onClick={() => handleReview("Changes Requested")}
                          disabled={isProcessing}
                          className="flex-1 bg-white border border-amber-200 text-amber-700 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-amber-50 transition-all shadow-sm active:scale-95"
                        >
                          <RotateCcw size={16} />
                          Request Revisions
                        </button>
                        <button
                          onClick={() => handleReview("Approved")}
                          disabled={isProcessing}
                          className="flex-1 bg-emerald-600 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200 active:scale-95"
                        >
                          <CheckCircle2 size={16} />
                          Approve & Finalize
                        </button>
                      </div>
                    </div>
                  </div>
                </section>
              )}
</>
  )
}

export default TaskReviewForm