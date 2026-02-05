// src/components/CourseCard.jsx

import { useState } from "react";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  const [loading, setLoading] = useState(false);

  const handleEnrollClick = () => {
    if (!course?.enrollUrl) {
      console.error(
        "[CourseCard] Missing enrollUrl for course:",
        course?.title
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      window.open(course.enrollUrl, "_blank", "noopener,noreferrer");
      setLoading(false);
    }, 250);
  };

  return (
    <div className="group rounded-2xl border border-white/10 bg-gradient-to-b from-[#0b1220] to-[#05070c] overflow-hidden hover:border-primary/40 transition-all duration-300">
      
      {/* FEATURED IMAGE */}
      <div className="relative h-[240px] overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-6 pt-7 flex flex-col gap-4">
        
        {/* TITLE */}
        <h3 className="text-[17px] font-semibold tracking-tight text-white leading-snug">
          {course.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-sm text-slate-400 leading-relaxed">
          {course.description}
        </p>

        {/* META */}
        <div className="flex flex-wrap gap-2 text-xs text-slate-400">
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
            {course.level}
          </span>
          <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10">
            {course.duration}
          </span>
        </div>

        {/* CTA */}
        <div className="pt-4 mt-auto flex flex-col gap-3">
          
          {/* PRIMARY — ENROLL */}
          <button
            onClick={handleEnrollClick}
            disabled={loading}
            className={`
              inline-flex items-center justify-center w-full
              px-6 py-3 rounded-xl
              bg-primary text-black
              font-bold text-sm uppercase tracking-wider
              transition-all duration-200 ease-out
              focus:outline-none
              ${
                loading
                  ? "opacity-70 cursor-wait"
                  : "cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.55)] hover:brightness-110 active:scale-[0.97]"
              }
            `}
          >
            {loading ? "Opening…" : "Enroll Now"}
          </button>

          {/* SECONDARY — INTERNAL NAVIGATION */}
          <Link
  to={`/${course.detailUrl.replace(/^\/+/, "")}`}
  className="text-center text-xs uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
>
  View Curriculum
</Link>

        </div>
      </div>
    </div>
  );
}
