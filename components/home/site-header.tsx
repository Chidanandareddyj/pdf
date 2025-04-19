"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Search, Menu } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function SiteHeader() {
  const isloggedin = true;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className=" sticky top-0 z-50 backdrop-blur border-none rounded-full w-50 py-5 px-4">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 rounded-full border gap-x-100 shadow-xl border-gray-800">
        <div className="flex items-center justify-center ml-5 text-xl relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500  font-bold">
           <span className="">
            PDFthing
            </span> 
        </div>
        <div className="hidden md:flex space-x-4">
        <SignedIn>
          <Link
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Summaries
          </Link>
          </SignedIn>
         
          <Link
            href="#"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Blog
          </Link>
         
        </div>
        <div className="flex items-center space-x-4">
         
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-slate-400 hover:text-slate-900 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <SignedIn>
            <div className="flex items-center space-x-4">
              <Link
              href="/upload"
              className="hidden md:inline-flex text-slate-400 hover:text-white transition-colors"
              >
              Upload a pdf
              </Link>
              
              <SignedIn>
              <UserButton/>
            </SignedIn>
            </div>
            </SignedIn>

            <SignedOut>
              <Link
              href="/sign-in"
              className="hidden md:inline-flex text-slate-400 hover:text-white transition-colors"
              >
            <Button
              variant="outline"
              className="hidden md:inline-flex text-slate-400 border-slate-700 hover:bg-slate-800 transition-colors"
            >
              <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 mr-2"
              >
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3"></path>
              </svg>
              Sign in
            </Button>
            </Link>
            </SignedOut>

        </div>
      </nav>
    </header>
  );
}

export default SiteHeader;
