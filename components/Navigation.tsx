'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import DownloadDialog from "./DownloadDialog";
import { Download } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/offerings", label: "Offerings" },
    { href: "/capabilities", label: "Capabilities" },
    { href: "/product-line", label: "Products" },
    { href: "/moulding", label: "Moulds" },
    { href: "/ev", label: "EV" },
    { href: "/media", label: "Media" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if scrolled past 60vh (hero section height)
      const heroHeight = window.innerHeight * 0.6;
      setIsScrolled(window.scrollY > heroHeight - 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-8xl mx-auto px-(--spacing-gutter) py-3 2xl:py-4 flex items-center justify-between gap-4">
        <Link href="/" onClick={closeMenu} className="shrink-0">
          <Image
            src="/logo/logo1.png"
            alt="Vinayak Industries Logo"
            width={100}
            height={60}
            className={`w-20 xl:w-24 2xl:w-28 h-auto object-contain cursor-pointer transition-all duration-300 ${
              isScrolled ? 'brightness-0' : 'brightness-0 invert'
            }`}
          />
        </Link>

        {/* Desktop Menu — below xl the 8 links + 2 buttons no longer fit, so we
            fall back to the hamburger rather than letting labels wrap. */}
        <div className="hidden xl:flex items-center gap-4 2xl:gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm 2xl:text-base font-bold whitespace-nowrap transition-colors relative ${
                pathname === link.href
                  ? "text-amber-500"
                  : isScrolled
                    ? "text-gray-800 hover:text-amber-500"
                    : "text-white hover:text-amber-500"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute -bottom-[18px] 2xl:-bottom-[21px] left-0 right-0 h-0.5 bg-amber-500"></span>
              )}
            </Link>
          ))}
          <button
            onClick={() => setIsDialogOpen(true)}
            className={`text-sm 2xl:text-base font-bold whitespace-nowrap transition-colors flex items-center gap-1.5 2xl:gap-2 ${
              isScrolled
                ? "text-gray-800 hover:text-amber-500"
                : "text-white hover:text-amber-500"
            }`}
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="hidden 2xl:inline">Download Brochure</span>
            <span className="2xl:hidden">Brochure</span>
          </button>
          <Link href="/contact" className="shrink-0">
            <button className="bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm 2xl:text-base px-4 2xl:px-6 py-2 2xl:py-2.5 rounded-full font-medium whitespace-nowrap transition-colors">
              Get a Quote
            </button>
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          onClick={toggleMenu}
          className={`xl:hidden p-2 transition-colors ${
            isScrolled ? 'text-gray-800 hover:text-amber-500' : 'text-white hover:text-amber-500'
          }`}
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
        className={`xl:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-y-auto ${
          isMenuOpen ? "max-h-[calc(100vh-5rem)] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-(--spacing-gutter) py-4 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className={`block py-2 font-medium transition-colors ${
                pathname === link.href
                  ? "text-amber-500"
                  : "text-gray-800 hover:text-amber-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={() => {
              setIsDialogOpen(true);
              closeMenu();
            }}
            className="w-full text-left py-2 font-medium text-gray-800 hover:text-amber-500 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Brochure
          </button>
          <Link href="/contact" onClick={closeMenu} className="block">
            <button className="w-full bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 lg:px-6 lg:py-2.5 rounded-full font-medium transition-colors">
              Get a Custom Quote
            </button>
          </Link>
        </div>
      </div>
      
      <DownloadDialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} />
    </nav>
  );
}
