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


export async function loadDashboardV2() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [
    { count: totalEnrollments },
    { data: payments, error: paymentError },
    { data: enrollments, error: enrollmentError },
    { data: programs, error: programError },
  ] = await Promise.all([
    supabase
      .from("enrollments")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),

    supabase
      .from("payments")
      .select("*"),

    supabase
      .from("enrollments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10),

    supabase
      .from("programs")
      .select("*"),
  ]);


  
  if (paymentError) throw paymentError;
  if (enrollmentError) throw enrollmentError;
  if (programError) throw programError;

console.log("====== DASHBOARD DEBUG ======");
console.log("Payments:", payments);
console.log("Enrollments:", enrollments);
console.log("Programs:", programs);
console.log("Total Enrollments:", totalEnrollments);


  const successfulPayments =
    payments?.filter((payment) =>
      ["paid", "captured", "success"].includes(
        (payment.status || "").toLowerCase()
      )
    ) ?? [];

  const totalRevenue = successfulPayments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );

  const todayRevenue = successfulPayments
    .filter((payment) => new Date(payment.created_at) >= today)
    .reduce((sum, payment) => sum + (payment.amount || 0), 0);

  const todayEnrollments =
    enrollments?.filter(
      (enrollment) => new Date(enrollment.created_at) >= today
    ).length ?? 0;

  const programLookup = new Map<string, any>();

  programs?.forEach((program) => {
    programLookup.set(String(program.id), program);
  });

  const dashboardEnrollments =
    enrollments?.map((enrollment) => {
      const payment = successfulPayments.find(
        (p) =>
          p.razorpay_payment_id ===
          enrollment.razorpay_payment_id
      );

      const program = programLookup.get(
        String(enrollment.program_id)
      );

      return {
        id: enrollment.id,

        student_name:
          enrollment.student_name ||
          payment?.student_name ||
          "-",

        student_email:
          enrollment.student_email ||
          payment?.student_email ||
          "-",

        program:
          program?.title ||
          program?.name ||
          enrollment.program_id,

        amount:
          payment?.amount ??
          program?.price ??
          0,

        status: enrollment.status,

        created_at: enrollment.created_at,

        razorpay_order_id:
          enrollment.razorpay_order_id,

        razorpay_payment_id:
          enrollment.razorpay_payment_id,
      };
    }) ?? [];

  return {
    totalEnrollments: totalEnrollments ?? 0,
    totalRevenue,
    todayRevenue,
    todayEnrollments,
    enrollments: dashboardEnrollments,
  };
}