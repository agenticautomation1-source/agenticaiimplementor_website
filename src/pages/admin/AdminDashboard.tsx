import React, { useEffect, useState } from "react";
import { loadDashboardV2 } from "../../services/adminService";


export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<any>(null);

useEffect(() => {
  loadDashboardV2().then(setDashboard);
}, []);

  return (
    <main className="min-h-screen bg-[#050608] text-white px-8 py-10">
      <div className="max-w-7xl mx-auto">

      
      <div className="flex justify-between items-center mb-10">

  <div>

    <p className="text-cyan-400 uppercase tracking-[0.3em] text-xs font-semibold">
      MASTERSTROKE
    </p>

    <h1 className="text-4xl font-bold mt-2">
      Administration Console
    </h1>

    <p className="text-slate-400 mt-2">
      Platform operations, enrollments and revenue overview
    </p>

  </div>

  <div className="text-right">

    <div className="text-slate-400 text-sm">
      {new Date().toLocaleDateString()}
    </div>

    <div className="text-green-400 text-sm mt-2">
      ● System Healthy
    </div>

  </div>

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

        <div className="mt-10">

  <h2 className="text-lg font-semibold mb-4">
    Quick Actions
  </h2>

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <button className="rounded-xl bg-cyan-500 hover:bg-cyan-400 transition text-black font-semibold py-4">
      + Add Program
    </button>

    <button className="rounded-xl border border-white/10 hover:border-cyan-500 py-4">
      Students
    </button>

    <button className="rounded-xl border border-white/10 hover:border-cyan-500 py-4">
      Payments
    </button>

    <button className="rounded-xl border border-white/10 hover:border-cyan-500 py-4">
      Reports
    </button>

  </div>

</div>


          <div className="px-6 py-4 border-b border-white/10">

            <div className="flex justify-between items-center">

  <h2 className="font-semibold text-lg">
    Recent Enrollments
  </h2>

  <span className="text-sm text-slate-400">
    Last 10 records
  </span>

</div>


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
  <td className="px-6 py-4 font-semibold text-cyan-400">
    {row.student_name}
  </td>

  <td className="px-6 py-4 text-slate-300">
    {row.student_email}
  </td>

  <td className="px-6 py-4">
    {row.program}
  </td>

  <td className="px-6 py-4 font-semibold text-green-400">
    ₹{(row.amount / 100).toLocaleString("en-IN")}
  </td>

  <td className="px-6 py-4">
    <span className="inline-flex px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold">
      {row.status}
    </span>
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
        No recent enrollments available.
      </td>
    </tr>
  )}
</tbody>

          </table>

        </div>


        <div className="mt-10">

  <h2 className="text-lg font-semibold mb-4">
    Platform Status
  </h2>

  <div className="grid md:grid-cols-4 gap-4">

    <Status title="Supabase" value="Connected" />

    <Status title="Authentication" value="Online" />

    <Status title="Payments" value="Operational" />

    <Status title="Platform" value="Healthy" />

  </div>

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
    <div className="rounded-2xl border border-cyan-500/20 bg-[#0D1117] p-6 hover:border-cyan-400 transition-all duration-300">

      <div className="text-slate-400 uppercase tracking-widest text-xs">
        {title}
      </div>

      <div className="text-3xl font-bold text-white mt-4">
        {value}
      </div>

      <div className="mt-4 flex items-center text-green-400 text-sm">
        <span className="mr-2">●</span>
        Platform Live
      </div>

    </div>
  );
}