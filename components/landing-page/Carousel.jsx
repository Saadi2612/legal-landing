"use client";

import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import { testimonials } from "@/constants"; // Import your testimonials data

import "./CarouselStyles.css";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import { dmSans } from "@/utils";
import { useEffect } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Carousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const testimonialIndex = wrap(0, testimonials.length, page);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollTo = (index) => {
    emblaApi && emblaApi.scrollTo(index);
  };

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect(); // for initial index
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  return (
    <div className="w-full h-full p-4 flex flex-col justify-center items-center">
      <div className="flex justify-end w-full gap-2 my-2">
        <button
          onClick={() => emblaApi.scrollPrev()}
          className="p-3 bg-blue-500/0 hover:bg-blue-500/30 active:scale-95 border border-blue-500/20 text-blue-700 rounded-lg duration-200"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={() => emblaApi.scrollNext()}
          className="p-3 bg-blue-500/0 hover:bg-blue-500/30 active:scale-95 border border-blue-500/20 text-blue-700 rounded-lg duration-200"
        >
          <FaArrowRight />
        </button>
      </div>
      <div ref={emblaRef} className="w-full overflow-hidden">
        {/* Embla Container */}
        <div className="flex w-full max-w-2xl gap-2">
          {/* Embla Slide */}
          {testimonials.map((testimony, index) => (
            <Card
              isHoverable
              shadow="none"
              key={testimony.id}
              className="group relative flex-[0_0_100%] max-w-2xl min-w-0 p-1 border border-blue-500/20"
              style={{ backgroundColor: "white" }}
            >
              <CardHeader className="w-full">
                <div className="rounded-lg border border-blue-700/80 p-0.5">
                  <Avatar
                    size="md"
                    name={testimony.name}
                    className="text-blue-800/90 border border-blue-700/80 bg-blue-500/30 rounded-md"
                  />
                </div>
              </CardHeader>
              <CardBody
                className={`${dmSans.className} text-gray-800 font-extralight`}
              >
                {testimony.testimonial}
              </CardBody>
              <CardFooter className="flex flex-col">
                <h3
                  className={`${dmSans.className} text-lg text-blue-800 font-semibold`}
                >
                  {testimony.name}
                </h3>
                <h4 className={`${dmSans.className} text-sm text-gray-500`}>
                  {testimony.occupation}
                </h4>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === selectedIndex ? "bg-blue-800" : "bg-gray-300"
            }`}
            onClick={() => scrollTo(index)}
            aria-label={`Slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
