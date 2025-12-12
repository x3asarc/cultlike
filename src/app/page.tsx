import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6 tracking-tight">
          Cultural Events
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
          Discover theater, opera, concerts, and art that matches your taste. 
          Start with a simple quiz to find your perfect cultural experience.
        </p>
        
        {/* CTA Button */}
        <Link
          href="/quiz"
          className="inline-block bg-black text-white px-12 py-4 text-lg font-medium hover:bg-gray-800 transition-colors duration-200 rounded-sm"
        >
          Start Discovery Quiz
        </Link>
        
        {/* Secondary CTA */}
        <div className="mt-8">
          <Link
            href="/events"
            className="text-gray-500 hover:text-gray-700 underline text-lg"
          >
            or browse all events
          </Link>
        </div>
      </div>
      
      {/* Feature Preview */}
      <div className="mt-24 max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        <div className="text-center p-6">
          <div className="text-3xl mb-4">🎭</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Personalized</h3>
          <p className="text-gray-600">
            Answer 3 simple questions to get events curated for your taste
          </p>
        </div>
        
        <div className="text-center p-6">
          <div className="text-3xl mb-4">📍</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Local</h3>
          <p className="text-gray-600">
            Find cultural events happening in your area with precise location filtering
          </p>
        </div>
        
        <div className="text-center p-6">
          <div className="text-3xl mb-4">🎫</div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Direct Booking</h3>
          <p className="text-gray-600">
            Book tickets directly through trusted partners like Eventbrite
          </p>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-24 text-center text-gray-400 text-sm">
        <p>Cultural Events Platform • Built for discovering great experiences</p>
      </footer>
    </div>
  )
}