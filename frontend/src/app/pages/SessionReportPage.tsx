import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getSession, generateReport, getReportHTML, getReportPdfUrl, getReportDocxUrl, generateQuestions, startSession } from '../../lib/api';
import { Download, RefreshCcw, Loader2, FileText, ChevronDown, ChevronUp, BookOpen, BarChart3, CheckCircle2, AlertCircle } from 'lucide-react';
import { ErrorState } from '../components/states/ErrorState';
import { LoadingState } from '../components/states/LoadingState';

export function SessionReportPage() {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sessionData, setSessionData] = useState<any>(null);

  // Phase 2: Summary
  const [showSummary, setShowSummary] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [reportFormat, setReportFormat] = useState<'standard' | 'dyslexia' | 'adhd'>('standard');
  const [reportHTML, setReportHTML] = useState('');

  // Phase 4: Retry Session
  const [retryLoading, setRetryLoading] = useState(false);

  useEffect(() => {
    if (!sessionId) return;
    const initSession = async () => {
      try {
        const data = await getSession(sessionId);
        setSessionData(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load session results');
      } finally {
        setLoading(false);
      }
    };
    initSession();
  }, [sessionId]);

  const handleRetrySession = async () => {
    if (!sessionId || !sessionData) return;
    setRetryLoading(true);
    try {
      // 1. Compute average score from existing answers
      const validAnswers = sessionData.answers.filter((a: any) => typeof a.score === 'number');
      const avgScore = validAnswers.length > 0 
        ? validAnswers.reduce((sum: number, a: any) => sum + a.score, 0) / validAnswers.length 
        : 0;
      
      // 2. Collect previous question texts for deduplication
      const prevQuestions = sessionData.answers.map((a: any) => a.questionText);
      
      // 3. Generate new adaptive questions
      const { topicOrRoleId, totalQuestions } = sessionData.session;
      const data = await generateQuestions(topicOrRoleId, totalQuestions, avgScore, prevQuestions);
      const questionIds = data.questions.map((q: any) => q.id);
      
      // 4. Start new session on the same topic
      const newSession = await startSession(topicOrRoleId, totalQuestions, questionIds);
      
      // 5. Navigate to practice
      navigate(`/session/${newSession.session.id}`, {
        state: {
          firstQuestion: newSession.firstQuestion,
          sessionDetails: newSession.session,
          topic: sessionData.session.topicName || 'Practice Session',
        }
      });
    } catch (err: any) {
      setError(err.message || 'Failed to start retry session');
    } finally {
      setRetryLoading(false);
    }
  };

  const handleGenerateSummary = async () => {
    if (showSummary) {
      setShowSummary(false);
      return;
    }
    
    setShowSummary(true);
    if (!reportHTML && sessionId) {
      setSummaryLoading(true);
      try {
        await generateReport(sessionId);
        const html = await getReportHTML(sessionId, reportFormat);
        setReportHTML(html);
      } catch (err: any) {
        console.error(err);
      } finally {
        setSummaryLoading(false);
      }
    }
  };

  const handleReportFormatChange = async (newFormat: 'standard' | 'dyslexia' | 'adhd') => {
    setReportFormat(newFormat);
    if (sessionId && showSummary) {
      setSummaryLoading(true);
      try {
        const html = await getReportHTML(sessionId, newFormat);
        setReportHTML(html);
      } catch (err) {
        console.error(err);
      } finally {
        setSummaryLoading(false);
      }
    }
  };

  if (error) {
    return <ErrorState message={error} actionText="Back to Home" actionHref="/" />;
  }

  if (loading) {
    return <LoadingState fullScreen message="Loading your interview results..." />;
  }

  if (!sessionData) return null;

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-[#0b1c30] mb-2">
          {sessionData.session.type === 'topic' ? 'Study Results' : 'Interview Results'}
        </h1>
        <p className="text-[#464555]">
          {sessionData.session.type === 'topic' ? 'Review your answers and academic feedback' : 'Review your answers and personalized feedback'}
        </p>
      </div>

      {/* Phase 1: Question Review */}
      <div className="flex flex-col gap-8">
        {sessionData.answers?.map((ans: any, idx: number) => {
          let evalColors = {
            bg: 'bg-emerald-50/50',
            border: 'border-emerald-100',
            borderB: 'border-emerald-100/50',
            text: 'text-emerald-900',
            scoreText: 'text-emerald-700',
            strengthsText: 'text-emerald-800',
            strengthsList: 'text-emerald-700',
            strengthsBullet: 'text-emerald-400'
          };
          
          if (ans.evaluation?.score < 0.3) {
            evalColors = {
              bg: 'bg-red-50/50',
              border: 'border-red-100',
              borderB: 'border-red-100/50',
              text: 'text-red-900',
              scoreText: 'text-red-700',
              strengthsText: 'text-red-800',
              strengthsList: 'text-red-700',
              strengthsBullet: 'text-red-400'
            };
          } else if (ans.evaluation?.score < 0.7) {
            evalColors = {
              bg: 'bg-yellow-50/50',
              border: 'border-yellow-200',
              borderB: 'border-yellow-200/50',
              text: 'text-yellow-900',
              scoreText: 'text-yellow-800',
              strengthsText: 'text-yellow-900',
              strengthsList: 'text-yellow-800',
              strengthsBullet: 'text-yellow-500'
            };
          }

          return (
          <div key={idx} className="glass-panel p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#0b1c30] text-white px-3 py-1 rounded-full text-xs font-bold">
                Q{ans.question_index + 1}
              </span>
              <span className="text-[#4f46e5] text-xs font-bold uppercase tracking-wider bg-[#4f46e5]/10 px-3 py-1 rounded-full">
                {ans.questionType || 'General'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-[#0b1c30] mb-6">
              {ans.questionText}
            </h3>

            <div className="bg-white/60 border border-slate-200/60 rounded-xl p-5 mb-6 relative">
              <div className="absolute -top-3 left-4 bg-[#f8fafc] px-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
                Your Answer
              </div>
              <p className="text-[#0b1c30] leading-relaxed whitespace-pre-wrap mt-2">
                {ans.answer_text}
              </p>
            </div>

            {ans.evaluation && (
              <div className={`${evalColors.bg} border ${evalColors.border} rounded-xl p-6`}>
                <div className={`flex items-center justify-between mb-4 border-b ${evalColors.borderB} pb-4`}>
                  <h4 className={`font-bold ${evalColors.text} flex items-center gap-2`}>
                    <span>✨</span> AI Evaluation
                  </h4>
                  <span className={`bg-white px-3 py-1 rounded-full text-sm font-bold ${evalColors.scoreText} shadow-sm`}>
                    Score: {ans.evaluation.score} / 1.0
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className={`font-semibold ${evalColors.strengthsText} mb-3 flex items-center gap-2`}>
                      <CheckCircle2 className="w-4 h-4" /> Strengths
                    </h5>
                    <ul className="space-y-2">
                      {ans.evaluation.strengths?.map((s: string, i: number) => (
                        <li key={i} className={`text-sm ${evalColors.strengthsList} flex items-start gap-2`}>
                          <span className={`${evalColors.strengthsBullet} mt-0.5`}>•</span>
                          <span className="leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" /> Areas for Improvement
                    </h5>
                    <ul className="space-y-2">
                      {ans.evaluation.gaps?.map((g: string, i: number) => (
                        <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span className="leading-relaxed">{g}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )})}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-4 mb-12">
        <button 
          onClick={handleGenerateSummary}
          className="flex-1 py-4 px-6 bg-white border-2 border-[#0b1c30] text-[#0b1c30] rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <BarChart3 className="w-5 h-5" />
          {showSummary ? 'Hide Full Summary' : 'Generate Full Summary'}
        </button>
        
      </div>

      {/* Phase 2: Full Summary */}
      {showSummary && (
        <div className="animate-fade-in border-t-2 border-slate-200/60 pt-12 mb-12 flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-6">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <h4 className="font-semibold text-slate-800 mb-3 text-sm uppercase tracking-wider">Report Format</h4>
              <div className="space-y-2">
                {[
                  { id: 'standard', label: 'Standard' },
                  { id: 'dyslexia', label: 'Dyslexia Friendly' },
                  { id: 'adhd', label: 'ADHD / Dyscalculia' }
                ].map(fmt => (
                  <label key={fmt.id} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                    <input 
                      type="radio" 
                      name="reportFormat" 
                      value={fmt.id}
                      checked={reportFormat === fmt.id}
                      onChange={() => handleReportFormatChange(fmt.id as any)}
                      className="text-[#4f46e5] focus:ring-[#4f46e5] w-4 h-4"
                    />
                    <span className="text-sm font-medium text-slate-700">{fmt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <a 
                href={getReportPdfUrl(sessionId, reportFormat)}
                download
                className="w-full px-4 py-3.5 bg-[#0b1c30] text-white text-center rounded-xl font-bold hover:bg-[#1a2b42] transition-colors flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" /> Download Report PDF
              </a>
              <a 
                href={getReportDocxUrl(sessionId, reportFormat)}
                download
                className="w-full px-4 py-3.5 bg-white text-[#0b1c30] border-2 border-[#0b1c30] text-center rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" /> Download Report DOCX
              </a>
            </div>
          </div>
          
          <div className="flex-1 glass-panel overflow-hidden flex flex-col">
            <div className="bg-white/40 px-6 py-4 border-b border-white/20 flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#4f46e5] uppercase tracking-[0.15em]">Report Output</span>
              {summaryLoading && <Loader2 className="w-4 h-4 text-[#4f46e5] animate-spin" />}
            </div>
            
            <div className="p-8 min-h-[400px] relative bg-white/60">
              {summaryLoading ? (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                  <LoadingState message="Formatting..." />
                </div>
              ) : null}
              <div 
                className="prose prose-slate max-w-none w-full"
                dangerouslySetInnerHTML={{ __html: reportHTML }} 
              />
            </div>
          </div>
        </div>
      )}

      {/* Footer Action */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pb-12 mt-4">
        <button 
          onClick={handleRetrySession}
          disabled={retryLoading}
          className="primary-btn flex items-center justify-center gap-2 px-6 py-3"
        >
          {retryLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCcw className="w-5 h-5" />}
          Retry with Adaptive Difficulty
        </button>
        
        <button 
          onClick={() => navigate('/session/new')}
          className="text-[#464555] hover:text-[#0b1c30] font-medium text-sm text-center flex items-center justify-center gap-2 py-2 px-4 rounded-lg hover:bg-white/50 transition-colors"
        >
          Start New Topic
        </button>
      </div>

    </div>
  );
}
