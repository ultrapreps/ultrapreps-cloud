'use client';
export const dynamic = 'force-dynamic';
import React from 'react';
import DealCards from '@/components/DealCards';
import NILApprovalFlow from '@/components/NILApprovalFlow';
import EscrowAnimation from '@/components/EscrowAnimation';
import HypeIncentives from '@/components/HypeIncentives';
import { useSession } from 'next-auth/react';
import { Spinner } from '@/components/Spinner'; // Assume a Spinner component exists

export default function NILMarketplace() {
  const sessionResult = useSession();
  
  if (sessionResult.status === 'loading') {
    return <div className="flex items-center justify-center min-h-screen"><Spinner /> Loading...</div>;
  }
  if (!sessionResult.data?.user?.id) {
    return <div className="flex items-center justify-center min-h-screen text-red-500 text-xl font-bold">Error: You must be signed in to view this page.</div>;
  }
  const userId = sessionResult.data.user.id;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-extrabold mb-6 tracking-tight text-center drop-shadow-xl">NIL Marketplace</h1>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6 mb-8">
          <div className="text-2xl font-bold mb-2 text-yellow-400">Deal Cards</div>
          <DealCards userId={userId} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-green-400">Approval Flows</div>
            <NILApprovalFlow userId={userId} />
          </div>
          <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
            <div className="text-2xl font-bold mb-2 text-blue-400">Animated Escrow</div>
            <EscrowAnimation userId={userId} />
          </div>
        </div>
        <div className="bg-gray-900/80 rounded-xl shadow-2xl p-6">
          <div className="text-2xl font-bold mb-2 text-pink-400">HYPE Incentives</div>
          <HypeIncentives userId={userId} />
        </div>
      </div>
    </div>
  );
}