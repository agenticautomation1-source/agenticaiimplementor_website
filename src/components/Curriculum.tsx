import React from 'react';
import { COURSES } from '../constants';

interface CurriculumProps {
  onEnroll?: (course: any) => void;
}

const Curriculum: React.FC<CurriculumProps> = ({ onEnroll }) => {
  return (
    <section className="bg-charcoal/50 py-24 border-y border-white/5">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-white text-3xl md:text-4xl font-bold font-display">
              Featured Curriculum
            </h2>
            <p className="text-slate-400 mt-2">
              Specialized programs designed for senior software engineers.
            </p>
          </div>
          <a
            className="text-primary font-bold text-sm flex items-center gap-2 hover:underline group"
            href="#"
          >
            View All Programs
            <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COURSES.map((course) => (
            <div
              key={course.id}
              className="glass-card rounded-xl overflow-hidden flex flex-col h-full group"
            >
              <div className="relative w-full aspect-video overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url("${course.image}")` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                  <span className="px-2 py-0.5 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded border border-primary/20">
                    {course.level}
                  </span>
                  <span className="text-slate-500 text-xs font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">
                      auto_awesome_motion
                    </span>
                    {course.modules} Modules
                  </span>
                </div>

                <h3 className="text-white text-lg font-bold mb-2 font-display group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                <p className="text-slate-400 text-sm mb-6 flex-1 line-clamp-3">
                  {course.description}
                </p>

                {/* ✅ FINAL CTA */}
<button
  onClick={() => onEnroll?.(course)}
  className="
    relative w-full py-3 rounded-lg
    bg-blue-600 text-white text-sm font-bold
    transition-all duration-300 ease-out

    hover:bg-blue-600
    hover:shadow-[0_0_0_1px_rgba(59,130,246,0.6),0_0_20px_rgba(59,130,246,0.55),0_0_40px_rgba(59,130,246,0.35)]

    active:scale-[0.98]
  "
>
  View Program
</button>


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;
