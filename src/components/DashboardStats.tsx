'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';
import { Activity, Users, TrendingUp, Award, Info } from 'lucide-react';

interface Repository {
  name: string;
  totalScore: number;
  weeklyReward: number;
  rewardLevel: string;
  periodStart: string;
  periodEnd: string;
}

interface DashboardData {
  total_commits: number;
  total_projects: number;
  total_monetary_rewards: number;
}

interface DashboardStatsProps {
  repositories: Repository[];
  dashboardData?: DashboardData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }} />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-medium text-gray-900">
              {`${entry.value} points`}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Dados para o gráfico de contribuição
const contributionBreakdownData = [
  { 
    name: 'near', 
    commits: 150, 
    prs: 140, 
    reviews: 232, 
    issues: 39,
    level: 'Diamond',
    totalScore: 561
  },
  { 
    name: 'finowl-app', 
    commits: 120, 
    prs: 110, 
    reviews: 200, 
    issues: 45,
    level: 'Gold',
    totalScore: 475
  },
  { 
    name: 'mutable-web-monorepo', 
    commits: 95, 
    prs: 80, 
    reviews: 150, 
    issues: 30,
    level: 'Silver',
    totalScore: 355
  },
  { 
    name: 'otocol-rewards-dashboard', 
    commits: 80, 
    prs: 70, 
    reviews: 120, 
    issues: 25,
    level: 'Bronze',
    totalScore: 295
  },
  { 
    name: 'oracle', 
    commits: 65, 
    prs: 60, 
    reviews: 90, 
    issues: 15,
    level: 'Member',
    totalScore: 230
  },
  { 
    name: 'near-protocol-rewards', 
    commits: 50, 
    prs: 35, 
    reviews: 70, 
    issues: 20,
    level: 'Member',
    totalScore: 175
  },
  { 
    name: 'quickjs-rust-near', 
    commits: 30, 
    prs: 45, 
    reviews: 10, 
    issues: 5,
    level: 'Member',
    totalScore: 90
  },
  { 
    name: 'x-interface', 
    commits: 40, 
    prs: 15, 
    reviews: 5, 
    issues: 25,
    level: 'Member',
    totalScore: 85
  },
];

const mockBarData = [
  { name: 'Category A', value: 400 },
  { name: 'Category B', value: 300 },
  { name: 'Category C', value: 600 },
  { name: 'Category D', value: 800 },
];

export function DashboardStats({ repositories, dashboardData }: DashboardStatsProps) {
  // Usar dados da API se disponíveis, ou calcular a partir dos repositórios
  const totalRewards = dashboardData?.total_monetary_rewards || 
    repositories.reduce((acc, repo) => acc + repo.weeklyReward, 0);
    
  const averageScore = repositories.length > 0 ? 
    repositories.reduce((acc, repo) => acc + repo.totalScore, 0) / repositories.length : 
    0;
    
  const activeRepos = dashboardData?.total_projects || repositories.length;
  
  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Total Rewards</p>
            <div className="group relative">
              <Info size={16} className="text-gray-400" />
              <div className="absolute right-0 mt-2 w-64 p-3 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <p className="font-medium mb-1">Reward Value</p>
                <p className="text-gray-300">Total monetary rewards distributed to all repositories</p>
              </div>
            </div>
          </div>
          <p className="text-3xl font-bold text-green-500 mt-2">${totalRewards.toLocaleString()}</p>
          <div className="mt-2 text-sm text-gray-500">
            Across all repositories
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Average Score</p>
            <div className="group relative">
              <Info size={16} className="text-gray-400" />
              <div className="absolute right-0 mt-2 w-64 p-3 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <p className="font-medium mb-1">Performance Score</p>
                <p className="text-gray-300">Average score calculated from commit quality, PR impact, review contributions, and issue management</p>
              </div>
            </div>
          </div>
          <p className="text-3xl font-bold text-purple-500 mt-2">{averageScore.toFixed(1)}</p>
          <div className="mt-2 text-sm text-gray-500">
            Per repository
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Active Repositories</p>
            <div className="group relative">
              <Info size={16} className="text-gray-400" />
              <div className="absolute right-0 mt-2 w-64 p-3 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <p className="font-medium mb-1">Repository Count</p>
                <p className="text-gray-300">Number of repositories actively participating in the rewards program</p>
              </div>
            </div>
          </div>
          <p className="text-3xl font-bold text-blue-500 mt-2">{activeRepos}</p>
          <div className="mt-2 text-sm text-gray-500">
            Active in current period
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-600">Total Commits</p>
            <div className="group relative">
              <Info size={16} className="text-gray-400" />
              <div className="absolute right-0 mt-2 w-64 p-3 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                <p className="font-medium mb-1">Commits</p>
                <p className="text-gray-300">Total number of commits across all monitored repositories</p>
              </div>
            </div>
          </div>
          <p className="text-3xl font-bold text-orange-500 mt-2">{dashboardData?.total_commits || 0}</p>
          <div className="mt-2 text-sm text-gray-500">
            Combined developer actions
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Performer Contribution Breakdown</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={contributionBreakdownData}
                layout="vertical"
                margin={{ left: 40, right: 40, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  type="number"
                  stroke="#9CA3AF"
                  tickLine={false}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  width={120}
                  tick={{ fontSize: 12 }}
                  stroke="#9CA3AF"
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="commits" stackId="a" fill="#3B82F6" name="Commits" />
                <Bar dataKey="prs" stackId="a" fill="#10B981" name="Pull Requests" />
                <Bar dataKey="reviews" stackId="a" fill="#8B5CF6" name="Reviews" />
                <Bar dataKey="issues" stackId="a" fill="#F97316" name="Issues" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Breakdown of contribution scores across different activities for top performing repositories
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Distribution by Category</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 