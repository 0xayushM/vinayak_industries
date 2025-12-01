import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            With over 50 years of experience, Vinayak Industries has been a leading plastic injection molding manufacturer in Southern California.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded over five decades ago, Vinayak Industries has grown from a small family-owned business 
                to one of Southern California's most trusted plastic injection molding manufacturers.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Our commitment to quality, innovation, and customer satisfaction has been the cornerstone 
                of our success. We've continuously invested in state-of-the-art equipment and technology 
                to meet the evolving needs of our clients.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we operate 25 injection molding machines ranging from 30 to 2800 tons, 
                allowing us to handle projects of all sizes and complexities.
              </p>
            </div>
            <div className="bg-gray-200 aspect-video rounded-2xl"></div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality First</h3>
              <p className="text-gray-600">
                We maintain the highest standards in every project, ensuring precision and excellence in all our products.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Innovation</h3>
              <p className="text-gray-600">
                Continuously investing in cutting-edge technology and processes to stay ahead of industry trends.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Focus</h3>
              <p className="text-gray-600">
                Building long-term partnerships through exceptional service and understanding our clients' unique needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Our Team</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our dedicated team of over 40 professionals brings decades of combined expertise in 
            plastic injection molding, engineering, and manufacturing.
          </p>
          <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl p-12 text-white text-center">
            <h3 className="text-3xl font-bold mb-4">Join Our Team</h3>
            <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our passion for excellence and innovation.
            </p>
            <button className="bg-white text-pink-500 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors">
              View Open Positions
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
