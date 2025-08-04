import TrackComparison from '@/components/TrackComparison';

export default function TrackComparisonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-black text-white mb-4">
            🏃 Track Athlete Comparison System
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Comprehensive Analysis Using UIL, MaxPreps & Texas Track Sites
          </p>
          <p className="text-gray-400">
            Head-to-head comparisons for Marble Falls varsity track athletes
          </p>
        </div>

        {/* Track Comparison Component */}
        <TrackComparison />

        {/* Feature Overview */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Data Sources */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              📊 Data Sources
            </h3>
            <div className="text-gray-300 space-y-3">
              <div>
                <h4 className="font-semibold text-blue-400">UIL Official Results</h4>
                <p className="text-sm">Official University Interscholastic League meet results and district standings.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400">MaxPreps Statistics</h4>
                <p className="text-sm">Comprehensive seasonal statistics and performance tracking.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400">Athletic.net</h4>
                <p className="text-sm">Detailed meet results with wind readings and performance rankings.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400">Texas Track Sites</h4>
                <p className="text-sm">State-specific performance databases and historical comparisons.</p>
              </div>
            </div>
          </div>

          {/* Analysis Features */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              🔍 Analysis Features
            </h3>
            <div className="text-gray-300 space-y-3">
              <div>
                <h4 className="font-semibold text-green-400">Common Events Only</h4>
                <p className="text-sm">Compares athletes only in events they both compete in for fair analysis.</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400">Personal Records</h4>
                <p className="text-sm">Uses each athlete's best performance in each event for comparison.</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400">Wind-Legal Times</h4>
                <p className="text-sm">Accounts for wind readings and meet conditions in performance analysis.</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400">Season Progression</h4>
                <p className="text-sm">Tracks improvement throughout the season with meet-by-meet analysis.</p>
              </div>
            </div>
          </div>

          {/* Advanced Analytics */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              🎯 Advanced Analytics
            </h3>
            <div className="text-gray-300 space-y-3">
              <div>
                <h4 className="font-semibold text-purple-400">Strengths & Weaknesses</h4>
                <p className="text-sm">AI-powered analysis of each athlete's event-specific advantages.</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400">Performance Margins</h4>
                <p className="text-sm">Detailed margin analysis with competitive significance assessment.</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400">Event Categorization</h4>
                <p className="text-sm">Groups events by type (sprints, distance, field) for pattern analysis.</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400">District Rankings</h4>
                <p className="text-sm">Contextualizes performance within district and regional standings.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12 bg-gray-800 p-8 rounded-xl border border-gray-700">
          <h3 className="text-3xl font-bold text-white mb-6 text-center">How the Comparison Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">1</div>
              <h4 className="font-semibold text-white mb-2">Data Collection</h4>
              <p className="text-sm text-gray-300">CrawlerBot gathers comprehensive track data from UIL, MaxPreps, and other sources</p>
            </div>
            <div className="text-center">
              <div className="bg-green-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">2</div>
              <h4 className="font-semibold text-white mb-2">Performance Analysis</h4>
              <p className="text-sm text-gray-300">StatsBot analyzes times, marks, and meet conditions for accurate comparison</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">3</div>
              <h4 className="font-semibold text-white mb-2">Common Events</h4>
              <p className="text-sm text-gray-300">System identifies and compares only events both athletes compete in</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl">4</div>
              <h4 className="font-semibold text-white mb-2">AI Analysis</h4>
              <p className="text-sm text-gray-300">Neural network provides insights on strengths, weaknesses, and competitive dynamics</p>
            </div>
          </div>
        </div>

        {/* Example Comparison */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-purple-900 p-8 rounded-xl border border-gray-700">
          <h3 className="text-3xl font-bold text-white mb-4 text-center">Try It Now!</h3>
          <p className="text-center text-gray-200 mb-6">
            Enter two athlete names above to see a comprehensive head-to-head comparison
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center">
            <div className="bg-black/30 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">Example Athletes</h4>
              <p className="text-gray-300 text-sm">Try comparing sprinters, distance runners, or field event athletes</p>
            </div>
            <div className="bg-black/30 p-4 rounded-lg">
              <h4 className="font-bold text-white mb-2">Season Data</h4>
              <p className="text-gray-300 text-sm">Analysis includes full season progression and meet-by-meet results</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400">
          <p>UltraPreps Track Comparison System - Powered by CrawlerBot & StatsBot AI</p>
          <p className="text-sm mt-2">
            Data sourced from UIL, MaxPreps, Athletic.net, and Texas track sites for comprehensive analysis
          </p>
        </div>
      </div>
    </div>
  );
}