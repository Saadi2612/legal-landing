import React from "react";
import { Button, Image } from "@nextui-org/react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full h-auto grid place-items-center p-4 md:p-8 bg-white border-t border-gray-200">
      <div className="w-full max-w-6xl flex flex-col items-center justify-center">
        <div className="w-full flex justify-center items-center p-2">
          <Image
            radius="none"
            src="/assets/optillus-logo.svg"
            alt="logo"
            className="object-cover w-[150px] md:w-[200px]"
          />
        </div>
        <div className="w-auto flex items-center gap-1 p-6">
          <span>
            <FaLocationDot size={18} color="#3559A7" />
          </span>
          <p className="text-sm text-gray-600 font-medium">
            10 Glenlake Pkwy NE Atlanta, GA 30328
          </p>
        </div>

        {/* <Button
          disableRipple
          endContent={
            <IoIosArrowRoundForward
              color="white"
              className="group-hover:translate-x-1 duration-150 size-4 sm:size-5"
            />
          }
          className="relative overflow-visible text-gray-100 text-xs sm:text-base sm:px-6 my-6 shadow-xl hover:bg-black/90 bg-black after:content-[''] after:absolute after:rounded-xl after:inset-0 after:bg-black/15 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 group"
          //   onClick={onOpen}
        >
          Join waiting list
        </Button> */}
      </div>
    </footer>
  );
};

export default Footer;
