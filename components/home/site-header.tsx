"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Menu } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm w-full py-4">
      <nav className="container mx-auto flex items-center justify-between h-14 rounded-full shadow-md border border-gray-800/50 px-5">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500">
            PDFthing
          </Link>
        </div>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <SignedIn>
            <Link
              href="#"
              className="font-medium text-slate-300 hover:text-white hover:scale-105 transition-all"
            >
              Summaries
            </Link>
          </SignedIn>
          <Link
            href="#"
            className="font-medium text-slate-300 hover:text-white hover:scale-105 transition-all"
          >
            Blog
          </Link>
        </div>
        
        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          {/* Signed in state */}
          <SignedIn>
            <div className="flex items-center space-x-4">
              <Link
                href="/upload"
                className="hidden md:inline-flex font-medium text-slate-300 hover:text-white hover:scale-105 transition-all"
              >
                Upload a PDF
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>

          {/* Signed out state */}
          <SignedOut>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="hidden md:flex items-center text-slate-400 border-slate-700 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 mr-2"
                >
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"></path>
                </svg>
                Sign in
              </Button>
            </Link>
          </SignedOut>
        </div>
      </nav>
      
      {/* Mobile menu - you can add this if needed */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black/90 border-b border-gray-800 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <SignedIn>
              <Link
                href="#"
                className="font-medium text-slate-300 hover:text-white transition-all py-2"
              >
                Summaries
              </Link>
            </SignedIn>
            <Link
              href="#"
              className="font-medium text-slate-300 hover:text-white transition-all py-2"
            >
              Blog
            </Link>
            <SignedIn>
              <Link
                href="/upload"
                className="font-medium text-slate-300 hover:text-white transition-all py-2"
              >
                Upload a PDF
              </Link>
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in" className="py-2">
                <Button variant="outline" className="w-full justify-center text-slate-400 border-slate-700">
                  Sign in
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      )}
    </header>
  );
}

export default SiteHeader;
