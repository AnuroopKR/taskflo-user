// components/BackButton.tsx
"use client"; // ⚠️ This makes it a Client Component

export default function BackButton() {
  return (
    <button
      onClick={() => window.history.back()}
      className="mt-8 w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
    >
      Go Back
    </button>
  );
}