"use client";
import api from "@/lib/axios";
import { Task } from "@/types/Task";
import { useMutation } from "@tanstack/react-query";
import { Paperclip, Send, UploadCloud } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SubmitTaskForm = ({ task }: { task: Task }) => {
  const router = useRouter();

  const [formNote, setFormNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!formNote.trim()) return;
    const form = {
      taskId: task.id,
      comment: formNote,
    };

    createTaskMutation.mutate(form);
  };

  const createTaskMutation = useMutation({
    mutationFn: async (data: any) => {
      const res = await api.post("/task/submit", data);

      return res.data; // ✅ axios returns data here
    },

    onSuccess: (data) => {
      console.log("✅ Submission Success:", data);
      router.push("/dashboard/projects");
    },

    onError: (error: any) => {
      console.error("❌ Error:", error.response?.data || error.message);
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    setSelectedFiles(files);
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="bg-slate-50/50 border-b border-slate-100 px-8 py-4">
        <h2 className="font-bold text-slate-800 flex items-center gap-2">
          <UploadCloud size={18} className="text-indigo-600" />
          Submit Your Work
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="p-8">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Submission Notes
          </label>
          <textarea
            rows={4}
            value={formNote}
            onChange={(e) => setFormNote(e.target.value)}
            placeholder="Explain what has been completed or any specific details for the reviewer..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
          />
        </div>

        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Attachments
          </label>

          <label className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/30 hover:bg-slate-50 transition-colors cursor-pointer group">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform">
              <Paperclip className="text-slate-400" size={20} />
            </div>

            <p className="text-sm font-medium text-slate-600">
              Click to upload or drag and drop
            </p>

            <p className="text-xs text-slate-400 mt-1">
              Maximum file size: 50MB
            </p>
          </label>

          {/* Preview */}
          {selectedFiles.length > 0 && (
            <div className="mt-3 text-sm text-slate-600">
              {selectedFiles.map((file, i) => (
                <div key={i}>📎 {file.name}</div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !formNote.trim()}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
              isSubmitting || !formNote.trim()
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100"
            }`}
          >
            <Send size={16} />
            {isSubmitting ? "Submitting..." : "Submit for Review"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SubmitTaskForm;
