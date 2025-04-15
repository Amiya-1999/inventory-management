"use client";

import { useEffect, useState } from "react";
import { Menu, User2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname } from "next/navigation";

const Header = () => {
  const { user, setSidebarOpen } = useAuth();
  const pathname = usePathname();
  const isActive = pathname === "/";

  return (
    <header className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-gray-700 hover:text-blue-600"
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 tracking-wide hover:opacity-90 transition"
          >
            Digi<span className="text-gray-800">Dukaan</span>
          </Link>
        </div>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link
                href="/"
                className={`relative transition duration-300 font-medium group hidden md:block ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <span>Products</span>
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-blue-500 transition-all ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>

              <Link
                href="/users"
                className="p-2 rounded-full hover:bg-blue-100 transition"
                title="Users"
              >
                <User2 className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
