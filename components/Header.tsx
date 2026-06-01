"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-black/90 shadow-sm sticky top-0 z-50 transition-colors backdrop-blur-md border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors">
          Prime<span className="text-white">Nest</span>
        </Link>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            className="p-2 rounded hover:bg-yellow-500/10 dark:hover:bg-yellow-500/15 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/listings" className="text-gray-200 dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-300 font-medium transition-colors">
            Properties
          </Link>
          <Link href="/favorites" className="text-gray-200 dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-300 font-medium transition-colors">
            Favorites
          </Link>
          <Link href="/about" className="text-gray-200 dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-300 font-medium transition-colors">
            About
          </Link>
          <Link href="/about#contact" className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors">
            Contact
          </Link>
          <ThemeToggle />
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-zinc-950 dark:bg-black border-b border-yellow-400/10 md:hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col p-4 gap-4">
              <Link 
                href="/listings" 
                className="text-gray-200 dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-300 font-medium transition-colors block py-2"
                onClick={() => setIsOpen(false)}
              >
                Properties
              </Link>
              <Link 
                href="/favorites" 
                className="text-gray-200 dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-300 font-medium transition-colors block py-2"
                onClick={() => setIsOpen(false)}
              >
                Favorites
              </Link>
              <Link 
                href="/about" 
                className="text-gray-200 dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-300 font-medium transition-colors block py-2"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/about#contact" 
                className="bg-yellow-500 text-black px-6 py-2 rounded-lg hover:bg-yellow-400 transition-colors block text-center"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
