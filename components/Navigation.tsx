import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo/logo1.png"
            alt="Vinayak Industries Logo"
            width={120}
            height={60}
            className="object-contain cursor-pointer invert"
          />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/about" className="text-gray-800 hover:text-gray-600 font-medium">About Us</Link>
          <Link href="/offerings" className="text-gray-800 hover:text-gray-600 font-medium">Offerings</Link>
          <Link href="/capabilities" className="text-gray-800 hover:text-gray-600 font-medium">Manufacturing Capabilities</Link>
          <Link href="/product-line" className="text-gray-800 hover:text-gray-600 font-medium">Product Line</Link>
          <Link href="/contact" className="text-gray-800 hover:text-gray-600 font-medium">Contact</Link>
          <Link href="/contact">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
              Get a Custom Quote
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
