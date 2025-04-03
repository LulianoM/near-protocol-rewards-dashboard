'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, AreaChart, Area } from 'recharts';
import { Activity, Users, TrendingUp, Award } from 'lucide-react';

interface Repository {
  name: string;
  totalScore: number;
  weeklyReward: number;
  rewardLevel: string;
  periodStart: string;
  periodEnd: string;
}

interface DashboardStatsProps {
  repositories: Repository[];
}

const mockData = [
  { name: 'Jan', value: 400 },
  { name: 'Fev', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Abr', value: 800 },
  { name: 'Mai', value: 700 },
  { name: 'Jun', value: 900 },
];

const mockBarData = [
  { name: 'Categoria A', value: 400 },
  { name: 'Categoria B', value: 300 },
  { name: 'Categoria C', value: 600 },
  { name: 'Categoria D', value: 800 },
];

const mockPieData = [
  { name: 'Grupo A', value: 400 },
  { name: 'Grupo B', value: 300 },
  { name: 'Grupo C', value: 300 },
  { name: 'Grupo D', value: 200 },
];

const mockAreaData = [
  { name: 'Jan', value1: 400, value2: 240 },
  { name: 'Fev', value1: 300, value2: 139 },
  { name: 'Mar', value1: 600, value2: 980 },
  { name: 'Abr', value1: 800, value2: 390 },
  { name: 'Mai', value1: 700, value2: 480 },
  { name: 'Jun', value1: 900, value2: 380 },
];

export function DashboardStats({ repositories }: DashboardStatsProps) {
  const totalRewards = repositories.reduce((acc, repo) => acc + repo.weeklyReward, 0);
  const averageScore = repositories.reduce((acc, repo) => acc + repo.totalScore, 0) / repositories.length;
  const activeRepos = repositories.length;
  const participationRate = (activeRepos / 200) * 100; // Mock total possible repos

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <Award className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Rewards</p>
              <p className="text-2xl font-semibold text-gray-900">{totalRewards.toLocaleString()} NEAR</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Average Score</p>
              <p className="text-2xl font-semibold text-gray-900">{averageScore.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Repositories</p>
              <p className="text-2xl font-semibold text-gray-900">{activeRepos}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Participation Rate</p>
              <p className="text-2xl font-semibold text-gray-900">{participationRate.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rewards Over Time</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#3B82F6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
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

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Rewards by Group</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockPieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#3B82F6"
                  label
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Activity Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockAreaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="value1" stackId="1" stroke="#3B82F6" fill="#3B82F6" />
                <Area type="monotone" dataKey="value2" stackId="1" stroke="#10B981" fill="#10B981" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
} 