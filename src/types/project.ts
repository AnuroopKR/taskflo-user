export interface Project {
  id: number;
  name: string;
  description: string | null;

  companyId: string;
  ownerId: string | null;

  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "ACTIVE" | "COMPLETED" | "ON_HOLD" | "CANCELLED";

  startDate: string | null;
  dueDate: string | null;

  createdAt: string;
  updatedAt: string;

  // ✅ Company
  company: {
    id: string;
    name: string;
    email: string;
    plan: string;
    createdAt: string;
    updatedAt: string;
  };

  // ✅ Tasks
  tasks: {
    id: number;
    title: string;
    description: string | null;

    projectId: number | null;

    status:
      | "PENDING"
      | "IN_PROGRESS"
      | "SUBMITTED"
      | "COMPLETED"
      | "REASSIGNED"
      | "OVERDUE";

    priority: "LOW" | "MEDIUM" | "HIGH";

    createdBy: string | null;
    assignedTo: string | null;

    startDate: string | null;
    dueDate: string | null;
    completedAt: string | null;

    createdAt: string;
    updatedAt: string;
  }[];
}