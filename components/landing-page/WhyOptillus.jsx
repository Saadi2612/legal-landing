import { dmSans, dmSerifDisplay } from "@/utils";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";

const WhyOptillus = () => {
  return (
    <section className="w-full px-2 py-8 z-0">
      <div className="w-full flex flex-col justify-center items-center p-4 gap-4">
        <h1
          className={`${dmSerifDisplay.className} py-2 text-5xl text-blue-800`}
        >
          <span className="text-gray-500/80">Why</span> Optillus Legal AI
          <span className="text-gray-500/80">?</span>
        </h1>

        <Card
          className="w-full max-w-4xl py-4 px-2 shadow-none border border-blue-500/20"
          style={{ backgroundColor: "white" }}
        >
          <CardBody className="flex flex-col justify-center items-center text-center gap-6">
            <h4 className={`${dmSans.className} text-gray-800`}>
              Our commitment is to empower attorneys with the tools they need to
              thrive in the evolving legal landscape. Optillus Legal AI not only
              addresses the challenges faced in legal research and document
              creation but transforms them into opportunities for growth and
              success.
            </h4>
            <h4 className={`${dmSans.className} text-gray-800`}>
              Join us in revolutionizing legal practices with Optillus Legal AI.
              Elevate your efficiency, elevate your practice!
            </h4>
          </CardBody>
        </Card>

        {/* <div className="w-full max-w-5xl py-2 rounded-xl">
          <video className="w-full h-full rounded-xl" controls={true} autoPlay>
            <source src={"/assets/optillus_video.mp4"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div> */}
      </div>
    </section>
  );
};

export default WhyOptillus;
