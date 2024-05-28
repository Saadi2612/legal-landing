import React from "react";

import { motion } from "framer-motion";

import Lottie from "react-lottie";

import successAnimation from "../lottieAnimations/successAnimation.json";
import { RxCross2 } from "react-icons/rx";

const SuccessModal = ({ message, setIsSuccess }) => {
  const defaultOptions = {
    // loop: true,
    autoplay: true,
    animationData: successAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0">
      <motion.div
        className="w-full h-full grid place-items-center bg-black/20 backdrop-blur-sm p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-md h-auto bg-white rounded-xl shadow-xl relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <button
            onClick={() => setIsSuccess(false)}
            className="absolute top-1 right-1"
          >
            <RxCross2 color="black" />
          </button>
          <div className="w-full h-full flex flex-col items-center justify-center p-4">
            <span>
              <Lottie options={defaultOptions} height={200} width={200} />
            </span>
            <div className="py-4 w-full font-bold text-xl text-gray-800 text-center">
              {message}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SuccessModal;
