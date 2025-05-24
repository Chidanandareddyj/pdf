import React from "react";
import { Button } from "../ui/button";

function CTASection() {
  return (
    <section className="py-20 sm:py-32 mb-20 px-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Transform how you work with PDFs
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Extract key insights from your documents instantly with our AI-powered PDF summary tool.
          Save time and focus on what matters.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-sky-500 hover:bg-sky-400 text-white font-semibold h-12 px-8 rounded-lg transition-colors">
            Summarize your first PDF
          </Button>
          <Button
            variant="outline"
            className="text-white border-slate-600 hover:bg-slate-700 h-12 px-8 rounded-lg transition-colors"
          >
            View pricing plans
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
