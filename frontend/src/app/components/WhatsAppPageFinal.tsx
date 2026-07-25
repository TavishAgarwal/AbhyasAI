import { SimpleNavbar } from './SimpleNavbar';
import {
  MessageCircle, Check, Smartphone, Zap, Globe, QrCode, Send, Copy
} from 'lucide-react';

export function WhatsAppPageFinal() {
  const phoneNumber = '+91 XXXXX XXXXX';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7FAFC] to-white flex flex-col">
      <SimpleNavbar />

      {/* Main Content */}
      <main className="flex-1 py-12 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#25D366] to-[#128C7E] mb-6 shadow-lg shadow-green-500/30">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-[#2B3440] mb-4">WhatsApp Bot</h2>
            <p className="text-xl text-[#718096] max-w-2xl mx-auto">
              No app download. No login. Works on any phone with WhatsApp. Practice interviews in 20 seconds.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Phone Mockup */}
            <div>
              <h3 className="text-xl font-bold text-[#2B3440] mb-6">See it in action</h3>
              <div className="max-w-sm mx-auto">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
                  {/* Phone Top Bar */}
                  <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2D9B87] to-[#52B788] flex items-center justify-center">
                        <span className="text-white font-bold text-xs">S</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">AbhyasAI Bot</div>
                      <div className="text-xs opacity-75">Online</div>
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="bg-[#E5DDD5] p-4 space-y-3 h-[500px] overflow-y-auto" style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23E5DDD5\'/%3E%3Cpath d=\'M20 10h60v1H20zM15 30h70v1H15zM25 50h50v1H25z\' opacity=\'.05\' fill=\'%23000\'/%3E%3C/svg%3E")',
                  }}>
                    {/* Teacher Message */}
                    <div className="flex justify-end">
                      <div className="bg-[#DCF8C6] rounded-xl px-4 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-[#2B3440]">5 science 2 dyslexia</p>
                        <p className="text-xs text-[#718096] text-right mt-1">10:23 AM</p>
                      </div>
                    </div>

                    {/* Bot Reply 1 */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-xl px-4 py-3 max-w-[85%] shadow-sm">
                        <p className="text-sm text-[#4A5568] mb-1">Preparing your interview session...</p>
                        <p className="text-sm font-medium mb-1">
                          <span className="text-[#2D9B87]">Class 5</span> ·
                          <span className="text-[#2D9B87]"> Science</span> ·
                          <span className="text-[#2D9B87]"> Topic</span>
                        </p>
                        <p className="text-sm text-[#718096]">This takes about 20 seconds ⏳</p>
                        <p className="text-xs text-[#718096] text-right mt-2">10:23 AM</p>
                      </div>
                    </div>

                    {/* Bot Reply 2 - PDF */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-xl px-4 py-3 max-w-[85%] shadow-sm">
                        <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-100">
                          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-xs">PDF</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-[#2B3440] truncate">Interview_Session_Dyslexia.pdf</p>
                            <p className="text-xs text-[#718096]">245 KB</p>
                          </div>
                        </div>
                        <p className="text-sm text-[#2B3440] mb-2 font-medium">Your session summary is ready! ✨</p>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium">✓ Shorter sentences</span>
                          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium">✓ Wider spacing</span>
                          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-medium">✓ Syllable guides</span>
                        </div>
                        <p className="text-xs text-[#718096] mb-2">Reply 'New' for another session</p>
                        <p className="text-xs text-[#718096] text-right">10:24 AM</p>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="bg-[#F0F0F0] px-4 py-3 flex items-center gap-2">
                    <div className="flex-1 bg-white rounded-full px-4 py-2.5">
                      <input
                        type="text"
                        placeholder="Type a message"
                        className="w-full outline-none text-sm"
                        disabled
                      />
                    </div>
                    <button className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center hover:bg-[#128C7E] transition-colors">
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Use */}
            <div>
              <h3 className="text-xl font-bold text-[#2B3440] mb-6">How to get started</h3>

              <div className="space-y-6 mb-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D9B87] to-[#52B788] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">1</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#2B3440] mb-2">Save our WhatsApp number</h4>
                    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-[#25D366]" />
                        <span className="font-mono text-lg text-[#2B3440] font-semibold">{phoneNumber}</span>
                      </div>
                      <button className="p-2 hover:bg-[#F7FAFC] rounded-lg transition-colors">
                        <Copy className="w-4 h-4 text-[#718096]" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F58B4C] to-[#F4A261] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">2</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#2B3440] mb-2">Send your request</h4>
                    <p className="text-sm text-[#718096] mb-3">Format: topic goal</p>
                    <div className="bg-[#DCF8C6] border border-green-200 rounded-xl px-4 py-3">
                      <code className="text-sm text-[#2B3440] font-mono">"5 science 2 dyslexia"</code>
                    </div>
                    <p className="text-xs text-[#718096] mt-2">
                      Example: "6 math 3 standard" or "7 hindi 1 adhd"
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4A90B5] to-[#52B788] flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-lg">3</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-[#2B3440] mb-2">Receive your PDF instantly</h4>
                    <p className="text-sm text-[#718096] mb-3">Get your adapted PDF in ~20 seconds. Works for NCERT and all state board textbooks.</p>
                    <div className="flex items-center gap-2 text-sm text-green-700">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Download and print immediately</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-2xl p-6 border border-[#E2E8F0] text-center">
                <h4 className="font-semibold text-[#2B3440] mb-4">Or scan QR code to chat</h4>
                <div className="w-56 h-56 bg-gradient-to-br from-teal-50 to-green-50 rounded-2xl border-2 border-[#E2E8F0] mx-auto flex items-center justify-center shadow-sm">
                  <div className="text-center">
                    <QrCode className="w-20 h-20 text-[#2D9B87] mx-auto mb-3" />
                    <p className="text-sm text-[#718096]">Scan with WhatsApp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-white rounded-2xl p-8 lg:p-12 border border-[#E2E8F0]">
            <h3 className="text-2xl font-bold text-[#2B3440] mb-8 text-center">Why use WhatsApp Bot?</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-[#2B3440] mb-2">Works on 2G</h4>
                <p className="text-sm text-[#718096]">No high-speed internet needed. Perfect for rural areas.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="font-semibold text-[#2B3440] mb-2">Basic Phone Support</h4>
                <p className="text-sm text-[#718096]">Works on any phone with WhatsApp, even feature phones.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="font-semibold text-[#2B3440] mb-2">Hindi & English</h4>
                <p className="text-sm text-[#718096]">Get coaching in your preferred language.</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="font-semibold text-[#2B3440] mb-2">Free Forever</h4>
                <p className="text-sm text-[#718096]">No charges, no limits, no hidden costs.</p>
              </div>
            </div>
          </div>

          {/* Command Examples */}
          <div className="mt-12 bg-gradient-to-br from-[#E6F7F4] to-white rounded-2xl p-8 border border-[#2D9B87]/20">
            <h3 className="text-xl font-bold text-[#2B3440] mb-6">Example Commands</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                <code className="text-sm text-[#2D9B87] font-mono">"5 science 2 standard"</code>
                <p className="text-xs text-[#718096] mt-2">Topic, Goal, Standard version</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                <code className="text-sm text-[#2D9B87] font-mono">"6 math 1 dyslexia"</code>
                <p className="text-xs text-[#718096] mt-2">Topic, Goal, Dyslexia-friendly</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-[#E2E8F0]">
                <code className="text-sm text-[#2D9B87] font-mono">"7 hindi 4 adhd"</code>
                <p className="text-xs text-[#718096] mt-2">Topic, Goal, ADHD version</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
