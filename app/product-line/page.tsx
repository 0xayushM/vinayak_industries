import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ProductLinePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Product Line</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Diverse range of plastic injection molded products serving multiple industries.
          </p>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Industries We Serve</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-pink-50 to-white border border-pink-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Automotive</h3>
              <p className="text-gray-600 mb-4">
                Interior and exterior components, under-hood parts, and specialized automotive applications.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Dashboard components</li>
                <li>• Door handles & trim</li>
                <li>• Engine covers</li>
                <li>• Lighting housings</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Electronics</h3>
              <p className="text-gray-600 mb-4">
                Precision housings, connectors, and components for consumer and industrial electronics.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Device enclosures</li>
                <li>• Connector housings</li>
                <li>• Control panels</li>
                <li>• Cable management</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Medical</h3>
              <p className="text-gray-600 mb-4">
                FDA-compliant medical device components and healthcare products with strict quality standards.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Diagnostic equipment</li>
                <li>• Surgical instruments</li>
                <li>• Medical housings</li>
                <li>• Lab equipment</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Consumer Goods</h3>
              <p className="text-gray-600 mb-4">
                Household products, appliances, and consumer items with focus on aesthetics and durability.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Appliance components</li>
                <li>• Storage containers</li>
                <li>• Kitchen products</li>
                <li>• Home accessories</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-white border border-orange-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Industrial</h3>
              <p className="text-gray-600 mb-4">
                Heavy-duty industrial components, machinery parts, and specialized industrial applications.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Machine components</li>
                <li>• Safety equipment</li>
                <li>• Tool housings</li>
                <li>• Industrial containers</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Telecommunications</h3>
              <p className="text-gray-600 mb-4">
                Network equipment housings, communication device components, and infrastructure parts.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Router housings</li>
                <li>• Antenna components</li>
                <li>• Cable accessories</li>
                <li>• Network equipment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Solutions */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Custom Solutions for Your Industry</h2>
            <p className="text-xl text-gray-600 mb-8">
              Don't see your industry listed? We work with clients across diverse sectors to develop 
              custom plastic injection molding solutions tailored to specific requirements.
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-colors">
              Discuss Your Project
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
