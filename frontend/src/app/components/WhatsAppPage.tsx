import { Navbar } from './Navbar';
import { MessageCircle, Check, Smartphone, Zap, Globe } from 'lucide-react';

export function WhatsAppPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 lg:px-12 py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#1A1A2E]">AbhyasAI on WhatsApp</h1>
          </div>
          <p className="text-lg text-[#888899]">No app. No login. Just send a message.</p>
        </div>

        {/* WhatsApp Mockup */}
        <div className="max-w-md mx-auto mb-16">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
            {/* Phone Top Bar */}
            <div className="bg-[#075E54] text-white px-4 py-3 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <span className="text-[#075E54] font-bold text-sm">S</span>
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">AbhyasAI Bot</div>
                <div className="text-xs opacity-75">Online</div>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="bg-[#E5DDD5] p-4 space-y-3" style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h100v100H0z\' fill=\'%23E5DDD5\'/%3E%3Cpath d=\'M20 10h60v1H20zM15 30h70v1H15zM25 50h50v1H25z\' opacity=\'.05\' fill=\'%23000\'/%3E%3C/svg%3E")',
            }}>
              {/* Teacher Message */}
              <div className="flex justify-end">
                <div className="bg-[#DCF8C6] rounded-lg px-4 py-2 max-w-[80%] shadow">
                  <p className="text-sm text-[#1A1A2E]">5 science 3 dyslexia</p>
                  <p className="text-xs text-[#888899] text-right mt-1">10:23 AM</p>
                </div>
              </div>

              {/* Bot Reply 1 */}
              <div className="flex justify-start">
                <div className="bg-white rounded-lg px-4 py-2 max-w-[85%] shadow">
                  <p className="text-sm text-[#444455] mb-1">Preparing your interview session...</p>
                  <p className="text-sm text-[#1B5E8B] font-medium mb-1">Topic · Goal</p>
                  <p className="text-sm text-[#888899]">This takes about 20 seconds ⏳</p>
                  <p className="text-xs text-[#888899] text-right mt-2">10:23 AM</p>
                </div>
              </div>

              {/* Bot Reply 2 - PDF */}
              <div className="flex justify-start">
                <div className="bg-white rounded-lg px-4 py-3 max-w-[85%] shadow">
                  <div className="flex items-center gap-3 mb-2 pb-2 border-b border-gray-200">
                    <div className="w-10 h-10 bg-red-100 rounded flex items-center justify-center">
                      <span className="text-red-600 font-bold text-xs">PDF</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-[#1A1A2E]">AbhyasAI_Interview_Session.pdf</p>
                      <p className="text-xs text-[#888899]">245 KB</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#444455] mb-2">Your session summary is ready!</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-xs bg-[#E8F4FD] text-[#1B5E8B] px-2 py-1 rounded">✓ Shorter sentences</span>
                    <span className="text-xs bg-[#E8F4FD] text-[#1B5E8B] px-2 py-1 rounded">✓ Wider spacing</span>
                    <span className="text-xs bg-[#E8F4FD] text-[#1B5E8B] px-2 py-1 rounded">✓ Syllable guides</span>
                  </div>
                  <p className="text-sm text-[#888899]">Reply 'New' for another session</p>
                  <p className="text-xs text-[#888899] text-right mt-2">10:24 AM</p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-[#F0F0F0] px-4 py-3 flex items-center gap-2">
              <div className="flex-1 bg-white rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Type a message"
                  className="w-full outline-none text-sm"
                  disabled
                />
              </div>
              <button className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* How to Use Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#E8F4FD] flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-[#1B5E8B]">1</span>
            </div>
            <h3 className="font-bold text-base text-[#1A1A2E] mb-2">Save our number</h3>
            <p className="text-sm text-[#888899] mb-3">+91 98765 43210</p>
            <div className="w-32 h-32 bg-white rounded-lg border border-[#D0D8E4] mx-auto flex items-center justify-center">
              <div className="text-xs text-[#888899]">QR Code</div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#FEF5EC] flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-[#E67E22]">2</span>
            </div>
            <h3 className="font-bold text-base text-[#1A1A2E] mb-2">Send your request</h3>
            <p className="text-sm text-[#888899]">Format: topic, goal</p>
            <div className="mt-3 bg-[#DCF8C6] rounded-lg px-4 py-2 text-sm text-[#1A1A2E] inline-block">
              "5 science 3 dyslexia"
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-[#EAF5EA] flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-[#1E7E34]">3</span>
            </div>
            <h3 className="font-bold text-base text-[#1A1A2E] mb-2">Receive your PDF</h3>
            <p className="text-sm text-[#888899]">Get your coaching response in ~20 seconds</p>
            <div className="mt-3 flex items-center justify-center gap-2">
              <Check className="w-5 h-5 text-[#1E7E34]" />
              <span className="text-sm font-medium text-[#1E7E34]">Instant delivery</span>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="text-center mb-12">
          <p className="text-base font-medium text-[#444455] mb-4">Or scan to start chatting</p>
          <div className="w-48 h-48 bg-white rounded-2xl border-2 border-[#D0D8E4] mx-auto flex items-center justify-center shadow-lg">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 text-[#25D366] mx-auto mb-2" />
              <p className="text-sm text-[#888899]">WhatsApp QR</p>
            </div>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="px-4 py-2 bg-white border border-[#D0D8E4] rounded-full flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#E67E22]" />
            <span className="text-sm text-[#444455]">Works on 2G</span>
          </div>
          <div className="px-4 py-2 bg-white border border-[#D0D8E4] rounded-full flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-[#1B5E8B]" />
            <span className="text-sm text-[#444455]">No smartphone needed</span>
          </div>
          <div className="px-4 py-2 bg-white border border-[#D0D8E4] rounded-full flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#1E7E34]" />
            <span className="text-sm text-[#444455]">Hindi & English</span>
          </div>
          <div className="px-4 py-2 bg-white border border-[#D0D8E4] rounded-full flex items-center gap-2">
            <span className="text-sm font-medium text-[#E67E22]">Free forever</span>
          </div>
        </div>
      </div>
    </div>
  );
}
