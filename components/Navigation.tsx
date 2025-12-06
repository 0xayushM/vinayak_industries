'use client';

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/offerings", label: "Offerings" },
    { href: "/capabilities", label: "Manufacturing Capabilities" },
    { href: "/product-line", label: "Product Line" },
    { href: "/contact", label: "Contact" },
  ];

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
      </div>
    </nav>
  );
}
