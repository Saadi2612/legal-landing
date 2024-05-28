"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Cookies from "js-cookie";
import ChatInterface from "@/components/ChatInterface";
import { useChat } from "@/utils/context_api/ChatContext";
import { BACKEND_IP, SOCKET_IP, dmSans, dmSerifDisplay } from "@/utils";

const Research = () => {
  const net_ip = BACKEND_IP;
  const { handleSetChatTitle, selectedChatTitle } = useChat();
  const userToken = Cookies.get("token");
  const url = `${SOCKET_IP}/ws/user-research/${userToken}/`;
  // console.log(selectedChatTitle);
  const [dashLoading, setDashLoading] = useState(false);

  const [briefData, setBriefData] = useState(null);

  return (
    <>
      {dashLoading ? (
        <div className="fixed inset-0 bg-white grid place-items-center">
          <ImSpinner2 size={40} color="black" className="animate-spin" />
        </div>
      ) : (
        <div
          className=" flex flex-col text-md bg-white w-full h-full"
          style={{ maxHeight: "100vh" }}
        >
          <div className="p-3 w-full mb-3 ">
            <h1
              className={`${dmSans.className} text-[40px] font-bold text-blue-800 tracking-tighter`}
            >
              {selectedChatTitle &&
              selectedChatTitle.startsWith('"') &&
              selectedChatTitle.endsWith('"')
                ? selectedChatTitle.slice(1, -1)
                : selectedChatTitle || "Research"}
            </h1>
          </div>
          <div
            style={{ backgroundColor: "#E8E8E8", height: "1px", width: "100%" }}
          ></div>
          <ChatInterface setBriefData={setBriefData} />
        </div>
      )}
    </>
  );
};

export default Research;
