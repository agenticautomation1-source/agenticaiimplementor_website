import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import Features from './components/Features';
import Curriculum from './components/Curriculum';
import AIAdvisor from './components/AIAdvisor';
import LMSDashboard from './components/LMSDashboard';
import CheckoutModal from './components/CheckoutModal';
import { Course } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'lms'>('landing');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
  };

  const handlePaymentSuccess = () => {
    setSelectedCourse(null);
    setView('lms');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleView = () => {
    setView(prev => prev === 'landing' ? 'lms' : 'landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (view === 'lms') {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar onLogin={toggleView} isLoggedIn={true} />
        <LMSDashboard onBack={() => setView('landing')} />
        <AIAdvisor />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onLogin={toggleView} isLoggedIn={false} />
      
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <Features />
        
        <div id="curriculum">
           <Curriculum onEnroll={handleEnroll} />
        </div>
        
        {/* Final CTA Section */}
        <section className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center border border-primary/20 bg-charcoal/40 backdrop-blur-xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-white text-4xl md:text-5xl font-bold font-display max-w-2xl">
                The Future is Agentic. <br/>Are You Integrated?
              </h2>
              <p className="text-slate-400 text-lg max-w-xl">
                Join the Q4 Cohort of the Agentic AI Integrators network. Master the protocols used by top-tier engineering firms to stitch intelligence into enterprise value.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => document.getElementById('curriculum')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-10 py-5 bg-primary text-white font-bold rounded-xl glow-accent hover:scale-105 transition-all active:scale-95 uppercase tracking-widest text-sm"
                >
                  Join the Masterstroke
                </button>
                <button className="px-10 py-5 bg-transparent border border-white/10 text-white font-bold rounded-xl hover:bg-white/5 transition-all active:scale-95 uppercase tracking-widest text-sm">
                  View Case Studies
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-charcoal/50 py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="flex flex-col gap-6 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="size-8 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path d="M45 15 L20 70 L30 70 L50 25 Z" fill="#3b82f6" />
                    <path d="M55 15 L80 70 L70 70 L50 25 Z" fill="#3b82f6" />
                    <path d="M25 75 L75 75 L75 85 L25 85 Z" fill="#1e3a8a" />
                    <circle cx="48" cy="62" r="7" fill="#6366f1" />
                  </svg>
                </div>
                <h2 className="text-white text-xl font-bold font-display tracking-tight">Agentic AI <span className="text-slate-500 font-light">Integrators</span></h2>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                Empowering the next generation of engineers to build robust, autonomous, and ethically stitched AI ecosystems for the global enterprise.
              </p>
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Company</h4>
              <a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">About</a>
              <a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Contact</a>
              <a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">LinkedIn</a>
              <a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">X (Twitter)</a>
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-2">Policies</h4>
              <a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Refund Policy</a>
              <a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Disclaimer</a>
              <a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Terms & Conditions</a>
              <a href="#" className="text-slate-500 hover:text-primary text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-600 text-[10px] uppercase font-bold tracking-[0.2em] font-mono">
              [SYSTEM_INTEGRITY_VERIFIED_V4.4]
            </p>
            <p className="text-slate-600 text-xs font-medium">
              © {new Date().getFullYear()} Agentic AI Integrators. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <AIAdvisor />

      {selectedCourse && (
        <CheckoutModal 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default App;