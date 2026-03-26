import { OverviewData } from "../types/overview";
import React from "react";
import { redirect } from "next/navigation";
import { useAuth } from "./context/AuthContext";

async function getOverview(): Promise<OverviewData> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/overview`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch overview data");
  }
  const data = await response.json();
  return data;
}

export default async function Home() {
  redirect("/login");

  const data = await getOverview();

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6">
        Enterprise Observability Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-xl p-4">
          <div className="text-sm text-gray-500">Services</div>
          <div className="text-2xl font-semibold">{data.services}</div>
        </div>

        <div className="border rounded-xl p-4">
          <div className="text-sm text-gray-500">Incidents</div>
          <div className="text-2xl font-semibold">{data.incidents}</div>
        </div>

        <div className="border rounded-xl p-4">
          <div className="text-sm text-gray-500">Error Rate</div>
          <div className="text-2xl font-semibold">%{data.errorRate}</div>
        </div>

        <div className="border rounded-xl p-4">
          <div className="text-sm text-gray-500">Avg Response</div>
          <div className="text-2xl font-semibold">{data.avgResponseMs} ms</div>
        </div>

        <div className="border rounded-xl p-4">
          <div className="text-sm text-gray-500">Uptime</div>
          <div className="text-2xl font-semibold">%{data.uptime}</div>
        </div>
      </div>
    </main>
  );
}
