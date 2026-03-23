"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
interface User {
  id: number;
  email: string;
  role: string;
  name: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      router.push("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-2 text-gray-600">Hoş geldin, {user?.name}</p>
        <p className="text-sm text-gray-500">{user?.email}</p>

        <button
          onClick={handleLogout}
          className="mt-6 rounded-lg bg-red-500 px-4 py-2 text-white"
        >
          Logout
        </button>
      </div>
    </main>
  );
}
