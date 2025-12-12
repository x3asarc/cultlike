import Link from 'next/link'

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-light text-gray-900">
              Cultural Events
            </Link>
            <div className="flex space-x-6 text-sm">
              <Link href="/quiz" className="text-gray-600 hover:text-gray-900">
                Quiz
              </Link>
              <Link href="/events" className="text-gray-900 font-medium">
                Events
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Page Title */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 tracking-tight">
            All Events
          </h1>
          <p className="text-lg text-gray-600 font-light">
            Discover upcoming cultural events across Vienna
          </p>
        </div>
        
        {/* Filters Bar */}
        <div className="mb-12 bg-gray-50 rounded-lg p-6">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>All Locations</option>
                <option>Innere Stadt</option>
                <option>Leopoldstadt</option>
                <option>Mariahilf</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>All Types</option>
                <option>Opera</option>
                <option>Theater</option>
                <option>Classical Concert</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Month
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>All Months</option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price Range
              </label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option>All Prices</option>
                <option>Under €50</option>
                <option>€50-€100</option>
                <option>€100+</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Mock Event Cards */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-100 flex items-center justify-center text-4xl">
                🎭
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-medium text-gray-900">
                    Mock Event {i}
                  </h3>
                  <span className="text-sm text-gray-500">€{50 + i * 10}</span>
                </div>
                <p className="text-gray-600 mb-2">Wiener Staatsoper</p>
                <p className="text-sm text-gray-500 mb-4">Jan {15 + i}, 2025</p>
                <button className="w-full bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800 transition-colors text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-100 text-gray-900 px-8 py-3 rounded-sm hover:bg-gray-200 transition-colors">
            Load More Events
          </button>
        </div>
        
        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Event listing will be populated from Vienna seed data once database is connected
          </p>
        </div>
      </main>
    </div>
  )
}