import React from "react";

import { FaChalkboardTeacher, FaSearch } from "react-icons/fa";
import {
  FaHandshakeSimple,
  FaBookBookmark,
  FaPeopleGroup,
  FaScaleBalanced,
} from "react-icons/fa6";
import { TbWriting } from "react-icons/tb";
import { AiOutlineFileSearch } from "react-icons/ai";
import { dmSans, dmSerifDisplay } from "@/utils";

import { features } from "@/constants";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

const Features = () => {
  return (
    <section className="w-full px-2 py-8 z-0">
      <div className="w-full flex flex-col justify-center items-center p-4 gap-4">
        <h1
          className={`${dmSerifDisplay.className} py-2 text-5xl text-blue-800`}
        >
          Features
        </h1>

        <div className="flex justify-center items-stretch flex-wrap w-full max-w-6xl gap-5 py-4">
          {features.map((feature, index) => (
            <Card
              shadow="none"
              key={index}
              className="w-full max-w-xs flex flex-col justify-center items-center p-1 border border-blue-500/20 bg-blue-800"
              // style={{ backgroundColor: "white" }}
            >
              <CardHeader className="w-full flex justify-start items-center">
                {/* wrap in border with purple color scheme*/}
                <div className="rounded-lg border border-white p-0.5">
                  <div className="text-xl text-white p-2 rounded-md border border-white bg-transparent">
                    {feature.icon}
                  </div>
                </div>
              </CardHeader>
              <CardBody className="gap-1">
                <h3
                  className={`${dmSans.className} text-2xl text-blue-100 font-semibold`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`${dmSans.className} text-base text-gray-100 font-extralight`}
                >
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
