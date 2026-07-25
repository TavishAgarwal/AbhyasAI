import { Brain, ArrowRight, Activity, Crosshair, Target, Network, Zap, LineChart, Quote } from 'lucide-react';
import { Link } from 'react-router';
import brainHeroImage from '../../assets/brain_hero.jpg';

export function LandingPage() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-hidden font-sans">
      <main className="pt-32 pb-24 px-6 lg:px-12 max-w-[1200px] mx-auto">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center mb-32">
          <h1 className="text-[48px] md:text-[72px] font-extrabold leading-[1.1] tracking-[-0.05em] mb-6 text-gradient-primary">
            MASTER YOUR FUTURE.
          </h1>
          <p className="text-[#464555] font-light text-[18px] max-w-2xl mx-auto mb-16 leading-relaxed">
            Cognitive mastery designed for the modern learner. Elevate your intellect with precision, clarity, and adaptive AI algorithms.
          </p>

          {/* Brain Graphic Placeholder */}
          <div className="w-full max-w-4xl aspect-[21/9] glass-panel flex items-center justify-center mb-12 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4f46e5]/20 to-transparent opacity-50 group-hover:opacity-70 transition-opacity duration-700 z-10 pointer-events-none"></div>
            <img 
              src={brainHeroImage} 
              alt="AbhyasAI Neural Network" 
              className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" 
            />
          </div>

          <Link to="/session/new" className="primary-btn group">
            Begin Your Journey <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </section>

        {/* Process of Mastery */}
        <section id="curriculum" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-[32px] font-bold text-[#0b1c30] inline-block relative">
              The Process of Mastery
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#4f46e5] rounded-full"></div>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[32px]">
            {/* Card 1 */}
            <div className="glass-panel p-[32px] flex flex-col justify-between h-full min-h-[250px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center font-geist font-semibold text-sm mb-6">
                  1
                </div>
                <h3 className="text-[20px] font-semibold text-[#0b1c30] mb-3">Diagnostic Baseline</h3>
              </div>
              <p className="text-[16px] text-[#464555] font-normal leading-relaxed">
                Our AI conducts an intricate map of your current cognitive standing, identifying unique strengths and blind spots.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass-panel p-[32px] flex flex-col justify-between h-full min-h-[250px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center font-geist font-semibold text-sm mb-6">
                  2
                </div>
                <h3 className="text-[20px] font-semibold text-[#0b1c30] mb-3">Adaptive Curation</h3>
              </div>
              <p className="text-[16px] text-[#464555] font-normal leading-relaxed">
                Syllabi restructure dynamically. The curriculum morphs in real-time to challenge you perfectly at the edge of your ability.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass-panel p-[32px] flex flex-col justify-between h-full min-h-[250px]">
              <div>
                <div className="w-10 h-10 rounded-full bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center font-geist font-semibold text-sm mb-6">
                  3
                </div>
                <h3 className="text-[20px] font-semibold text-[#0b1c30] mb-3">Crystal Synthesis</h3>
              </div>
              <p className="text-[16px] text-[#464555] font-normal leading-relaxed">
                Achieve profound understanding. Knowledge is anchored deeply into memory structures for rapid, high-stress recall.
              </p>
            </div>

            {/* Card 4 (Horizontal) */}
            <div className="glass-panel p-[32px] md:col-span-2 flex flex-col justify-center min-h-[250px] relative overflow-hidden">
              <div className="absolute right-0 top-0 w-64 h-64 bg-[#4f46e5]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
              <div className="relative z-10 max-w-lg">
                <Network className="w-8 h-8 text-[#4f46e5] mb-6" />
                <h3 className="text-[24px] font-bold text-[#0b1c30] mb-4">Neural-Net Architecture</h3>
                <p className="text-[16px] text-[#464555] font-normal leading-relaxed">
                  An underlying framework that mirrors human synaptic connections, ensuring your learning pathway is organically structured and impossibly efficient.
                </p>
              </div>
            </div>

            {/* Card 5 (Vertical) */}
            <div className="glass-panel p-[32px] flex flex-col items-center justify-center text-center min-h-[250px]">
              <Zap className="w-8 h-8 text-[#006591] mb-6" />
              <h3 className="text-[20px] font-semibold text-[#0b1c30] mb-3">Hyper-Focus</h3>
              <p className="text-[14px] text-[#464555] font-normal leading-relaxed">
                Eliminate mental friction with noise-canceling UI patterns.
              </p>
            </div>

            {/* Card 6 (Small Horizontal) */}
            <div className="glass-panel p-[32px] flex flex-col justify-end min-h-[200px]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#4f46e5] animate-pulse"></div>
                <span className="font-geist text-[12px] font-semibold tracking-[0.1em] text-[#4f46e5] uppercase">Active State</span>
              </div>
              <h3 className="text-[20px] font-semibold text-[#0b1c30] mb-2">Voice-Powered Practice</h3>
              <p className="text-[14px] text-[#464555] font-normal">
                Speak naturally. Our audio pipeline transcribes and analyzes your reasoning in real-time.
              </p>
            </div>

            {/* Card 7 (Medium Horizontal with Chart) */}
            <div className="glass-panel md:col-span-2 min-h-[200px] flex flex-col justify-between overflow-hidden">
              <div className="p-[32px] pb-0">
                <LineChart className="w-6 h-6 text-[#9d4718] mb-4" />
                <h3 className="text-[20px] font-semibold text-[#0b1c30] mb-2">Multidimensional Elo Tracking</h3>
                <p className="text-[14px] text-[#464555] font-normal max-w-sm">
                  Watch your skill levels evolve dynamically as the system calibrates the difficulty of every question to match your exact proficiency.
                </p>
              </div>
              <div className="flex items-end gap-2 px-8 pt-8 h-24 opacity-60">
                <div className="flex-1 bg-[#4f46e5] rounded-t-sm h-[20%]"></div>
                <div className="flex-1 bg-[#4f46e5] rounded-t-sm h-[35%]"></div>
                <div className="flex-1 bg-[#4f46e5] rounded-t-sm h-[25%]"></div>
                <div className="flex-1 bg-[#4f46e5] rounded-t-sm h-[60%]"></div>
                <div className="flex-1 bg-[#4f46e5] rounded-t-sm h-[50%]"></div>
                <div className="flex-1 bg-[#4f46e5] rounded-t-sm h-[80%]"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Interview Prep Section */}
        <section id="interview" className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 glass-panel p-8 relative overflow-hidden flex flex-col justify-center min-h-[300px]">
               <div className="absolute -left-12 -top-12 w-48 h-48 bg-[#006591]/10 rounded-full blur-3xl"></div>
               <div className="relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                   <Target className="w-6 h-6 text-[#006591]" />
                   <h3 className="font-bold text-[#0b1c30]">Mock Technical Interviews</h3>
                 </div>
                 <p className="text-[#464555] text-sm mb-6">
                   Simulate high-pressure environments with our AI interviewer. It adapts follow-up questions based on your previous answers to probe your true depth of knowledge.
                 </p>
                 <Link to="/session/new" className="inline-flex items-center text-sm font-semibold text-[#006591] hover:text-[#004e70] transition-colors">
                   Start Practice Session <ArrowRight className="w-4 h-4 ml-1" />
                 </Link>
               </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-[32px] font-bold text-[#0b1c30] mb-6">Master the Interview</h2>
              <p className="text-[#464555] text-[18px] mb-8 leading-relaxed">
                Don't just memorize answers. Our system evaluates your reasoning, communication clarity, and technical depth in real-time, just like a top-tier engineering manager.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Crosshair className="w-5 h-5 text-[#4f46e5] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0b1c30] block">Dynamic Follow-ups</strong>
                    <span className="text-[#464555] text-sm">The AI probes deeper if you give a superficial answer.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Activity className="w-5 h-5 text-[#4f46e5] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#0b1c30] block">Instant Feedback Loop</strong>
                    <span className="text-[#464555] text-sm">Get actionable advice immediately after you speak.</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Feature Highlights / Accessibility */}
        <section className="mb-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-[32px] font-bold text-[#0b1c30] mb-6">Built for Every Mind</h2>
              <p className="text-[#464555] text-[18px] mb-8 leading-relaxed">
                Learning isn't one-size-fits-all. AbhyasAI provides accessible feedback formats tailored to how your brain processes information best.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4f46e5]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#4f46e5]"></div>
                  </div>
                  <div>
                    <strong className="text-[#0b1c30] block">Standard Format</strong>
                    <span className="text-[#464555] text-sm">Clean, direct, and professional feedback.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4f46e5]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#4f46e5]"></div>
                  </div>
                  <div>
                    <strong className="text-[#0b1c30] block">Dyslexia-Friendly</strong>
                    <span className="text-[#464555] text-sm">Sans-serif fonts, wide spacing, active voice.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#4f46e5]/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[#4f46e5]"></div>
                  </div>
                  <div>
                    <strong className="text-[#0b1c30] block">ADHD-Friendly</strong>
                    <span className="text-[#464555] text-sm">Progressive disclosure and concrete micro-actions.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-panel p-8 relative overflow-hidden">
               <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#4f46e5]/10 rounded-full blur-3xl"></div>
               <div className="space-y-4">
                 <div className="p-4 bg-white/50 border border-slate-200/50 rounded-xl">
                   <div className="w-24 h-4 bg-slate-200 rounded animate-pulse mb-3"></div>
                   <div className="w-full h-3 bg-slate-100 rounded mb-2"></div>
                   <div className="w-4/5 h-3 bg-slate-100 rounded"></div>
                 </div>
                 <div className="p-4 bg-white/50 border border-[#4f46e5]/20 rounded-xl shadow-[0_0_15px_rgba(79,70,229,0.1)] relative">
                   <div className="absolute top-4 right-4 px-2 py-1 bg-[#4f46e5]/10 text-[#4f46e5] text-[10px] font-bold rounded uppercase tracking-wider">ADHD Format</div>
                   <div className="w-32 h-5 bg-[#0b1c30] rounded mb-4"></div>
                   <div className="flex items-start gap-3 mb-3">
                     <div className="w-5 h-5 rounded border-2 border-[#4f46e5] flex-shrink-0"></div>
                     <div className="w-full h-4 bg-slate-200 rounded mt-0.5"></div>
                   </div>
                   <div className="flex items-start gap-3">
                     <div className="w-5 h-5 rounded border-2 border-slate-300 flex-shrink-0"></div>
                     <div className="w-3/4 h-4 bg-slate-200 rounded mt-0.5"></div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section id="stories" className="py-16 text-center max-w-4xl mx-auto mb-32">
          <Quote className="w-12 h-12 mx-auto text-[#4f46e5]/30 mb-8" />
          <h2 className="text-[24px] md:text-[32px] font-bold text-[#0b1c30] leading-tight mb-12">
            "The clarity achieved through AbhyasAI is nothing short of crystalline. It stripped away the noise and rebuilt my cognitive endurance from the ground up."
          </h2>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-white border border-white/60 shadow-sm flex items-center justify-center overflow-hidden">
               <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Dr. Elena Rostova" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <div className="font-bold text-[#0b1c30] text-[16px]">Dr. Elena Rostova</div>
              <div className="text-[#464555] text-[14px]">Lead AI Researcher</div>
            </div>
          </div>
        </section>

        {/* Final CTA & WhatsApp Coming Soon */}
        <section className="glass-panel p-12 md:p-16 text-center max-w-4xl mx-auto mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#4f46e5]/10 to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-[32px] md:text-[48px] font-bold text-[#0b1c30] mb-6 tracking-tight">Ready to Elevate Your Mind?</h2>
            <p className="text-[#464555] text-[18px] mb-8 max-w-2xl mx-auto">
              Join thousands of professionals mastering their cognitive abilities with adaptive, real-time AI feedback.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link to="/session/new" className="primary-btn w-full sm:w-auto">
                Start Free Session
              </Link>
              <Link to="/whatsapp" className="glass-button w-full sm:w-auto border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/5">
                Coming Soon to WhatsApp
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/50 bg-white/30 backdrop-blur-sm py-12 px-6 lg:px-12 mt-auto">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-[#4f46e5]" />
            <span className="font-bold text-[#0b1c30] tracking-tight">AbhyasAI</span>
          </div>
          <div className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} AbhyasAI. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-slate-500 font-medium">
            <a href="#" className="hover:text-[#4f46e5] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#4f46e5] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#4f46e5] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
