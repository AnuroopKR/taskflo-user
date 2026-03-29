import { notFound } from "next/navigation";
import {dummyUsers} from "@/data/dummyData"; // your dummy users file
import BackButton from "@/components/sections/ui/BackButton";
import { FaEnvelope, FaBuilding, FaIdBadge } from "react-icons/fa";

export default async function EmployeePage({ params }: { params: { id: string } }) {
  const { id } = await params;

  const employee = dummyUsers.find((u) => u.id === id);

  if (!employee) return notFound();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-lg p-8">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">
            {employee.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <h1 className="text-2xl font-semibold mb-2">{employee.name}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              employee.role === "ADMIN" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
            }`}
          >
            {employee.role}
          </span>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3 text-gray-700">
            <FaEnvelope className="text-blue-500" />
            <span>{employee.email}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaBuilding className="text-green-500" />
            <span>Company ID: {employee.companyId}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <FaIdBadge className="text-purple-500" />
            <span>ID: {employee.id}</span>
          </div>
        </div>

        {/* Client Component */}
        <BackButton />
      </div>
    </div>
  );
}