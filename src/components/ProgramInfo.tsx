'use client';

import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

export function ProgramInfo() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
            <Info className="w-5 h-5 text-blue-600" />
          </div>
        </div>
        <div className="flex-grow">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Program Overview</h2>
          <p className="text-gray-600 mb-4">
            The NEAR Protocol Rewards program incentivizes development activity and user adoption through a transparent, metric-based system. 
            Projects are evaluated based on their GitHub activity, community engagement, and overall contribution to the NEAR ecosystem.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <AlertCircle className="w-4 h-4" />
            <span>Last updated: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 