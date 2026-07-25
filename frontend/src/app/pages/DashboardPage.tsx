import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getSessionList, getDashboardStats } from '../../lib/api';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip
} from 'recharts';
import { Brain, Activity, Target, Plus, ChevronRight, Clock, Award } from 'lucide-react';
import { LoadingState } from '../components/states/LoadingState';

export function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsData, sessionsData] = await Promise.all([
          getDashboardStats(),
          getSessionList()
        ]);
        setStats(statsData);
        setSessions(sessionsData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  if (loading) {
    return <LoadingState fullScreen message="Loading your cognitive profile..." />;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#0b1c30]">Dashboard</h1>
          <p className="text-[#464555] mt-1">Your cognitive mastery overview.</p>
        </div>
        <Link to="/session/new" className="primary-btn flex items-center gap-2 w-fit">
          <Plus className="w-4 h-4" /> New Session
        </Link>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#4f46e5]/10 flex items-center justify-center text-[#4f46e5]">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#464555]">Total Sessions</div>
            <div className="text-2xl font-bold text-[#0b1c30]">{stats?.totalSessions || 0}</div>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#464555]">Avg. Score</div>
            <div className="text-2xl font-bold text-[#0b1c30]">{Math.round((stats?.averageScore || 0) * 100)}%</div>
          </div>
        </div>
        <div className="glass-panel p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-medium text-[#464555]">Active Streak</div>
            <div className="text-2xl font-bold text-[#0b1c30]">
              {stats?.activeStreak === 1 ? '1 Day' : `${stats?.activeStreak || 0} Days`}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          {/* Skill Radar */}
          <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-6">
              <Brain className="w-5 h-5 text-[#4f46e5]" />
              <h2 className="text-lg font-bold text-[#0b1c30]">Skill Matrix</h2>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={stats?.skillsRadar || []}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#464555', fontSize: 12, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[1000, 2000]} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <Radar name="Rating" dataKey="rating" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Progress Trend */}
          <div className="glass-panel p-6">
            <h2 className="text-lg font-bold text-[#0b1c30] mb-6">Performance Trend</h2>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats?.progressTrend || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#718096', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#718096', fontSize: 12 }} dx={-10} domain={[0, 1]} tickFormatter={(val) => `${Math.round(val * 100)}%`} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    formatter={(value: number) => [`${Math.round(value * 100)}%`, 'Score']}
                  />
                  <Line type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Right Column: History */}
        <div className="flex flex-col gap-6">
          <div className="glass-panel p-6 h-full">
            <h2 className="text-lg font-bold text-[#0b1c30] mb-6">Recent Sessions</h2>
            
            {sessions.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 text-slate-200 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No sessions yet.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {sessions.map((s, i) => (
                  <Link 
                    key={i} 
                    to={`/session/${s.id}/report`}
                    className="group p-4 rounded-xl border border-slate-100 hover:border-[#4f46e5]/30 hover:bg-[#4f46e5]/5 transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-[#0b1c30] mb-1 group-hover:text-[#4f46e5] transition-colors">{s.topic}</div>
                      <div className="text-xs text-[#718096] flex items-center gap-2">
                        <span>{new Date(s.date).toLocaleDateString()}</span>
                        <span>•</span>
                        <span className="font-medium text-emerald-600">{Math.round(s.score * 100)}% Score</span>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#4f46e5] transition-colors" />
                  </Link>
                ))}
              </div>
            )}
            

          </div>
        </div>
      </div>
    </div>
  );
}
