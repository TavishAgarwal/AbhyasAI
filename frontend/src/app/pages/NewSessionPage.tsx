import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { extractSkills, startSession, generateQuestions, type Skill } from '../../lib/api';
import { Brain, Settings2, Loader2, Target, CheckCircle2 } from 'lucide-react';
import { LoadingState } from '../components/states/LoadingState';

export function NewSessionPage() {
  const navigate = useNavigate();
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'topic' | 'job_role'>('topic');
  const [topicId, setTopicId] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(5);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExtractSkills = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await extractSkills(topic, type);
      setTopicId(data.topicOrRole.id);
      setSkills(data.skills);
    } catch (err: any) {
      setError(err.message || 'Failed to extract skills');
    } finally {
      setLoading(false);
    }
  };

  const handleStartSession = async () => {
    if (!topicId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await generateQuestions(topicId, totalQuestions);
      const questionIds = data.questions.map((q: any) => q.id);
      const sessionData = await startSession(topicId, totalQuestions, questionIds);
      navigate(`/session/${sessionData.session.id}`, {
        state: {
          firstQuestion: sessionData.firstQuestion,
          sessionDetails: sessionData.session,
          topic: topic
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to start session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-[32px] font-bold text-[#0b1c30] mb-4">Start a Practice Session</h1>
        <p className="text-[#464555] text-lg max-w-2xl mx-auto">
          Define your target area, and our AI will build a personalized assessment matrix to test your knowledge gaps.
        </p>
      </div>

      <div className="glass-panel p-8 mb-8">
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xl text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-[#0b1c30] mb-2">
              What do you want to practice?
            </label>
            <input 
              type="text" 
              placeholder={type === 'topic' ? "e.g. Photosynthesis, Thermodynamics, Data Structures..." : "e.g. Senior React Developer, ML Engineer at Google..."}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-[#4f46e5]/20 focus:border-[#4f46e5] outline-none transition-all"
              value={topic}
              onChange={e => setTopic(e.target.value)}
              disabled={loading || skills.length > 0}
            />
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="radio" 
                  checked={type === 'topic'} 
                  onChange={() => setType('topic')} 
                  disabled={loading || skills.length > 0}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-slate-300 rounded-full peer-checked:border-[#4f46e5] transition-colors"></div>
                <div className="w-2.5 h-2.5 bg-[#4f46e5] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[#464555] font-medium group-hover:text-[#0b1c30] transition-colors">Academic Topic</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center">
                <input 
                  type="radio" 
                  checked={type === 'job_role'} 
                  onChange={() => setType('job_role')} 
                  disabled={loading || skills.length > 0}
                  className="peer sr-only"
                />
                <div className="w-5 h-5 border-2 border-slate-300 rounded-full peer-checked:border-[#4f46e5] transition-colors"></div>
                <div className="w-2.5 h-2.5 bg-[#4f46e5] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 transition-opacity"></div>
              </div>
              <span className="text-[#464555] font-medium group-hover:text-[#0b1c30] transition-colors">Job Role</span>
            </label>
          </div>
          
          {skills.length === 0 && (
            <button 
              onClick={handleExtractSkills}
              disabled={loading || !topic.trim()}
              className="primary-btn mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
                </>
              ) : (
                <>
                  <Settings2 className="w-5 h-5" /> Extract Skills matrix
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {skills.length > 0 && (
        <div className="animate-fade-in glass-panel p-8">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-200/50 pb-6">
            <Target className="w-6 h-6 text-[#4f46e5]" />
            <h3 className="text-xl font-bold text-[#0b1c30]">Target Skills to Master</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {skills.map(s => (
              <div key={s.id} className="p-4 rounded-xl bg-white/50 border border-slate-200/50 flex justify-between items-center shadow-sm">
                <span className="font-medium text-[#0b1c30]">{s.name}</span>
                <span className={`text-[12px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                  s.category === 'technical' 
                    ? 'bg-blue-100/50 text-blue-700 border border-blue-200' 
                    : 'bg-emerald-100/50 text-emerald-700 border border-emerald-200'
                }`}>
                  {s.category}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-slate-50/50 p-6 rounded-xl border border-slate-200/50">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <label className="text-sm font-bold text-[#0b1c30] whitespace-nowrap">Session Length:</label>
              <select 
                value={totalQuestions} 
                onChange={e => setTotalQuestions(Number(e.target.value))}
                className="w-full sm:w-auto px-4 py-2 border border-slate-300 rounded-lg outline-none bg-white font-medium text-[#464555]"
                disabled={loading}
              >
                <option value="3">3 Questions (Quick Test)</option>
                <option value="5">5 Questions (Standard)</option>
                <option value="10">10 Questions (Deep Dive)</option>
              </select>
            </div>
            
            <button 
              onClick={handleStartSession}
              disabled={loading}
              className="primary-btn w-full sm:w-auto flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Start Session <CheckCircle2 className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
