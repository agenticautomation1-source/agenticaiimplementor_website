
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoMarquee from './components/LogoMarquee';
import Features from './components/Features';
import Curriculum from './components/Curriculum';
import AIAdvisor from './components/AIAdvisor';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        <LogoMarquee />
        <Features />
        <Curriculum />
        
        {/* Final CTA Section */}
        <section className="max-w-[1200px] mx-auto px-6 py-24">
          <div className="relative rounded-2xl overflow-hidden p-12 md:p-20 text-center border border-primary/30 group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/5 pointer-events-none"></div>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 bg-[radial-gradient(circle_at_center,rgba(19,73,236,0.1)_0%,transparent_70%)] pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-white text-4xl md:text-5xl font-bold font-display max-w-2xl">
                Ready to Join the Top 1% of AI Engineers?
              </h2>
              <p className="text-slate-400 text-lg max-w-xl">
                Applications are currently open for the Q4 Cohort. Secure your spot in the most advanced agentic AI training program.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-10 py-4 bg-primary text-white font-bold rounded-lg glow-accent hover:scale-105 transition-all active:scale-95">
                  Apply for Admission
                </button>
                <button className="px-10 py-4 bg-transparent border border-white/20 text-white font-bold rounded-lg hover:bg-white/5 transition-all active:scale-95">
                  Download Brochure
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span className="material-symbols-outlined text-green-500 text-base">verified</span>
                Verified Certification upon completion
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-background-dark py-12">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 text-white opacity-60 hover:opacity-100 transition-opacity cursor-default">
            <div className="size-6 bg-primary/50 rounded flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xs">deployed_code</span>
            </div>
            <h2 className="text-white text-lg font-bold font-display">Elite Agentic AI</h2>
          </div>
          
          <div className="flex gap-8 text-slate-500 text-sm font-medium">
            <a className="hover:text-white transition-colors" href="#">Privacy Policy</a>
            <a className="hover:text-white transition-colors" href="#">Terms of Service</a>
            <a className="hover:text-white transition-colors" href="#">Contact</a>
          </div>
          
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} Elite Agentic AI. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Interactive AI Assistant */}
      <AIAdvisor />
    </div>
  );
};

export default App;
