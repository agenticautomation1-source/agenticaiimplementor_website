import { supabase } from "../lib/supabaseClient";

export async function loadDashboard() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [{ count: totalEnrollments }, { data: payments }, { data: enrollments }] =
    await Promise.all([
      supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true })
        .eq("status", "active"),

      supabase
        .from("payments")
        .select("amount,created_at,status")
        .eq("status", "paid"),

      supabase
        .from("enrollments")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

  const totalRevenue =
    payments?.reduce((t, p) => t + (p.amount || 0), 0) ?? 0;

  const todayRevenue =
    payments
      ?.filter(
        (p) => new Date(p.created_at) >= today
      )
      .reduce((t, p) => t + (p.amount || 0), 0) ?? 0;

  const todayEnrollments =
    enrollments?.filter(
      (e) => new Date(e.created_at) >= today
    ).length ?? 0;

  return {
    totalEnrollments: totalEnrollments ?? 0,
    totalRevenue,
    todayRevenue,
    todayEnrollments,
    enrollments,
  };
}