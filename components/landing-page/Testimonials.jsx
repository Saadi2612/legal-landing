import React from "react";

import { dmSans, dmSerifDisplay } from "@/utils";
import TestimonialCarousel from "./TestimonialCarousel";
import Carousel from "./Carousel";

const Testimonials = () => {
  return (
    <section className="w-full px-2 py-8 z-0">
      <div className="w-full flex flex-col justify-center items-center p-4 gap-4">
        <h1
          className={`${dmSerifDisplay.className} py-2 text-5xl text-gray-500/80`}
        >
          What People <span className="text-blue-800">Say </span> About
          <span className="text-blue-800"> Us</span>
        </h1>

        <div className="w-full max-w-2xl h-auto flex justify-center items-center relative">
          <Carousel />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
