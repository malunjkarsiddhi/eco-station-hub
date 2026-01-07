
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getManagementInsights } from '../services/geminiService';

const MOCK_CHART_DATA = [
  { time: '08:00', energy: 120 },
  { time: '10:00', energy: 450 },
  { time: '12:00', energy: 380 },
  { time: '14:00', energy: 590 },
  { time: '16:00', energy: 820 },
  { time: '18:00', energy: 950 },
  { time: '20:00', energy: 630 },
  { time: '22:00', energy: 240 },
];

const Dashboard: React.FC = () => {
  const [insights, setInsights] = useState<string>('Loading AI insights...');
  
  const stats = [
    { label: 'Total Stations', value: '42', change: '+2', trend: 'up' },
    { label: 'Active Sessions', value: '18', change: '82%', trend: 'neutral' },
    { label: 'Energy (kWh)', value: '1,284', change: '+12.5%', trend: 'up' },
    { label: 'Revenue (INR)', value: '₹3,42,000', change: '+₹42,000', trend: 'up' },
  ];

  useEffect(() => {
    const fetchInsights = async () => {
      const res = await getManagementInsights(stats);
      setInsights(res || 'No insights available.');
    };
    fetchInsights();
  }, []);

  return (
    <div className="space-y-8">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <div className="mt-2 flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-600'
              }`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Energy Consumption Flow (Pune Hub)</h3>
            <select className="bg-slate-50 border border-slate-200 text-sm rounded-lg p-2 outline-none">
              <option>Today</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CHART_DATA}>
                <defs>
                  <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="energy" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorEnergy)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-emerald-900 text-emerald-50 p-8 rounded-2xl shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <span className="text-8xl">✨</span>
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span>🤖</span> Gemini AI Management
            </h3>
            <div className="prose prose-invert prose-sm">
              <p className="text-emerald-200 leading-relaxed whitespace-pre-line">
                {insights}
              </p>
            </div>
            <button className="mt-8 w-full bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors text-sm shadow-md">
              Run Full Optimization Scan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
