import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EquipmentGrid from "@/components/EquipmentGrid";

export default function CapabilitiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Manufacturing Capabilities</h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            State-of-the-art equipment and advanced manufacturing processes to deliver exceptional results.
          </p>
        </div>
      </section>

      {/* Equipment Overview */}
      <section className="py-16 px-6 bg-gradient-to-br from-gray-800 to-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Equipment</h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl">
            Our facility houses 25 injection molding machines ranging from 30 to 2800 tons,
            allowing us to handle a wide variety of project sizes and complexities.
          </p>
          <EquipmentGrid />
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Technical Capabilities</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tonnage Range</h3>
              <p className="text-3xl font-bold text-pink-500 mb-2">30 - 2800</p>
              <p className="text-gray-600">tons capacity</p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Shot Size</h3>
              <p className="text-3xl font-bold text-pink-500 mb-2">Up to 150</p>
              <p className="text-gray-600">ounces</p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mold Size</h3>
              <p className="text-3xl font-bold text-pink-500 mb-2">Up to 100"</p>
              <p className="text-gray-600">x 100" platen size</p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Cycle Time</h3>
              <p className="text-3xl font-bold text-pink-500 mb-2">Optimized</p>
              <p className="text-gray-600">for efficiency</p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Materials</h3>
              <p className="text-3xl font-bold text-pink-500 mb-2">All Types</p>
              <p className="text-gray-600">thermoplastics</p>
            </div>

            <div className="border border-gray-200 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Tolerance</h3>
              <p className="text-3xl font-bold text-pink-500 mb-2">±0.001"</p>
              <p className="text-gray-600">precision capability</p>
            </div>
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">Materials We Work With</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We have extensive experience working with a wide range of thermoplastic materials 
            to meet your specific application requirements.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "ABS", desc: "Acrylonitrile Butadiene Styrene" },
              { name: "PP", desc: "Polypropylene" },
              { name: "PE", desc: "Polyethylene (HDPE/LDPE)" },
              { name: "PC", desc: "Polycarbonate" },
              { name: "Nylon", desc: "Polyamide (PA6/PA66)" },
              { name: "POM", desc: "Acetal/Delrin" },
              { name: "TPE", desc: "Thermoplastic Elastomer" },
              { name: "PVC", desc: "Polyvinyl Chloride" },
            ].map((material, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{material.name}</h3>
                <p className="text-sm text-gray-600">{material.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Capabilities */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Process Capabilities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-Shot Molding</h3>
              <p className="text-gray-600">
                Two-shot and overmolding capabilities for complex multi-material parts.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Insert Molding</h3>
              <p className="text-gray-600">
                Integration of metal inserts and other components during the molding process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Finishes</h3>
              <p className="text-gray-600">
                Texture, color matching, and surface finishing options available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
