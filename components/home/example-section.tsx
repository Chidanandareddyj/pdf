"use client";

import { motion } from "framer-motion";
import React from "react";
import { Button } from "../ui/button";

function ExampleSection() {
  return (
    <section className="py-10 sm:py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-12 items-center">
        <motion.div
            className=" bg-slate-800  p-6 md:p-6 shadow-4xl backdrop-blur bg-transparent bg-slate-200 mt-8 md:mt-0 hidden lg:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
         <svg width="300" height="300" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_105_589)"> <path fill-rule="evenodd" clip-rule="evenodd" d="M100 24.8588L66.6667 0V66.6665H0L24.8588 99.9999L2.91409e-06 133.333H66.6667V66.6667H133.333V0L100 24.8588ZM175.141 100L200 66.6668H133.333L133.333 133.333H66.6667L66.6667 200L100 175.141L133.333 200L133.333 133.333L200 133.333L175.141 100Z" fill="url(#paint0_linear_105_589)"/> </g> <defs> <linearGradient id="paint0_linear_105_589" x1="27.5" y1="29" x2="149" y2="174.5" gradientUnits="userSpaceOnUse"> <stop stop-color="#FFD9A0"/> <stop offset="1" stop-color="#FFF5F1"/> </linearGradient> <clipPath id="clip0_105_589"> <rect width="200" height="200" fill="white"/> </clipPath> </defs> </svg>
          </motion.div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-4 md:mb-6">
              Build whatever you want, seriously.
            </h2>
            <p className="text-base sm:text-lg text-slate-300 mb-6 md:mb-8">
              Because Tailwind is so low-level, it never encourages you to
              design the same site twice. Even with the same color palette and
              sizing scale, it's easy to build the same component with a
              completely different look in the next project.
            </p>
            <Button className="bg-sky-500  hover:bg-sky-400 text-white font-semibold h-10 md:h-12 px-4 md:px-6 rounded-lg transition-colors">
              Browse components
            </Button>
          </div>
         
        </div>
      </div>
    </section>
  );
}

export default ExampleSection;
