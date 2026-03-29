"use client";

import { FaUsers, FaBuilding } from "react-icons/fa";

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      name: "Dashboard UI",
      company: { name: "Google" },
      members: [1, 2, 3, 4],
      createdAt: "2026-02-10",
    },
    {
      id: 2,
      name: "E-commerce Platform",
      company: { name: "Amazon" },
      members: [1, 2],
      createdAt: "2026-01-28",
    },
    {
      id: 3,
      name: "Mobile App",
      company: { name: "Meta" },
      members: [1, 2, 3],
      createdAt: "2026-02-15",
    },
    {
      id: 4,
      name: "AI Chatbot",
      company: { name: "OpenAI" },
      members: [1],
      createdAt: "2026-03-01",
    },
  ];

  return (
    <div className="m-2 ml-4 mt-4">
      
      {/* Section Container (same style as Task Management box) */}
      <div className="bg-white border border-gray-100 rounded-xl shadow-sm p-5">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-gray-800">
            Projects
          </h2>

          <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-4 py-2 rounded-lg shadow-sm transition">
            + Create Project
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition bg-white"
            >
              
              {/* Title */}
              <h3 className="font-medium text-gray-800 mb-1">
                {project.name}
              </h3>

              {/* Company */}
              <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
                <FaBuilding className="text-gray-400 text-xs" />
                {project.company.name}
              </div>

              {/* Bottom Row */}
              <div className="flex justify-between items-center text-xs text-gray-500">
                
                {/* Members */}
                <div className="flex items-center gap-1">
                  <FaUsers className="text-gray-400" />
                  {project.members.length}
                </div>

                {/* Date */}
                <span>
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
}