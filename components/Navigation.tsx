import Image from "next/image";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Image
          src="/logo/logo.png"
          alt="Vinayak Industries Logo"
          width={120}
          height={60}
          className="object-contain"
        />
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-gray-800 hover:text-gray-600 font-medium">About Us</a>
          <a href="#equipment" className="text-gray-800 hover:text-gray-600 font-medium">Equipment</a>
          <a href="#services" className="text-gray-800 hover:text-gray-600 font-medium">Services</a>
          <a href="#industries" className="text-gray-800 hover:text-gray-600 font-medium">Industries</a>
          <a href="#quality" className="text-gray-800 hover:text-gray-600 font-medium">Quality</a>
          <a href="#contact" className="text-gray-800 hover:text-gray-600 font-medium">Contact</a>
          <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
            Get a Custom Quote
          </button>
        </div>
      </div>
    </nav>
  );
}
