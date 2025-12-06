'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/offerings", label: "Offerings" },
    { href: "/capabilities", label: "Manufacturing Capabilities" },
    { href: "/product-line", label: "Product Line" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" onClick={closeMenu}>
          <Image
            src="/logo/logo1.png"
            alt="Vinayak Industries Logo"
            width={120}
            height={60}
            className="object-contain cursor-pointer invert"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium transition-colors relative ${
                pathname === link.href
                  ? "text-pink-500"
                  : "text-gray-800 hover:text-gray-600"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-pink-500"></span>
              )}
            </Link>
          ))}
          <Link href="/contact">
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
              Get a Custom Quote
            </button>
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-gray-800 hover:text-pink-500 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            // Close Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // Hamburger Icon
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`block py-2 font-medium transition-colors ${
                pathname === link.href
                  ? "text-pink-500"
                  : "text-gray-800 hover:text-pink-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/contact" onClick={closeMenu} className="block">
            <button className="w-full bg-pink-500 hover:bg-pink-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors">
              Get a Custom Quote
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
