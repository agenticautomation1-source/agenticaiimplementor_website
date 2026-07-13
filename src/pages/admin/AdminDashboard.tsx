import React, { useEffect, useState } from "react";
import { loadDashboard } from "../../services/adminService";


export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<any>(null);

  useEffect(() => {
    loadDashboard().then(setDashboard);
  }, []);

  return (
    <main className="min-h-screen bg-[#050608] text-white px-8 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Masterstroke Admin
          </h1>

          <p className="text-slate-400 mt-2">
            Enterprise Administration Console
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

       <Card
  title="Total Revenue"
  value={`₹${((dashboard?.totalRevenue ?? 0) / 100).toLocaleString()}`}
/>

        <Card
        title="Today's Revenue"
        value={`₹${((dashboard?.todayRevenue ?? 0) / 100).toLocaleString()}`}
        />

        <Card
        title="Total Enrollments"
        value={`${dashboard?.totalEnrollments ?? 0}`}
        />

        <Card
        title="Today's Enrollments"
        value={`${dashboard?.todayEnrollments ?? 0}`}
        />

        </div>

        <div className="mt-10 rounded-xl border border-white/10 overflow-hidden">

          <div className="px-6 py-4 border-b border-white/10">

            <h2 className="font-semibold">
              Recent Enrollments
            </h2>

          </div>

          <table className="w-full">

            <thead className="text-slate-400 text-sm">

              <tr>

                <th className="text-left px-6 py-4">Student</th>

                <th className="text-left px-6 py-4">Email</th>

                <th className="text-left px-6 py-4">Program</th>

                <th className="text-left px-6 py-4">Amount</th>

                <th className="text-left px-6 py-4">Status</th>

                <th className="text-left px-6 py-4">Date</th>

              </tr>

            </thead>

<tbody>
  {dashboard?.enrollments?.length ? (
    dashboard.enrollments.map((row: any) => (
      <tr
        key={row.id}
        className="border-t border-white/5"
      >
        <td className="px-6 py-4">
          {row.user_id}
        </td>

        <td className="px-6 py-4">
          —
        </td>

        <td className="px-6 py-4">
          {row.program_id}
        </td>

        <td className="px-6 py-4">
          —
        </td>

        <td className="px-6 py-4 text-green-400">
          {row.status}
        </td>

        <td className="px-6 py-4">
          {new Date(row.created_at).toLocaleDateString()}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        className="px-6 py-5 text-slate-500"
        colSpan={6}
      >
        No enrollments found.
      </td>
    </tr>
  )}
</tbody>

          </table>

        </div>

      </div>
    </main>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0D1117] p-6">

      <div className="text-slate-400 text-sm">
        {title}
      </div>

      <div className="text-3xl font-bold mt-3">
        {value}
      </div>

    </div>
  );
}