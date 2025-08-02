'use client';

export default function SimpleHomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-black mb-6 bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
            ULTRAPREPS
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Every Student Deserves a Stage
          </p>
          <div className="space-y-4">
            <p className="text-white/60">Navigation should appear above this content</p>
            <a 
              href="/stadium/create" 
              className="inline-block px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-black font-bold rounded-lg hover:scale-105 transition-all"
            >
              Create Stadium
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}