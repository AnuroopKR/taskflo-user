export type Task = {
  id: number;
  title: string;
  description: string;
  projectId: number;

  assignedTo: string;

  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  priority: "LOW" | "MEDIUM" | "HIGH";

  startDate: string; // ISO string
  dueDate: string;   // ISO string
};