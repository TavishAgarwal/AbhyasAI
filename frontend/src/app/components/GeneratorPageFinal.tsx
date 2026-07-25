import { useState, useEffect, useRef } from 'react';
import { SimpleNavbar } from './SimpleNavbar';
import {
  BookOpen, Upload, Camera, Sparkles,
  CheckCircle2, Circle, Download, Share2, ChevronDown, Maximize2, X, AlertTriangle, FileText
} from 'lucide-react';
import { getChapters, getSubjects, generateWorksheet, getDownloadUrl, type Chapter, type GenerateResponse } from '../../lib/api';
import DOMPurify from 'dompurify';

// HTML sanitization to prevent XSS from AI-generated content (Fix 2 — CRITICAL)
const DOMPURIFY_CONFIG = {
  ALLOWED_TAGS: [
    'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ul', 'ol', 'li', 'strong', 'em', 'span', 'br',
    'section', 'article', 'b', 'i', 'table', 'thead',
    'tbody', 'tr', 'th', 'td', 'sub', 'sup'
  ],
  ALLOWED_ATTR: ['class'],
  FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button', 'link', 'meta'],
  FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'onfocus', 'onblur', 'style', 'href', 'src', 'action', 'formaction']
};

function sanitiseHTML(html: string): string {
  return DOMPurify.sanitize(html, DOMPURIFY_CONFIG);
}

type GeneratorState = 'empty' | 'loading' | 'results';
type InputMode = 'ncert' | 'upload' | 'camera';

export function GeneratorPageFinal() {
  const [state, setState] = useState<GeneratorState>('empty');
  const [inputMode, setInputMode] = useState<InputMode>('ncert');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedChapter, setSelectedChapter] = useState('');
  const [selectedVersions, setSelectedVersions] = useState({
    standard: true,
    dyslexia: true,
    adhd: true
  });
  const [language, setLanguage] = useState<'english' | 'hindi'>('english');
  const [fullscreenPanel, setFullscreenPanel] = useState<'standard' | 'dyslexia' | 'adhd' | null>(null);

  // New state for API integration
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [subjectsLoading, setSubjectsLoading] = useState(false);
  const [generationResult, setGenerationResult] = useState<GenerateResponse | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load available subjects when class changes
  useEffect(() => {
    if (selectedClass) {
      setSubjectsLoading(true);
      getSubjects(parseInt(selectedClass))
        .then(setSubjects)
        .catch(() => setSubjects([]))
        .finally(() => setSubjectsLoading(false));
    } else {
      setSubjects([]);
    }
    setSelectedSubject('');
    setSelectedChapter('');
  }, [selectedClass]);

  // Load chapters when class or subject changes
  useEffect(() => {
    if (selectedClass && selectedSubject) {
      getChapters({ classNum: parseInt(selectedClass), subject: selectedSubject })
        .then(setChapters)
        .catch(() => setChapters([]));
    } else {
      setChapters([]);
    }
    setSelectedChapter('');
  }, [selectedClass, selectedSubject]);

  const handleGenerate = async () => {
    // If we're showing results, reset everything first
    if (state === 'results') {
      setGenerationResult(null);
      setError(null);
      setState('empty');
      setUploadedFiles([]);
      return;
    }

    setError(null);
    setState('loading');
    try {
      const versions = Object.entries(selectedVersions)
        .filter(([, v]) => v)
        .map(([k]) => k);
      if (versions.length === 0) {
        setError('Please select at least one version.');
        setState('empty');
        return;
      }
      const result = await generateWorksheet({
        source: inputMode === 'ncert' ? 'library' : inputMode,
        chapterId: inputMode === 'ncert' ? selectedChapter : undefined,
        language,
        versions,
        files: inputMode !== 'ncert' ? uploadedFiles : undefined
      });
      setGenerationResult(result);
      setState('results');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Generation failed';
      setError(msg);
      setState('empty');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(files);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <SimpleNavbar />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile when showing results */}
        <aside className={`w-full md:w-[320px] bg-[#F7FAFC] border-r border-[#CBC4D2] flex flex-col overflow-auto ${
          state === 'results' ? 'hidden md:flex' : 'flex'
        }`}>
          <div className="p-4 md:p-6">
            {/* Section Header */}
            <div className="mb-6">
              <h1 className="text-[22px] font-bold text-[#2B3440] leading-[28.6px]">Generate Worksheet</h1>
              <p className="text-[15px] text-[#718096] leading-[24px]">Select your parameters</p>
            </div>

          {/* Navigation Tabs */}
          <div className="space-y-2 mb-8">
            <button
              onClick={() => setInputMode('ncert')}
              className={`w-full h-10 flex items-center gap-4 pl-5 pr-4 rounded-lg transition-all ${
                inputMode === 'ncert'
                  ? 'bg-[rgba(45,155,135,0.1)] border-l-4 border-[#2D9B87]'
                  : 'hover:bg-[rgba(45,155,135,0.05)]'
              }`}
            >
              <BookOpen className={`w-4 h-5 ${inputMode === 'ncert' ? 'text-[#2D9B87]' : 'text-[#494551]'}`} />
              <span className={`text-[13px] font-semibold tracking-[0.13px] leading-[18.2px] ${inputMode === 'ncert' ? 'text-[#2D9B87]' : 'text-[#494551]'}`}>
                NCERT
              </span>
            </button>

            <button
              onClick={() => setInputMode('upload')}
              className={`w-full h-10 flex items-center gap-4 px-4 rounded-lg transition-all ${
                inputMode === 'upload'
                  ? 'bg-[rgba(45,155,135,0.1)] border-l-4 border-[#2D9B87]'
                  : 'hover:bg-[rgba(45,155,135,0.05)]'
              }`}
            >
              <Upload className={`w-4 h-5 ${inputMode === 'upload' ? 'text-[#2D9B87]' : 'text-[#494551]'}`} />
              <span className={`text-[13px] font-semibold tracking-[0.13px] leading-[18.2px] ${inputMode === 'upload' ? 'text-[#2D9B87]' : 'text-[#494551]'}`}>
                Upload
              </span>
            </button>

            <button
              onClick={() => setInputMode('camera')}
              className={`w-full h-10 flex items-center gap-4 px-4 rounded-lg transition-all ${
                inputMode === 'camera'
                  ? 'bg-[rgba(45,155,135,0.1)] border-l-4 border-[#2D9B87]'
                  : 'hover:bg-[rgba(45,155,135,0.05)]'
              }`}
            >
              <Camera className={`w-5 h-[18px] ${inputMode === 'camera' ? 'text-[#2D9B87]' : 'text-[#494551]'}`} />
              <span className={`text-[13px] font-semibold tracking-[0.13px] leading-[18.2px] ${inputMode === 'camera' ? 'text-[#2D9B87]' : 'text-[#494551]'}`}>
                Camera
              </span>
            </button>
          </div>

          {/* Input Content */}
          {inputMode === 'ncert' && (
            <div className="space-y-6">
              {/* Class */}
              <div>
                <label className="text-[13px] font-semibold text-[#1D1B20] tracking-[0.13px] leading-[18.2px] block mb-1">
                  Class
                </label>
                <div className="relative">
                  <select
                    value={selectedClass}
                    onChange={(e) => setSelectedClass(e.target.value)}
                    className="w-full h-12 px-4 pr-10 border border-[#D0D8E4] rounded-lg text-[15px] leading-[24px] text-[#1D1B20] bg-[#F7FAFC] focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 appearance-none"
                  >
                    <option value="">Select Class</option>
                    {[1,2,3,4,5,6,7,8,9,10].map(c => (
                      <option key={c} value={c}>Class {c}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-[13px] font-semibold text-[#1D1B20] tracking-[0.13px] leading-[18.2px] block mb-1">
                  Subject
                </label>
                <div className="relative">
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full h-12 px-4 pr-10 border border-[#D0D8E4] rounded-lg text-[15px] leading-[24px] text-[#1D1B20] bg-[#F7FAFC] focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 appearance-none disabled:opacity-50"
                    disabled={!selectedClass || subjectsLoading}
                  >
                    <option value="">{subjectsLoading ? 'Loading subjects…' : 'Select Subject'}</option>
                    {subjects.map(subj => (
                      <option key={subj} value={subj}>{subj}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              {/* Chapter */}
              <div>
                <label className="text-[13px] font-semibold text-[#1D1B20] tracking-[0.13px] leading-[18.2px] block mb-1">
                  Chapter
                </label>
                <div className="relative">
                  <select
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="w-full h-12 px-4 pr-10 border border-[#D0D8E4] rounded-lg text-[15px] leading-[24px] text-[#1D1B20] bg-[#F7FAFC] focus:outline-none focus:ring-2 focus:ring-[#2D9B87]/30 appearance-none disabled:opacity-50"
                    disabled={!selectedSubject}
                  >
                    <option value="">Select Chapter</option>
                    {chapters.map(ch => (
                      <option key={ch.id} value={ch.id}>
                        Chapter {ch.chapter_num}: {ch.chapter_title}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280] pointer-events-none" />
                </div>
              </div>

              {/* Version Selection */}
              <div>
                <label className="text-[13px] font-semibold text-[#1D1B20] tracking-[0.13px] leading-[18.2px] block mb-3">
                  Select Versions
                </label>
                <div className="space-y-3">
                  {[
                    { key: 'standard', label: 'Standard', desc: 'Improved clarity for all learners' },
                    { key: 'dyslexia', label: 'Dyslexia Edition', desc: 'Shorter sentences, wider spacing', badge: 'Edition B' },
                    { key: 'adhd', label: 'ADHD / Dyscalculia', desc: 'Step-by-step, visual anchors', badge: 'Edition C' }
                  ].map((version) => (
                    <label
                      key={version.key}
                      className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        selectedVersions[version.key as keyof typeof selectedVersions]
                          ? 'border-[#2D9B87] bg-[#E6F7F4]/50'
                          : 'border-[#E2E8F0] bg-white hover:border-[#2D9B87]/30'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedVersions[version.key as keyof typeof selectedVersions]}
                        onChange={(e) => setSelectedVersions({...selectedVersions, [version.key]: e.target.checked})}
                        className="mt-1 accent-[#2D9B87] w-4 h-4"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-semibold text-[#2B3440]">{version.label}</span>
                          {version.badge && (
                            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 text-xs rounded-full font-medium">
                              {version.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#718096]">{version.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="text-[13px] font-semibold text-[#1D1B20] tracking-[0.13px] leading-[18.2px] block mb-1">
                  Language
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setLanguage('english')}
                    className={`h-12 rounded-lg text-[15px] font-medium transition-all ${
                      language === 'english'
                        ? 'bg-[#2D9B87] text-white'
                        : 'bg-[#F7FAFC] border border-[#D0D8E4] text-[#494551] hover:border-[#2D9B87]'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('hindi')}
                    className={`h-12 rounded-lg text-[15px] font-medium transition-all ${
                      language === 'hindi'
                        ? 'bg-[#2D9B87] text-white'
                        : 'bg-[#F7FAFC] border border-[#D0D8E4] text-[#494551] hover:border-[#2D9B87]'
                    }`}
                  >
                    Hindi
                  </button>
                </div>
              </div>
            </div>
          )}

          {inputMode === 'upload' && (
            <div
              className="border-2 border-dashed border-[#D0D8E4] rounded-lg p-8 text-center hover:border-[#2D9B87] transition-colors cursor-pointer bg-[#F7FAFC]"
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept="application/pdf" className="hidden" onChange={handleFileSelect} />
              <Upload className="w-10 h-10 text-[#494551] mx-auto mb-3" />
              {uploadedFiles.length > 0 ? (
                <>
                  <p className="text-sm text-[#2D9B87] font-medium mb-1"><FileText className="w-4 h-4 inline mr-1" />{uploadedFiles[0].name}</p>
                  <p className="text-xs text-[#494551]">Click to change file</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#1D1B20] font-medium mb-1">Drop your PDF here</p>
                  <p className="text-xs text-[#494551]">or click to browse</p>
                </>
              )}
            </div>
          )}

          {inputMode === 'camera' && (
            <div
              className="border-2 border-dashed border-[#D0D8E4] rounded-lg p-8 text-center hover:border-[#2D9B87] transition-colors cursor-pointer bg-[#F7FAFC]"
              onClick={() => fileInputRef.current?.click()}
            >
              <input ref={fileInputRef} type="file" accept="image/jpeg,image/png" multiple className="hidden" onChange={handleFileSelect} />
              <Camera className="w-10 h-10 text-[#494551] mx-auto mb-3" />
              {uploadedFiles.length > 0 ? (
                <>
                  <p className="text-sm text-[#2D9B87] font-medium mb-1">{uploadedFiles.length} photo(s) selected</p>
                  <p className="text-xs text-[#494551]">Click to change</p>
                </>
              ) : (
                <>
                  <p className="text-sm text-[#1D1B20] font-medium mb-1">Upload textbook photos</p>
                  <p className="text-xs text-[#494551]">One page per photo</p>
                </>
              )}
            </div>
          )}
        </div>

          {/* Generate Button */}
          <div className="mt-auto p-4 md:p-6">
            {error && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            )}
            <button
              onClick={handleGenerate}
              disabled={state === 'loading' || (inputMode === 'ncert' && !selectedChapter) || (inputMode !== 'ncert' && uploadedFiles.length === 0)}
              className={`w-full h-14 rounded-lg flex items-center justify-center gap-2 text-[13px] font-semibold tracking-[0.13px] leading-[18.2px] transition-all ${
                state === 'loading'
                  ? 'bg-[rgba(45,155,135,0.7)] text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white hover:shadow-lg hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {state === 'loading' ? (
                <>
                  <Circle className="w-4 h-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {state === 'results' ? 'Generate New Worksheet' : 'Generate All Versions'}
                </>
              )}
            </button>
          </div>
        </aside>

        {/* Main Content - Hidden on mobile when in empty state */}
        <main className={`flex-1 overflow-auto bg-white ${
          state === 'empty' ? 'hidden md:flex md:p-12 items-center justify-center' : 'flex p-0 md:p-12 md:items-center md:justify-center'
        }`}>
          <div className={`w-full ${state === 'results' ? '' : 'max-w-[1000px]'}`}>
            {state === 'empty' && <EmptyState />}
            {state === 'loading' && <LoadingState />}
            {state === 'results' && generationResult && <ResultsState result={generationResult} fullscreenPanel={fullscreenPanel} setFullscreenPanel={setFullscreenPanel} />}
          </div>
        </main>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="w-full max-w-[720px] mx-auto text-center p-4 md:p-0">
      <h2 className="text-2xl md:text-[28px] font-bold text-[#1D1B20] leading-[36.4px] mb-3">
        Your three versions will appear here
      </h2>
      <p className="text-base md:text-[18px] text-[#494551] leading-[28.8px] mb-8">
        Select a chapter from the sidebar and click Generate to<br />
        create Standard, Dyslexia-friendly, and ADHD-friendly<br />
        worksheets simultaneously.
      </p>

      {/* Fanned Document Illustration */}
      <div className="relative w-[240px] h-[240px] mx-auto">
        {/* Decorative glow */}
        <div className="absolute inset-0 bg-[rgba(79,55,138,0.1)] rounded-full blur-[32px]" />

        {/* Left document */}
        <div className="absolute left-[-15px] top-[17px] w-[140px] h-[180px] -rotate-12">
          <div className="bg-white rounded-xl p-4 h-full shadow-[0px_2px_6px_rgba(0,0,0,0.06)] border border-[rgba(203,196,210,0.3)] opacity-80">
            <div className="space-y-2">
              <div className="h-2 bg-[#ECE6EE] rounded-full w-[53px]" />
              <div className="h-2 bg-[#E6E0E9] rounded-full w-full" />
              <div className="h-2 bg-[#E6E0E9] rounded-full w-[88px]" />
              <div className="h-2 bg-[#E6E0E9] rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* Right document */}
        <div className="absolute right-[-15px] top-[17px] w-[140px] h-[180px] rotate-12">
          <div className="bg-white rounded-xl p-4 h-full shadow-[0px_2px_6px_rgba(0,0,0,0.06)] border border-[rgba(203,196,210,0.3)] opacity-80">
            <div className="space-y-2">
              <div className="h-2 bg-[#ECE6EE] rounded-full w-[53px]" />
              <div className="h-2 bg-[#E6E0E9] rounded-full w-full" />
              <div className="h-2 bg-[#E6E0E9] rounded-full w-[85px]" />
              <div className="h-2 bg-[#E6E0E9] rounded-full w-full" />
            </div>
          </div>
        </div>

        {/* Center document */}
        <div className="absolute left-[40px] top-[20px] w-[160px] h-[200px]">
          <div className="bg-gradient-to-br from-white to-[#F7FAFC] rounded-xl p-4 h-full shadow-[0px_4px_10px_rgba(0,0,0,0.08)] border border-[rgba(203,196,210,0.5)] flex flex-col items-center justify-center">
            <div className="w-[42px] h-[53px] mb-4 opacity-40">
              <svg viewBox="0 0 42.6667 53.3333" fill="none" className="w-full h-full">
                <path d="M5.33333 53.3333C3.86667 53.3333 2.61111 52.8111 1.56667 51.7667C0.522222 50.7222 0 49.4667 0 48V5.33333C0 3.86667 0.522222 2.61111 1.56667 1.56667C2.61111 0.522222 3.86667 0 5.33333 0H26.6667L42.6667 16V48C42.6667 49.4667 42.1444 50.7222 41.1 51.7667C40.0556 52.8111 38.8 53.3333 37.3333 53.3333H5.33333Z" fill="#4F378A" fillOpacity="0.4" />
              </svg>
            </div>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[rgba(79,55,138,0.3)]" />
              <div className="w-2 h-2 rounded-full bg-[rgba(99,89,124,0.3)]" />
              <div className="w-2 h-2 rounded-full bg-[rgba(230,126,34,0.3)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="w-full p-4 md:p-0">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-[28px] font-bold text-[#1D1B20] leading-[36.4px] mb-2">
          Crafting Inclusivity
        </h2>
        <p className="text-sm md:text-[15px] text-[#494551] leading-[24px]">
          We are preparing multiple tailored versions of your content.
        </p>
      </div>

      {/* Skeleton panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="bg-[#F7FAFC] border border-[#CBC4D2] rounded-xl p-6 h-[367px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)]"
          >
            {i === 1 && <div className="h-2 bg-[#E1D4FD] -mt-6 -mx-6 mb-6 rounded-t-xl animate-pulse" />}
            <div className="space-y-4 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#E6E0E9] rounded" />
                <div className="h-4 bg-[#E6E0E9] rounded w-24" />
              </div>
              <div className="h-3 bg-[#E6E0E9] rounded w-full" />
              <div className="h-3 bg-[#E6E0E9] rounded w-5/6" />
              <div className="h-3 bg-[#E6E0E9] rounded w-4/5" />
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="max-w-[600px] mx-auto bg-[#F7FAFC] border border-[#CBC4D2] rounded-xl p-6 shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
        <div className="space-y-4 mb-6">
          {/* Completed step */}
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 bg-[#EAF5EA] rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#1E7E34]" />
            </div>
            <div>
              <p className="text-[15px] font-medium text-[#1D1B20] leading-[24px]">
                Analysing chapter content
              </p>
              <p className="text-[14px] text-[#494551] leading-[20px]">
                Extracted key concepts and vocabulary.
              </p>
            </div>
          </div>

          {/* Active step */}
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <Circle className="w-4 h-4 text-[#2D9B87] fill-[#2D9B87] animate-spin" />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-bold text-[#2D9B87] leading-[24px] mb-2">
                Generating Standard version...
              </p>
              <div className="h-1.5 bg-[#E6E0E9] rounded-full overflow-hidden">
                <div className="h-full bg-[#2D9B87] rounded-full w-[45%] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Pending step */}
          <div className="flex items-start gap-4 opacity-40">
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              <Circle className="w-2.5 h-2.5 text-[#494551] fill-[#494551]" />
            </div>
            <p className="text-[15px] font-medium text-[#494551] leading-[24px]">
              Formatting visual layouts
            </p>
          </div>
        </div>

        {/* Timer */}
        <div className="pt-4 border-t border-[#CBC4D2] text-center">
          <div className="inline-block bg-[rgba(225,212,253,0.3)] rounded-full px-4 py-1">
            <span className="text-[13px] font-semibold text-[#63597C] tracking-[0.13px]">
              ~18 seconds remaining
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultsState({ result, fullscreenPanel, setFullscreenPanel }: {
  result: GenerateResponse;
  fullscreenPanel: 'standard' | 'dyslexia' | 'adhd' | null;
  setFullscreenPanel: (panel: 'standard' | 'dyslexia' | 'adhd' | null) => void;
}) {
  const meta = result.chapterMeta;
  const qr = result.qualityReport;
  const verified = qr?.all_objectives_verified;
  const timeStr = result.generationTimeMs ? `${(result.generationTimeMs / 1000).toFixed(1)}s` : '';

  const panels: { key: 'standard' | 'dyslexia' | 'adhd'; title: string; color: 'blue' | 'teal' | 'orange' }[] = [
    { key: 'standard', title: 'STANDARD · EDITION A', color: 'blue' },
    { key: 'dyslexia', title: 'DYSLEXIA-FRIENDLY · EDITION B', color: 'teal' },
    { key: 'adhd', title: 'ADHD / DYSCALCULIA · EDITION C', color: 'orange' }
  ];

  const activeVersions = panels.filter(p => result.versions[p.key] && !result.versions[p.key].unavailable);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="hidden md:flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 px-4 md:px-0">
        <div className="flex items-center gap-3 flex-wrap">
          {meta?.class && <span className="text-sm text-[#718096]">Class {meta.class} · {meta.subject} · Chapter {meta.chapterNum} · {meta.title}</span>}
          {verified ? (
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" />
              All objectives verified ✓
            </span>
          ) : (
            <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs rounded-full flex items-center gap-1.5 font-medium">
              <AlertTriangle className="w-3.5 h-3.5" />
              {qr?.objectives_covered}/{qr?.objectives_total} objectives covered
            </span>
          )}
          {timeStr && <span className="text-xs text-[#718096]">Generated in {timeStr}{result.fromCache ? ' (cached)' : ''}</span>}
        </div>
      </div>

      {/* Panels */}
      <div className={`flex-1 flex flex-col md:grid md:gap-6 overflow-auto ${activeVersions.length === 3 ? 'md:grid-cols-3' : activeVersions.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-1 max-w-2xl mx-auto'}`}>
        {activeVersions.map(p => {
          const vData = result.versions[p.key];
          return (
            <WorksheetPanel
              key={p.key}
              title={p.title}
              color={p.color}
              panelKey={p.key}
              fullscreenPanel={fullscreenPanel}
              setFullscreenPanel={setFullscreenPanel}
              pdfUrl={vData?.pdfUrl || null}
              docxUrl={vData?.docxUrl || null}
              jobId={result.jobId}
              content={
                vData?.html ? (
                  <div dangerouslySetInnerHTML={{ __html: sanitiseHTML(vData.html) }} />
                ) : (
                  <p className="text-sm text-[#718096] italic">Content unavailable for this version.</p>
                )
              }
            />
          );
        })}
      </div>
    </div>
  );
}

function WorksheetPanel({
  title,
  color,
  panelKey,
  fullscreenPanel,
  setFullscreenPanel,
  content,
  pdfUrl,
  docxUrl,
  jobId
}: {
  title: string;
  color: 'blue' | 'teal' | 'orange';
  panelKey: 'standard' | 'dyslexia' | 'adhd';
  fullscreenPanel: 'standard' | 'dyslexia' | 'adhd' | null;
  setFullscreenPanel: (panel: 'standard' | 'dyslexia' | 'adhd' | null) => void;
  content: React.ReactNode;
  pdfUrl: string | null;
  docxUrl: string | null;
  jobId: string;
}) {
  const gradients = {
    blue: 'from-blue-500 to-blue-600',
    teal: 'from-teal-500 to-teal-600',
    orange: 'from-orange-500 to-orange-600'
  };

  const handleDownload = (format: 'pdf' | 'docx') => {
    const url = format === 'pdf' ? pdfUrl : docxUrl;
    if (url) {
      window.open(url, '_blank');
    } else if (jobId && jobId !== 'cached') {
      window.open(getDownloadUrl(jobId, panelKey, format), '_blank');
    }
  };

  const isFullscreen = fullscreenPanel === panelKey;

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        <div className={`bg-gradient-to-r ${gradients[color]} text-white px-4 py-4 flex items-center justify-between`}>
          <span className="text-xs md:text-sm font-bold">{title}</span>
          <div className="flex gap-2">
            <button
              onClick={() => setFullscreenPanel(null)}
              className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
              title="Exit Fullscreen"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            {content}
          </div>
        </div>
        <div className="border-t border-[#E2E8F0] p-4 bg-white flex justify-center gap-3">
          <button onClick={() => handleDownload('pdf')} className="px-6 py-3 bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2 text-sm font-medium">
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button onClick={() => handleDownload('docx')} className="px-6 py-3 border border-[#E2E8F0] text-[#718096] hover:text-[#2D9B87] hover:border-[#2D9B87] rounded-xl transition-all flex items-center gap-2 text-sm font-medium">
            <FileText className="w-4 h-4" />
            Download DOCX
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white md:rounded-2xl shadow-sm overflow-hidden border-b md:border border-[#E2E8F0] flex flex-col min-h-screen md:min-h-0 md:h-[600px]">
      <div className={`bg-gradient-to-r ${gradients[color]} text-white px-4 py-4 flex items-center justify-between sticky top-0 z-10`}>
        <span className="text-xs md:text-sm font-bold">{title}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setFullscreenPanel(panelKey)}
            className="hover:bg-white/20 p-1.5 rounded-lg transition-colors"
            title="View Fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          <button onClick={() => handleDownload('pdf')} className="hover:bg-white/20 p-1.5 rounded-lg transition-colors" title="Download PDF">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-6 md:p-6">
        {content}
      </div>
      {/* Mobile download button at bottom */}
      <div className="md:hidden sticky bottom-0 bg-white border-t border-[#E2E8F0] p-4 flex gap-3">
        <button onClick={() => handleDownload('pdf')} className="flex-1 px-4 py-3 bg-gradient-to-r from-[#2D9B87] to-[#52B788] text-white rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm font-medium">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        <button onClick={() => handleDownload('docx')} className="px-4 py-3 border border-[#E2E8F0] text-[#718096] hover:text-[#2D9B87] hover:border-[#2D9B87] rounded-xl transition-all flex items-center gap-2 text-sm font-medium">
          <FileText className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
