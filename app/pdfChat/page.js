"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Text, Flex, Box } from "@chakra-ui/react";
import Cookies from "js-cookie";
import ChatInterface from "@/components/ChatInterface";
import { useChat } from "@/utils/context_api/ChatContext";
import PdfSidebar from "@/components/PdfSidebar";
import { BACKEND_IP, SOCKET_IP } from "@/utils";

const PdfChat = () => {
  const net_ip = BACKEND_IP;
  const { handleSetChatTitle, selectedChatTitle } = useChat();
  const userToken = Cookies.get("token");
  const url = `${SOCKET_IP}/ws/socket-server/${userToken}/`;
  console.log(selectedChatTitle);
  const [dashLoading, setDashLoading] = useState(false);

  const [briefData, setBriefData] = useState(null);

  console.log(briefData);

  return (
    <Flex height={"100vh"}>
      <Flex flex={0.35}>
        <PdfSidebar briefData={briefData} />
      </Flex>
      <Flex flex={0.75}>
        {dashLoading ? (
          <div className="fixed inset-0 bg-white grid place-items-center">
            <ImSpinner2 size={40} color="black" className="animate-spin" />
          </div>
        ) : (
          <div
            className="py-4 pr-4 flex flex-col text-md bg-white w-full h-full"
            style={{ maxHeight: "100vh" }}
          >
            <div className="w-full mb-3 ">
              <h1 className="text-gray-800">
                {selectedChatTitle &&
                selectedChatTitle.startsWith('"') &&
                selectedChatTitle.endsWith('"')
                  ? selectedChatTitle.slice(1, -1)
                  : selectedChatTitle || "Chat"}
              </h1>
            </div>

            <ChatInterface setBriefData={setBriefData} />
          </div>
        )}
      </Flex>
    </Flex>
  );
};

export default PdfChat;
