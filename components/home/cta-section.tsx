import React from "react";
import { Button } from "../ui/button";

function CTASection() {
  return (
    <section className="py-20 sm:py-32 mb-20 px-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
          Ready to get started?
        </h2>
        <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
          Get started with Tailwind CSS today and experience the power of
          utility-first CSS for yourself.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button className="bg-sky-500 hover:bg-sky-400 text-white font-semibold h-12 px-8 rounded-lg transition-colors">
            Get started for free
          </Button>
          <Button
            variant="outline"
            className="text-black border-slate-600 hover:bg-slate-200 h-12 px-8 rounded-lg transition-colors"
          >
            View documentation
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
