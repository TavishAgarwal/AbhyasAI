import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TopBar } from './TopBar';
import { 
  extractSkills, 
  startSession, 
  submitAnswer, 
  generateReport, 
  getReportHTML,
  getReportPdfUrl,
  type Skill, 
  type Question, 
  type AnswerResponse 
} from '../../lib/api';

type Phase = 'setup' | 'session' | 'report';

export function PracticePage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('setup');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Setup State
  const [topic, setTopic] = useState('');
  const [type, setType] = useState<'topic' | 'job_role'>('topic');
  const [topicId, setTopicId] = useState<string | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [totalQuestions, setTotalQuestions] = useState(5);

  // Session State
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [answerText, setAnswerText] = useState('');
  const [lastFeedback, setLastFeedback] = useState<AnswerResponse | null>(null);
  const [qIndex, setQIndex] = useState(0);

  // Report State
  const [reportFormat, setReportFormat] = useState<'standard' | 'dyslexia' | 'adhd'>('standard');
  const [reportHTML, setReportHTML] = useState('');

  // --------------------------------------------------------
  // Phase 1: Extract Skills
  // --------------------------------------------------------
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

  // --------------------------------------------------------
  // Phase 2: Start & Run Session
  // --------------------------------------------------------
  const handleStartSession = async () => {
    if (!topicId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await startSession(topicId, totalQuestions);
      setSessionId(data.session.id);
      setCurrentQuestion(data.firstQuestion);
      setQIndex(1);
      setPhase('session');
    } catch (err: any) {
      setError(err.message || 'Failed to start session');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!sessionId || !answerText.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const data = await submitAnswer(sessionId, answerText);
      setLastFeedback(data);
      setAnswerText('');
      
      if (data.sessionComplete) {
        await handleGenerateReport(sessionId);
      } else {
        setCurrentQuestion(data.nextQuestion);
        setQIndex(prev => prev + 1);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit answer');
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------------
  // Phase 3: Reports
  // --------------------------------------------------------
  const handleGenerateReport = async (sid: string) => {
    setLoading(true);
    setError(null);
    try {
      await generateReport(sid);
      await loadReportView(sid, reportFormat);
      setPhase('report');
    } catch (err: any) {
      setError(err.message || 'Failed to generate report');
    } finally {
      setLoading(false);
    }
  };

  const loadReportView = async (sid: string, format: 'standard' | 'dyslexia' | 'adhd') => {
    try {
      const html = await getReportHTML(sid, format);
      setReportHTML(html);
    } catch (err: any) {
      console.error(err);
      setError('Could not load report view');
    }
  };

  useEffect(() => {
    if (phase === 'report' && sessionId) {
      loadReportView(sessionId, reportFormat);
    }
  }, [reportFormat]);


  // --------------------------------------------------------
  // Renders
  // --------------------------------------------------------
  const renderSetup = () => (
    <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Start a Practice Session</h2>
      
      <div className="flex flex-col gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">What do you want to practice?</label>
          <input 
            type="text" 
            placeholder="e.g. Frontend Developer, Operating Systems, Leadership..."
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            disabled={loading || skills.length > 0}
          />
        </div>
        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={type === 'topic'} onChange={() => setType('topic')} disabled={loading || skills.length > 0} />
            <span>Academic Topic</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="radio" checked={type === 'job_role'} onChange={() => setType('job_role')} disabled={loading || skills.length > 0} />
            <span>Job Role</span>
          </label>
        </div>
        
        {skills.length === 0 && (
          <button 
            onClick={handleExtractSkills}
            disabled={loading || !topic.trim()}
            className="mt-2 w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Analyzing...' : 'Extract Skills'}
          </button>
        )}
      </div>

      {skills.length > 0 && (
        <div className="animate-fade-in">
          <h3 className="text-lg font-semibold text-slate-800 mb-4 border-t pt-6">Skills to Master</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {skills.map(s => (
              <div key={s.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex justify-between items-center">
                <span className="font-medium text-slate-700">{s.name}</span>
                <span className={\`text-xs px-2 py-1 rounded-full \${s.category === 'technical' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}\`}>
                  {s.category}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4 border-t pt-6">
            <label className="text-sm font-medium text-slate-700">Number of Questions:</label>
            <select 
              value={totalQuestions} 
              onChange={e => setTotalQuestions(Number(e.target.value))}
              className="px-3 py-2 border border-slate-300 rounded-lg outline-none"
            >
              <option value="3">3 (Quick Test)</option>
              <option value="5">5 (Standard)</option>
              <option value="10">10 (Deep Dive)</option>
            </select>
            
            <button 
              onClick={handleStartSession}
              disabled={loading}
              className="ml-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Starting...' : 'Start Session →'}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderSession = () => (
    <div className="max-w-4xl mx-auto mt-8 flex flex-col gap-6">
      
      {/* Top Status Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex justify-between items-center">
        <span className="font-semibold text-slate-700">Question {qIndex} of {totalQuestions}</span>
        <span className="text-sm text-slate-500">{topic}</span>
      </div>

      {/* AI Feedback (from previous answer) */}
      {lastFeedback && (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl animate-fade-in">
          <h3 className="text-emerald-800 font-bold mb-4 flex items-center gap-2">
            <span>✨ AI Evaluation</span>
            <span className="ml-auto bg-emerald-200 text-emerald-900 px-3 py-1 rounded-full text-sm">
              Score: {lastFeedback.evaluation.score} / 1.0
            </span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-emerald-800 mb-2">Strengths</h4>
              <ul className="list-disc pl-5 text-emerald-700 text-sm space-y-1">
                {lastFeedback.evaluation.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-amber-700 mb-2">Gaps</h4>
              <ul className="list-disc pl-5 text-amber-700 text-sm space-y-1">
                {lastFeedback.evaluation.gaps.map((g, i) => <li key={i}>{g}</li>)}
              </ul>
            </div>
          </div>

          <div className="border-t border-emerald-200 pt-4">
            <h4 className="font-semibold text-slate-700 mb-3 text-sm uppercase tracking-wider">Elo Rating Updates</h4>
            <div className="flex flex-wrap gap-3">
              {lastFeedback.eloUpdates.map((elo, i) => (
                <div key={i} className="bg-white px-3 py-2 rounded-lg border shadow-sm flex items-center gap-3 text-sm">
                  <span className="font-medium text-slate-700">{elo.skillName}</span>
                  <span className="text-slate-400">{Math.round(elo.oldRating)}</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-bold text-slate-800">{Math.round(elo.newRating)}</span>
                  <span className={\`font-bold \${elo.delta >= 0 ? 'text-emerald-600' : 'text-rose-600'}\`}>
                    {elo.delta >= 0 ? '+' : ''}{Math.round(elo.delta)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Current Question */}
      {currentQuestion && (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 animate-slide-up">
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold mb-4 uppercase tracking-wider">
            {currentQuestion.question_type} Question
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-6 leading-relaxed">
            {currentQuestion.question_text}
          </h2>
          
          <textarea
            value={answerText}
            onChange={e => setAnswerText(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full h-48 p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none mb-6 text-slate-700 leading-relaxed"
            disabled={loading}
          />
          
          <div className="flex justify-end">
            <button
              onClick={handleSubmitAnswer}
              disabled={loading || !answerText.trim()}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Evaluating...' : 'Submit Answer'}
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderReport = () => (
    <div className="max-w-5xl mx-auto mt-8 flex gap-8">
      {/* Sidebar Controls */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="font-bold text-slate-800 mb-4">Report Format</h3>
          <div className="flex flex-col gap-3">
            {[
              { id: 'standard', label: 'Standard' },
              { id: 'dyslexia', label: 'Dyslexia-friendly' },
              { id: 'adhd', label: 'ADHD-friendly' }
            ].map(f => (
              <label key={f.id} className={\`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors \${reportFormat === f.id ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}\`}>
                <input 
                  type="radio" 
                  name="format" 
                  checked={reportFormat === f.id}
                  onChange={() => setReportFormat(f.id as any)}
                  className="hidden"
                />
                <span className={\`font-medium \${reportFormat === f.id ? 'text-blue-700' : 'text-slate-600'}\`}>{f.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <a 
          href={getReportPdfUrl(sessionId!, reportFormat)}
          download
          className="w-full px-4 py-3 bg-slate-800 text-white text-center rounded-xl font-medium hover:bg-slate-900 transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </a>
        
        <button 
          onClick={() => {
            setPhase('setup');
            setTopic('');
            setSkills([]);
            setSessionId(null);
            setCurrentQuestion(null);
            setLastFeedback(null);
            setReportHTML('');
          }}
          className="text-slate-500 hover:text-slate-800 font-medium text-sm text-center"
        >
          Start New Session
        </button>
      </div>

      {/* Main HTML View */}
      <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between">
          <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">HTML Preview</span>
        </div>
        <div 
          className="p-8 min-h-[600px]"
          dangerouslySetInnerHTML={{ __html: reportHTML }} 
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />
      
      {error && (
        <div className="bg-rose-50 border-b border-rose-200 p-4 text-center text-rose-600">
          {error}
        </div>
      )}

      <main className="flex-1 p-6 md:p-8">
        {phase === 'setup' && renderSetup()}
        {phase === 'session' && renderSession()}
        {phase === 'report' && renderReport()}
      </main>
    </div>
  );
}
