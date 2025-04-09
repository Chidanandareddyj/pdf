"use client";

import { motion } from 'framer-motion'
import { Code, Zap, Palette, Layout, Users, ChevronRight } from 'lucide-react'
import React from 'react'

function FeaturesSection() {
  return (
    <section className="py-5 lg:py-20 pb-20 backdrop-blur-sm">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center mb-12">
        Everything you need to build modern UIs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            icon: <Code className="h-8 w-8 text-sky-500" />,
            title: "Developer experience",
            description:
              "A fully-featured developer environment with instant reloads and an integrated component browser.",
          },
          {
            icon: <Zap className="h-8 w-8 text-sky-500" />,
            title: "Lightning-fast builds",
            description:
              "Tailwind automatically removes all unused CSS in production, meaning your final build is as small as it could possibly be.",
          },
          {
            icon: <Palette className="h-8 w-8 text-sky-500" />,
            title: "Customization",
            description:
              "Easily customize your design system to match your brand using our powerful theming features.",
          },
          {
            icon: <Layout className="h-8 w-8 text-sky-500" />,
            title: "Beautiful UI components",
            description:
              "Over 500+ professionally designed, fully responsive UI components, ready to be copied and pasted into your projects.",
          },
          {
            icon: <Users className="h-8 w-8 text-sky-500" />,
            title: "Collaborative",
            description:
              "Built to be shared. Tailwind UI makes it easy for your entire team to contribute to your design system.",
          },
          {
            icon: <ChevronRight className="h-8 w-8 text-sky-500" />,
            title: "Ready for production",
            description:
              "Tailwind is used by tens of thousands of companies, and is battle-tested in production environments.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            className="bg-slate-800 rounded-lg shadow-lg p-6 hover:bg-slate-700 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-slate-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default FeaturesSection