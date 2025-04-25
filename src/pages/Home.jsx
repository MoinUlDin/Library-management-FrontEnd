import React from "react";

export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      {/* Example cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-4">
          <div className="text-sm text-gray-500">Total Books</div>
          <div className="mt-2 text-3xl font-bold">1,234</div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <div className="text-sm text-gray-500">Members</div>
          <div className="mt-2 text-3xl font-bold">567</div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <div className="text-sm text-gray-500">Reservations</div>
          <div className="mt-2 text-3xl font-bold">89</div>
        </div>
        <div className="bg-white shadow rounded p-4">
          <div className="text-sm text-gray-500">Active Issues</div>
          <div className="mt-2 text-3xl font-bold">45</div>
        </div>
      </div>

      {/* Placeholder for more dashboard content */}
      <div className="mt-8">
        <p className="text-gray-600">
          Welcome to your library management dashboard! Use the sidebar to
          navigate between pages.
        </p>
      </div>
    </div>
  );
}
