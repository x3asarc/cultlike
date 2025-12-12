import Link from 'next/link'

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Back Link */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="text-gray-500 hover:text-gray-700 text-sm">
          ← Back to Home
        </Link>
      </div>
      
      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-light text-gray-900 mb-8 tracking-tight">
          Cultural Discovery Quiz
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 mb-12 font-light max-w-2xl mx-auto">
          Answer 3 quick questions to find cultural events perfectly matched to your taste.
        </p>
        
        {/* Quiz Step Placeholder */}
        <div className="bg-gray-50 rounded-lg p-12 mb-8">
          <div className="text-6xl mb-6">🎭</div>
          <h2 className="text-2xl font-medium text-gray-900 mb-4">
            Step 1: Choose Your Location
          </h2>
          <p className="text-gray-600 mb-8">
            Where would you like to discover cultural events?
          </p>
          
          {/* Mock Location Bubbles */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="bg-white border border-gray-200 px-6 py-3 rounded-full hover:border-gray-400 transition-colors">
              Innere Stadt
            </button>
            <button className="bg-white border border-gray-200 px-6 py-3 rounded-full hover:border-gray-400 transition-colors">
              Leopoldstadt  
            </button>
            <button className="bg-white border border-gray-200 px-6 py-3 rounded-full hover:border-gray-400 transition-colors">
              Mariahilf
            </button>
            <button className="bg-white border border-gray-200 px-6 py-3 rounded-full hover:border-gray-400 transition-colors">
              Neubau
            </button>
            <button className="bg-white border border-gray-200 px-6 py-3 rounded-full hover:border-gray-400 transition-colors">
              Josefstadt
            </button>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mb-8">
          <div className="w-8 h-1 bg-gray-900 rounded"></div>
          <div className="w-8 h-1 bg-gray-200 rounded"></div>
          <div className="w-8 h-1 bg-gray-200 rounded"></div>
        </div>
        
        {/* Note */}
        <p className="text-gray-400 text-sm">
          Quiz functionality will be implemented with interactive components
        </p>
      </div>
    </div>
  )
}