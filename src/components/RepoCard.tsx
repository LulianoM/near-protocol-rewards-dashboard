'use client';

import React from 'react';
import { Github, Star, GitBranch, GitCommit, AlertCircle } from 'lucide-react';

interface Repository {
  name: string;
  totalScore: number;
  weeklyReward: number;
  rewardLevel: string;
  periodStart: string;
  periodEnd: string;
}

interface RepoCardProps {
  repo: Repository;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2">
          <Github className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">{repo.name}</h3>
        </div>
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
          repo.rewardLevel === 'High' ? 'bg-green-100 text-green-800' :
          repo.rewardLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {repo.rewardLevel}
        </span>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Score</p>
            <p className="text-xl font-semibold text-gray-900">{repo.totalScore.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Weekly Reward</p>
            <p className="text-xl font-semibold text-gray-900">{repo.weeklyReward.toLocaleString()} NEAR</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">1.2k</span>
          </div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">24</span>
          </div>
          <div className="flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">156</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <AlertCircle className="w-4 h-4" />
          <span>Period: {new Date(repo.periodStart).toLocaleDateString()} - {new Date(repo.periodEnd).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
} 