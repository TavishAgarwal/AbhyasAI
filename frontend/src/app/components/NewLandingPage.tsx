import { SimpleNavbar } from './SimpleNavbar';
import {
  BookOpen,
  Camera,
  MessageCircle,
  Sparkles,
  Heart,
  Users,
  Globe,
  Zap,
  CheckCircle,
  ArrowRight,
  Download,
  Clock
} from 'lucide-react';
import { Link } from 'react-router';

export function NewLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-white">
      <SimpleNavbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E6F7F4] rounded-full mb-6">
              <Heart className="w-4 h-4 text-[#2D9B87]" />
              <span className="text-sm font-medium text-[#2D9B87]">Free for all government school teachers</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2B3440] mb-6 leading-tight">
              Every child deserves content that fits how they learn
            </h1>

            <p className="text-base lg:text-lg text-[#4A5568] mb-8 leading-relaxed">
              AbhyasAI provides interactive study and interview coaching for everyone. Instant, accessible, and always free.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link
                to="/generate"
                className="px-8 py-4 bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white rounded-xl hover:shadow-lg hover:shadow-teal-500/30 transition-all font-medium text-center flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Start Coaching
              </Link>
              <Link
                to="/whatsapp"
                className="px-8 py-4 border-2 border-[#2D9B87] text-[#2D9B87] rounded-xl hover:bg-[#E6F7F4] transition-all font-medium text-center flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Try WhatsApp Bot
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-[#718096]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#52B788]" />
                <span>No account needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#52B788]" />
                <span>No training required</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E6F7F4] to-[#FFF4ED] rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-[#E2E8F0]">
              <div className="grid grid-cols-3 gap-4">
                <Link to="/practice" className="px-5 py-2 text-slate-600 hover:text-slate-900 transition-colors font-medium">Practice</Link>
                <Link to="/generate" className="px-5 py-2 text-slate-600 hover:text-slate-900 transition-colors font-medium">Generate</Link>
                <div className="relative group">
                  <span className="px-5 py-2 text-slate-400 font-medium cursor-not-allowed">WhatsApp AI</span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Coming Soon</div>
                </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-blue-400 rounded w-full"></div>
                    <div className="h-2 bg-blue-300 rounded w-5/6"></div>
                    <div className="h-2 bg-blue-200 rounded w-4/6"></div>
                  </div>
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
                  <div className="text-xs font-bold text-teal-700 mb-3">DYSLEXIA</div>
                  <div className="space-y-3">
                    <div className="h-2 bg-teal-400 rounded w-full"></div>
                    <div className="h-2 bg-teal-300 rounded w-4/6"></div>
                    <div className="h-2 bg-teal-200 rounded w-5/6"></div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <div className="text-xs font-bold text-orange-700 mb-3">ADHD</div>
                  <div className="space-y-2">
                    <div className="h-2 bg-orange-400 rounded w-full"></div>
                    <div className="h-2 bg-orange-300 rounded w-5/6"></div>
                    <div className="h-2 bg-orange-200 rounded w-3/6"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-100 to-red-200 flex items-center justify-center">
                <Users className="w-7 h-7 text-red-600" />
              </div>
              <div className="text-4xl font-bold text-[#2B3440]">8.2M</div>
            </div>
            <div className="text-base font-semibold text-[#2B3440] mb-1">Children with learning disabilities in India</div>
            <div className="text-sm text-[#718096]">Receiving zero adapted content</div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center">
                <Clock className="w-7 h-7 text-teal-600" />
              </div>
              <div className="text-4xl font-bold text-[#2B3440]">20s</div>
            </div>
            <div className="text-base font-semibold text-[#2B3440] mb-1">To generate all three versions</div>
            <div className="text-sm text-[#718096]">For any chapter, any subject</div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                <CheckCircle className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-[#2B3440]">₹0</div>
            </div>
            <div className="text-base font-semibold text-[#2B3440] mb-1">Cost for government school teachers</div>
            <div className="text-sm text-[#718096]">Always free, no signup required</div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-6 lg:px-12 py-16 scroll-mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#2B3440] mb-4">How it Works</h2>
          <p className="text-lg text-[#718096] max-w-2xl mx-auto">
            Three simple steps to create accessible learning materials
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D9B87] to-[#52B788] text-white flex items-center justify-center font-bold text-xl mb-6">
                1
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#E6F7F4] flex items-center justify-center mb-6">
                <BookOpen className="w-8 h-8 text-[#2D9B87]" />
              </div>
              <h3 className="text-xl font-bold text-[#2B3440] mb-3">Choose Content</h3>
              <p className="text-[#718096] leading-relaxed">
                Select from NCERT library (Classes 1-8) or upload your own textbook pages via PDF or camera
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D9B87] to-[#52B788] text-white flex items-center justify-center font-bold text-xl mb-6">
                2
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#E6F7F4] flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8 text-[#2D9B87]" />
              </div>
              <h3 className="text-xl font-bold text-[#2B3440] mb-3">Generate Versions</h3>
              <p className="text-[#718096] leading-relaxed">
                Click Generate — AI creates all three versions in parallel in ~20 seconds
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A90B5] to-[#52B788] text-white flex items-center justify-center font-bold text-xl mb-6">
                3
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#E8F3F9] flex items-center justify-center mb-6">
                <Download className="w-8 h-8 text-[#4A90B5]" />
              </div>
              <h3 className="text-xl font-bold text-[#2B3440] mb-3">Download & Share</h3>
              <p className="text-[#718096] leading-relaxed">
                Download as PDF or DOCX, print for your students, or share directly via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gradient-to-b from-[#E6F7F4] to-white py-16 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#2B3440] mb-4">Why Users Love AbhyasAI</h2>
            <p className="text-lg text-[#718096] max-w-2xl mx-auto">
              Built specifically for Indian government schools with accessibility at the core
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BookOpen className="w-6 h-6" />}
              title="NCERT Library Built In"
              description="Access all chapters from Classes 1-8 without uploading anything. Covers current NCERT syllabus across all core subjects."
              color="teal"
            />
            <FeatureCard
              icon={<Camera className="w-6 h-6" />}
              title="Camera Upload"
              description="Photograph any state board textbook page. Our AI reads and adapts it instantly."
              color="orange"
            />
            <FeatureCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="WhatsApp Bot"
              description="Practice interviews and study on any phone with WhatsApp. No app download, no login, no browser needed."
              color="green"
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="Multiple Languages"
              description="Currently supports English and Hindi. Tamil, Telugu, and more languages coming soon. Output language matches your selection throughout the entire session."
              color="blue"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Lightning Fast"
              description="GPT-4o generates all three versions simultaneously in ~20 seconds — Standard, Dyslexia-friendly, and ADHD-adapted in one click."
              color="teal"
            />
            <FeatureCard
              icon={<Heart className="w-6 h-6" />}
              title="Always Free"
              description="No hidden costs, no premium features. Every feature is free forever for all teachers."
              color="orange"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="bg-gradient-to-r from-[#2D9B87] to-[#52B788] rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Ready to Start Your Coaching?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join users across India already using AbhyasAI — free, forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link to="/practice" className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 transition-all active:scale-95 text-lg">
                  Start Adaptive Practice <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/generate" className="inline-flex items-center justify-center px-8 py-4 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-medium hover:border-slate-300 hover:bg-slate-50 transition-colors active:scale-95 text-lg">
                  Generate Worksheets
                </Link>
          </div>
          <p className="text-sm opacity-70">
            Aligned with NEP 2020 · RPwD Act 2016 · Right to Education Act
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2B3440] text-white py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D9B87] to-[#52B788] flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg">AbhyasAI</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">Making education accessible for every child</p>
          <p className="text-gray-500 text-xs">© 2026 AbhyasAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  color
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'teal' | 'orange' | 'green' | 'blue';
}) {
  const colorClasses = {
    teal: 'bg-teal-100 text-teal-600',
    orange: 'bg-orange-100 text-orange-600',
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600'
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#2B3440] mb-2">{title}</h3>
      <p className="text-[#718096] text-sm leading-relaxed">{description}</p>
    </div>
  );
}
