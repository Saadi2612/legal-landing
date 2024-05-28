import React from "react";

import { Image } from "@nextui-org/react";
import { dmSans, dmSerifDisplay } from "@/utils";

const Hero = () => {
  return (
    <section className="w-full min-h-lvh flex flex-col justify-center px-2 items-center overflow-x-hidden pt-16 md:pt-24 pb-14 relative">
      {/* <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/assets/bg-dots-1.svg"
          className="object-cover w-full h-full"
          width={10000}
          radius="none"
        />
      </div> */}
      <div className="absolute top-0 left-0 w-screen h-lvh bg-[url(/assets/bg-dots-2.svg)] bg-no-repeat bg-cover z-0" />

      <div className="mx-auto mt-24 z-[1]">
        <div className="w-auto h-auto mt-auto px-2 sm:px-12 flex flex-col justify-center items-center bg-gradient-to-t from-white/30 via-white/80 to-white/30">
          <div className="w-full max-w-6xl text-center space-y-4 py-6">
            <h1
              className={`${dmSerifDisplay.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-gray-800`}
            >
              <span className="text-blue-800">Optillus Legal AI </span>
              is the answer to the complexities of legal research and brief
              creation.
            </h1>
            <h4
              className={`${dmSans.className} text-sm sm:text-lg text-gray-700 font-normal`}
            >
              We enable lawyers and law firms to use the power of LLM to enhance
              efficiency in legal research and simplify the creation of legal
              briefs and other legal documents.
            </h4>
            <h4
              className={`${dmSans.className} text-sm sm:text-lg text-gray-700 font-normal`}
            >
              Our platform empowers you to iterate through millions of cases
              effortlessly, automatically generating persuasive arguments
              tailored to your needs. Say goodbye to tedious manual research and
              hello to a seamless, time-saving solution.
            </h4>
          </div>
        </div>
        {/* absolute top-1/2 left-1/2 -translate-x-[50%] translate-y-[25%] */}
        <div className="w-full mx-auto mt-2 sm:mt-8 px-2 md:px-16 grid place-items-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] size-full blur-2xl opacity-20 bg-gradient-radial from-blue-600/70 from-50% to-blue-600/10" />

          {/* shadow-[0_0_80px_rgba(71,71,224,0.6)] */}
          <div className="w-full max-w-screen-lg rounded-2xl">
            <Image
              removeWrapper
              src="/assets/hero-img-3.svg"
              alt="chat ui"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
