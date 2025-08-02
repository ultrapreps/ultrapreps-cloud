'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TestMascotRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/community');
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Redirecting...</h1>
        <p className="text-gray-400">Taking you to community features</p>
      </div>
    </div>
  );
}