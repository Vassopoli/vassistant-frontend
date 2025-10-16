"use client";

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          <Link href="/">Vassistant</Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link href="/message" className="text-gray-300 hover:text-white">Message</Link>
          <Link href="/financial" className="text-gray-300 hover:text-white">Financial</Link>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link href="/" className="block text-gray-300 hover:text-white px-2 py-1">Home</Link>
          <Link href="/message" className="block text-gray-300 hover:text-white px-2 py-1">Message</Link>
          <Link href="/financial" className="block text-gray-300 hover:text-white px-2 py-1">Financial</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;