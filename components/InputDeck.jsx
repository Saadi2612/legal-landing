"use client";

import React, { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import { Tooltip } from "@chakra-ui/react";
import { PiPaperPlaneRightFill, PiPlusBold } from "react-icons/pi";
import { SiAdobeacrobatreader } from "react-icons/si";
import { RxCross2 } from "react-icons/rx";
import { dmSans } from "@/utils";

const PdfViewer = dynamic(() => import("@/components/PdfViewer.jsx"), {
  ssr: false,
});

const InputDeck = React.memo(
  ({
    message,
    setMessage,
    pdfFile,
    setPdfFile,
    sendHandler,
    isSendingDisabled,
  }) => {
    const [showPdfClose, setShowPdfClose] = useState(false);

    const textAreaRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
      setMessage(e.target.value);
    };

    const handleFileInput = (e) => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleFileChange = (e) => {
      setPdfFile(e.target.files[0]);
    };

    useEffect(() => {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }, [message]);

    return (
      <div className="w-full h-auto flex flex-col border-2 border-gray-200 focus-within:border-blue-800 duration-300 rounded-2xl">
        <div className="w-full h-full flex flex-col justify-end p-2">
          <div className="w-full ">
            <textarea
              value={message}
              rows={1}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  //Stops enter from creating a new line
                  if (message.trim() && !isSendingDisabled) {
                    e.preventDefault();
                    sendHandler();
                    return true;
                  } else {
                    e.preventDefault();
                    return false;
                  }
                }
              }}
              ref={textAreaRef}
              className={`w-full h-full resize-none active:outline-none focus:outline-none text-gray-800 bg-white ${dmSans.className} `}
              placeholder="Type your message..."
            />
          </div>

          {/* <div className="w-auto my-2">
            {pdfFile && (
              <div
                className="p-2 flex items-center rounded-lg w-[20%] gap-2 bg-gray-900 relative"
                onMouseOver={() => setShowPdfClose(true)}
                onMouseLeave={() => setShowPdfClose(false)}
              >
                {showPdfClose && (
                  <button
                    onClick={() => setPdfFile(null)}
                    className="absolute -top-2 -right-2 p-0.5 rounded-full bg-gray-400"
                  >
                    <RxCross2 color="black" />
                  </button>
                )}
                <div className="bg-transparent rounded-md overflow-hidden h-10 w-10">
                  {pdfFile ? (
                    <div className="bg-gray-200">
                      <PdfViewer url={pdfFile} width={50} pageNumber={1} />
                    </div>
                  ) : (
                    <SiAdobeacrobatreader size={24} color="white" />
                  )}
                </div>

                <div className="">
                  <p className="font-semibold text-sm text-gray-100">
                    {pdfFile.name}
                  </p>
                </div>
              </div>
            )}
          </div> */}

          <div className="flex items-end justify-between">
            {/* <div data-tooltip="Upload document" data-tooltip-location="right">
            <button
              onClick={handleFileInput}
              className="p-1 rounded-full text-gray-50 bg-gray-800"
            >
              <PiPlusBold />
            </button>
          </div>

          <input
            onChange={handleFileChange}
            type="file"
            ref={fileInputRef}
            className="hidden"
          /> */}
            <div>
              <span
                className={`text-gray-500 text-xs tracking-tighter ${
                  message.trim() && message.length >= 3
                    ? "opacity-100"
                    : "opacity-0"
                } duration-300`}
              >
                <span className={`font-semibold ${dmSans.className}`}>
                  Shift + Enter
                </span>{" "}
                to add a new line
              </span>
            </div>

            <div data-tooltip="Send message" data-tooltip-location="left">
              <button
                onClick={sendHandler}
                disabled={!message.trim() && isSendingDisabled}
                className={`p-2 rounded-lg ${
                  message.trim() && !isSendingDisabled
                    ? "text-gray-50 bg-blue-800"
                    : "text-gray-400 bg-gray-400/20"
                } duration-200`}
              >
                <PiPaperPlaneRightFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default InputDeck;
