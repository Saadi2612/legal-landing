"use client";

import React, { useRef } from "react";

import { motion, useTransform, useScroll } from "framer-motion";
import { testimonials } from "@/constants";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
} from "@nextui-org/react";
import { dmSans } from "@/utils";

const TestimonialCarousel = () => {
  return (
    <div className="w-full">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const cardHeight = 300; // Set the height of a single card (adjust as needed)
  const totalHeight = testimonials.length * cardHeight;

  const x = useTransform(scrollYProgress, [0, 1], ["2%", `-${totalHeight}px`]);

  return (
    <section
      ref={targetRef}
      className="relative"
      style={{ height: `${totalHeight * 2}px` }}
    >
      <div className="sticky top-0 flex w-full h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4 w-full">
          {testimonials.map((item, index) => {
            return <CardContainer testimonial={item} key={item.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const CardContainer = ({ testimonial }) => {
  return (
    <Card
      isHoverable
      shadow="none"
      key={testimonial.id}
      className="group relative flex flex-col justify-center items-center p-1 border border-blue-500/20"
      style={{ backgroundColor: "white" }}
    >
      <CardHeader className="w-full">
        <div className="rounded-lg border border-blue-700/80 p-0.5">
          <Avatar
            size="md"
            name={testimonial.name}
            className="text-blue-800/90 border border-blue-700/80 bg-blue-500/30 rounded-md"
          />
        </div>
      </CardHeader>
      <CardBody className={`${dmSans.className} text-gray-800 font-extralight`}>
        {testimonial.testimonial}
      </CardBody>
      <CardFooter className="flex flex-col">
        <h3
          className={`${dmSans.className} text-lg text-blue-800 font-semibold`}
        >
          {testimonial.name}
        </h3>
        <h4 className={`${dmSans.className} text-sm text-gray-500`}>
          {testimonial.occupation}
        </h4>
      </CardFooter>
    </Card>
  );
};

export default TestimonialCarousel;
