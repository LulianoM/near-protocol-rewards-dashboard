'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { ProgramInfo } from '@/components/ProgramInfo';
import { DashboardStats } from '@/components/DashboardStats';
import { RepoCard } from '@/components/RepoCard';
import { Loader2 } from 'lucide-react';

// Mock data
const mockRepositories = [
  {
    name: 'near/core-contracts',
    totalScore: 850,
    weeklyReward: 250,
    rewardLevel: 'High',
    periodStart: '2024-03-01T00:00:00Z',
    periodEnd: '2024-03-31T23:59:59Z',
  },
  {
    name: 'near/near-api-js',
    totalScore: 720,
    weeklyReward: 180,
    rewardLevel: 'Medium',
    periodStart: '2024-03-01T00:00:00Z',
    periodEnd: '2024-03-31T23:59:59Z',
  },
  {
    name: 'near/near-wallet',
    totalScore: 650,
    weeklyReward: 150,
    rewardLevel: 'Medium',
    periodStart: '2024-03-01T00:00:00Z',
    periodEnd: '2024-03-31T23:59:59Z',
  },
  {
    name: 'near/near-cli',
    totalScore: 450,
    weeklyReward: 100,
    rewardLevel: 'Low',
    periodStart: '2024-03-01T00:00:00Z',
    periodEnd: '2024-03-31T23:59:59Z',
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'score' | 'reward'>('score');
  const [view, setView] = useState<'dashboard' | 'list'>('dashboard');
  const [loading] = useState(false);
  const [error] = useState<Error | null>(null);

  // Ensure unique repositories by name
  const uniqueRepositories = useMemo(() => {
    const repoMap = new Map();
    mockRepositories.forEach(repo => {
      if (!repoMap.has(repo.name)) {
        repoMap.set(repo.name, repo);
      }
    });
    return Array.from(repoMap.values());
  }, []);

  const filteredAndSortedRepos = useMemo(() => {
    return uniqueRepositories
      .filter(repo => 
        repo.name.toLowerCase().includes(search.toLowerCase()) ||
        repo.rewardLevel.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'score') {
          return b.totalScore - a.totalScore;
        }
        return b.weeklyReward - a.weeklyReward;
      });
  }, [uniqueRepositories, search, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto" />
          <p className="mt-4 text-gray-600">Loading repository metrics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
          <div className="text-center">
            <div className="bg-red-100 text-red-600 p-3 rounded-full w-12 h-12 mx-auto mb-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Data</h2>
            <p className="text-gray-600 mb-6">{error.message}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        search={search}
        setSearch={setSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        view={view}
        setView={setView}
      />

      <main className="flex-grow max-w-[2000px] mx-auto px-6 py-12 w-full">
        <ProgramInfo />
        
        {view === 'dashboard' ? (
          <DashboardStats repositories={uniqueRepositories} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-8">
            {filteredAndSortedRepos.map((repo) => (
              <RepoCard key={repo.name} repo={repo} />
            ))}
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-[2000px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900">NEAR Protocol Rewards</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                A transparent, metric-based rewards system for NEAR projects that directly ties incentives to development activity and user adoption.
              </p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Developer Resources</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://docs.near.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a 
                    href="https://near.org/developers" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Developer Portal
                  </a>
                </li>
                <li>
                  <a 
                    href="https://near.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    NEAR Website
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Protocol Rewards</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Program Overview
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Quick Start Guide
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-blue-600"
                  >
                    Troubleshooting
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Program Updates</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                <p>Current reward period: {uniqueRepositories[0]?.periodStart.split('T')[0]} to {uniqueRepositories[0]?.periodEnd.split('T')[0]}</p>
                <p>Active repositories: {uniqueRepositories.length}</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-500">
                © {new Date().getFullYear()} NEAR Protocol. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a 
                  href="/terms-and-conditions"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Terms & Conditions
                </a>
                <a 
                  href="/privacy-policy"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
