"use client";

import { motion } from "framer-motion";
import React from "react";

function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-22 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-12">
          Loved by developers worldwide
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "John Doe",
              role: "Frontend Developer",
              quote:
                "Tailwind CSS has completely revolutionized my workflow. It's intuitive, flexible, and incredibly powerful.",
            },
            {
              name: "Jane Smith",
              role: "UI/UX Designer",
              quote:
                "As a designer, I love how Tailwind allows me to quickly prototype and iterate on designs without leaving my HTML.",
            },
            {
              name: "Mike Johnson",
              role: "Full Stack Developer",
              quote:
                "The utility-first approach of Tailwind has made my projects more maintainable and significantly faster to develop.",
            },
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-slate-700 rounded-lg p-6 shadow-lg hover:bg-slate-600 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-slate-300 mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-600 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-slate-400">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
