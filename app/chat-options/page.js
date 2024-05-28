"use client";

import React, { useState } from "react";
import { dmSans } from "@/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { MdFindInPage } from "react-icons/md";
import { FaBalanceScale } from "react-icons/fa";
import { LuDot } from "react-icons/lu";

const ChatOptions = () => {
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (value) => {
    // const { value } = event.target;
    setSelectedOption(value);
  };

  const handleProceed = () => {
    let path = selectedOption === "UserResearch" ? "research" : "court-brief";
    router.push(`/dashboard/${path}`);
  };
  //   console.log(selectedOption);
  return (
    <div
      className={`${dmSans.className} w-full h-[100dvh] p-8 sm:p-16 bg-white flex flex-col justify-evenly items-center gap-4`}
    >
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-3xl text-blue-800 font-bold tracking-tight">
          Select a chat type
        </h1>
        <p className="text-gray-500 md:text-base text-sm">
          Please select a chat type to get started
        </p>
      </div>

      <div className="w-full h-full max-h-96 flex sm:flex-row flex-col justify-center items-center gap-4 bg-transparent">
        <div
          className={`w-full max-w-2xl h-full flex flex-col justify-center items-center gap-4 max-h-80 border-1 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl duration-300 ease-in-out ${
            selectedOption === "UserResearch"
              ? "border-blue-700 bg-blue-500/10"
              : "border-gray-200"
          }`}
          onClick={() => handleOptionChange("UserResearch")}
        >
          <span
            className={`text-4xl sm:text-5xl ${
              selectedOption === "UserResearch"
                ? "text-blue-800"
                : "text-gray-600"
            }`}
          >
            <MdFindInPage />
          </span>
          <h1
            className={`text-2xl sm:text-3xl ${
              selectedOption === "UserResearch"
                ? "text-blue-800"
                : "text-gray-600"
            } font-bold`}
          >
            Research
          </h1>

          <div className="w-full flex items-center justify-center text-gray-800 text-sm sm:text-base flex-wrap">
            <p>Chat with AI</p> <LuDot /> <p>General Research</p>
            <LuDot /> <p>No Brief Document creation</p>
          </div>
        </div>
        <div
          className={`w-full max-w-2xl h-full flex flex-col justify-center items-center gap-4 max-h-80 border-1 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl duration-300 ease-in-out ${
            selectedOption === "CourtBrief"
              ? "border-blue-700 bg-blue-500/10"
              : "border-gray-200"
          }`}
          onClick={() => handleOptionChange("CourtBrief")}
        >
          <span
            className={`text-4xl sm:text-5xl ${
              selectedOption === "CourtBrief"
                ? "text-blue-800"
                : "text-gray-600"
            }`}
          >
            <FaBalanceScale />
          </span>

          <h1
            className={`text-2xl sm:text-3xl ${
              selectedOption === "CourtBrief"
                ? "text-blue-800"
                : "text-gray-600"
            } font-bold`}
          >
            Court Brief
          </h1>
          <div className="w-full flex items-center justify-center text-gray-800 text-sm sm:text-base flex-wrap">
            <p>Chat with AI</p> <LuDot /> <p>General Research</p>
            <LuDot /> <p>Brief Document creation</p>
          </div>
        </div>
      </div>

      <div className="h-20">
        <AnimatePresence>
          {selectedOption.trim() && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full flex justify-center items-center"
            >
              <Button
                onClick={handleProceed}
                className="py-2 px-16 text-center bg-blue-800 text-white rounded-lg"
              >
                Proceed
              </Button>
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ChatOptions;
