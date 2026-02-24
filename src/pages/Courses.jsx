// src/pages/Courses.jsx

import SEO from "../components/SEO";
import CourseCard from "../components/CourseCard";
import { MASTERSTROKE_COURSES } from "../config/courses";

export default function Courses() {
  const courses = Object.values(MASTERSTROKE_COURSES);

  return (
    <>
      <SEO
        title="Agentic AI Masterstroke Programs | Production AI Engineering Tracks"
        description="Explore enterprise-grade Agentic AI programs: Systems Engineer, GenAI Platform Architect, and AI Validation & Governance tracks designed for production deployment."
        url="https://www.agenticaiimplementors.com/courses"
      />

      <section className="relative">
        {/* PAGE HEADER */}
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-12">
          <h1 className="text-[34px] font-semibold tracking-tight text-white font-display">
            Masterstroke Programs
          </h1>

          {/* subtle divider */}
          <div className="mt-6 h-px w-24 bg-gradient-to-r from-primary/60 to-transparent" />
        </div>

        {/* COURSES GRID */}
        <div className="max-w-7xl mx-auto px-6 pb-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}