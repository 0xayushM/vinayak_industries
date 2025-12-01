export default function HeroSection() {
  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 py-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
              Leading Plastic Injection Molding Manufacturer
            </h1>
            <p className="text-2xl text-blue-600 font-semibold mb-8">
              in Southern California
            </p>
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3.5 rounded-full font-medium text-lg transition-colors">
              Get a Custom Quote
            </button>
          </div>
          <div className="relative">
            <div className="aspect-video bg-gray-800 rounded-3xl overflow-hidden relative">
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/lnv8oNVRIi8"
                title="Vinayak Industries Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
