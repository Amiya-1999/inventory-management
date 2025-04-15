"use client";

import { useAuth } from "../context/AuthContext";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const UserPage = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-semibold">You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-40 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4 text-blue-600">User Profile</h1>

      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center gap-2 cursor-pointer"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
};

export default UserPage;
