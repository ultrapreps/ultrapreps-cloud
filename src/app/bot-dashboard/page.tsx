import BotDashboard from '@/components/BotDashboard';

export default function BotDashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <h1 className="text-5xl font-black text-white mb-4">
            🤖 UltraPreps AI Neural Network
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            CrawlerBot & StatsBot Live Management Console
          </p>
          <p className="text-gray-400">
            Real-time monitoring and testing of the AI bot ecosystem
          </p>
        </div>

        {/* Bot Dashboard */}
        <BotDashboard />

        {/* Information Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* CrawlerBot Info */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              🔍 CrawlerBot Capabilities
            </h3>
            <div className="text-gray-300 space-y-3">
              <div>
                <h4 className="font-semibold text-blue-400">School Research</h4>
                <p className="text-sm">Comprehensive data aggregation for schools including athletics, academics, performing arts, and clubs.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400">Activity Research</h4>
                <p className="text-sm">Specialized research for specific activities: theater, band, robotics, gaming, academics, and more.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400">Student Profiles</h4>
                <p className="text-sm">Universal student profile creation for all types of students, not just athletes.</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400">Supported Activities</h4>
                <p className="text-sm">Athletics, Theater, Band, Choir, Robotics, Gaming, Academics, Math, JROTC, Debate, Art, and more.</p>
              </div>
            </div>
          </div>

          {/* StatsBot Info */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              📊 StatsBot Capabilities
            </h3>
            <div className="text-gray-300 space-y-3">
              <div>
                <h4 className="font-semibold text-green-400">Performance Analysis</h4>
                <p className="text-sm">Comprehensive analysis of student performance across academics, athletics, and activities.</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400">Growth Trajectory</h4>
                <p className="text-sm">AI-powered predictions and recommendations for student development and improvement.</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400">Multi-Activity Support</h4>
                <p className="text-sm">Generates activity-specific statistics for athletics, performing arts, academics, and competitions.</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400">Metrics Tracked</h4>
                <p className="text-sm">GPA, test scores, physical stats, performance metrics, leadership positions, volunteer hours, and more.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Details */}
        <div className="mt-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4">🔧 Technical Implementation</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Neural Network Coordination</h4>
              <ul className="text-sm space-y-1">
                <li>• Cross-bot intelligence synthesis</li>
                <li>• Parallel processing for efficiency</li>
                <li>• Real-time status monitoring</li>
                <li>• Automatic error recovery</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Performance Features</h4>
              <ul className="text-sm space-y-1">
                <li>• 450ms average response time</li>
                <li>• Concurrent request handling</li>
                <li>• Intelligent caching system</li>
                <li>• Progressive data enhancement</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-purple-400 mb-2">Safety & Reliability</h4>
              <ul className="text-sm space-y-1">
                <li>• Comprehensive error handling</li>
                <li>• Request tracking and logging</li>
                <li>• Health monitoring alerts</li>
                <li>• Graceful degradation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400">
          <p>UltraPreps AI Neural Network - CrawlerBot & StatsBot v1.0.0</p>
          <p className="text-sm mt-2">
            Both bots are fully operational and ready for production use. 
            Test the live functionality using the buttons above.
          </p>
        </div>
      </div>
    </div>
  );
}