import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
  }

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    //--------------------------------------------------
    // Total Revenue
    //--------------------------------------------------

    const { data: payments, error: paymentError } = await supabase
      .from("payments")
      .select(
        `
        amount,
        status,
        created_at,
        student_name,
        student_email,
        program_id
      `
      );

    if (paymentError) throw paymentError;

    const successfulPayments = payments.filter(
      (p) =>
        p.status?.toLowerCase() === "paid" ||
        p.status?.toLowerCase() === "captured" ||
        p.status?.toLowerCase() === "success"
    );

    const totalRevenue = successfulPayments.reduce(
      (sum, p) => sum + (p.amount || 0),
      0
    );

    const todayRevenue = successfulPayments
      .filter(
        (p) => new Date(p.created_at) >= today
      )
      .reduce((sum, p) => sum + (p.amount || 0), 0);

    //--------------------------------------------------
    // Enrollment Counts
    //--------------------------------------------------

    const { count: totalEnrollments, error: totalEnrollError } =
      await supabase
        .from("enrollments")
        .select("*", {
          count: "exact",
          head: true,
        });

    if (totalEnrollError) throw totalEnrollError;

    const { count: todayEnrollments, error: todayEnrollError } =
      await supabase
        .from("enrollments")
        .select("*", {
          count: "exact",
          head: true,
        })
        .gte("created_at", today.toISOString());

    if (todayEnrollError) throw todayEnrollError;

    //--------------------------------------------------
    // Programs
    //--------------------------------------------------

    const { data: programs } = await supabase
      .from("programs")
      .select("id,title,name,price");

    const programMap = new Map();

    programs?.forEach((program) => {
      programMap.set(program.id, program);
    });

    //--------------------------------------------------
    // Recent Enrollments
    //--------------------------------------------------

    const { data: enrollments, error: enrollError } =
      await supabase
        .from("enrollments")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(10);

    if (enrollError) throw enrollError;

    //--------------------------------------------------
    // Merge Program Details
    //--------------------------------------------------

    const dashboardEnrollments = enrollments.map((e) => {
      const program = programMap.get(e.program_id);

      const payment = successfulPayments.find(
        (p) =>
          p.razorpay_payment_id === e.razorpay_payment_id
      );

      return {
        id: e.id,

        student_name:
          e.student_name || payment?.student_name || "-",

        student_email:
          e.student_email || payment?.student_email || "-",

        program:
          program?.title ||
          program?.name ||
          e.program_id,

        amount:
          payment?.amount ??
          program?.price ??
          0,

        status: e.status,

        created_at: e.created_at,

        razorpay_payment_id:
          e.razorpay_payment_id,

        razorpay_order_id:
          e.razorpay_order_id,
      };
    });

    //--------------------------------------------------
    // Response
    //--------------------------------------------------

    return res.status(200).json({
      success: true,

      totalRevenue,

      todayRevenue,

      totalEnrollments:
        totalEnrollments ?? 0,

      todayEnrollments:
        todayEnrollments ?? 0,

      enrollments:
        dashboardEnrollments,
    });
  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}