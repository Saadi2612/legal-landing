"use client";

import React, { useEffect, useRef, useState } from "react";

import { useRouter, usePathname } from "next/navigation";

import { TiMessages } from "react-icons/ti";
import { MdHistory } from "react-icons/md";
import {
  TbListDetails,
  TbLayoutGrid,
  TbLogout2,
  TbRefresh,
  TbPlus,
} from "react-icons/tb";
import { IoDocumentsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { PiGear } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";

import { motion, AnimatePresence } from "framer-motion";

import {
  getAuthTokenFromCookie,
  removeAuthTokenCookie,
} from "@/utils/cookieUtils";

import Link from "next/link";
import { ImSpinner7 } from "react-icons/im";
import axios from "axios";
import { useChat } from "@/utils/context_api/ChatContext";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Text,
  Flex,
  Select,
} from "@chakra-ui/react";
import SupremeCourt from "./SupremeCourt";
import RespondentBrief from "./RespondentBrief";
import { BACKEND_IP, dmSans } from "@/utils";
import { Button } from "@nextui-org/react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/",
    icon: <TbLayoutGrid size={18} />,
  },
  {
    title: "Chat",
    path: "/chat",
    icon: <TiMessages size={18} />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <FiUser size={18} />,
  },
  {
    title: "Details",
    path: "",
    icon: <TbListDetails size={18} />,
  },
  {
    title: "Settings",
    path: "",
    icon: <PiGear size={18} />,
  },
];

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const PdfSidebar = ({ briefData, setBriefData, isNewChat }) => {
  const router = useRouter();
  const pathName = usePathname();

  const net_ip = BACKEND_IP;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(null);
  const [selectedOption, setSelectedOption] = useState("Brief");
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectChange = (event) => {
    const { value } = event.target;
    setSelectedOption(value);
  };

  const historyContainerRef = useRef();

  const {
    selectedChatId,
    handleChatClick,
    handleSetChatTitle,
    selectedChatTitle,
  } = useChat();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const path = pathName.split("/")[2] === "research";

  const authToken = getAuthTokenFromCookie();
  useEffect(() => {
    if (pathName.split("/")[2] === "research") {
      setIsChatOpen(true);
      getChatHistory(authToken);
    } else {
      setIsChatOpen(false);
    }
  }, [path, pageNumber]);

  // update brief data function

  console.log(briefData);

  const [isUpdating, setIsUpdating] = useState(false);
  const [dataToUpdate, setDataToUpdate] = useState(briefData);

  const fetchBriefPreview = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `${net_ip}/bot/UserBriefView?brief_id=${briefData.brief_id}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        setDataToUpdate(response.data.response.brief_data);
        setIsLoading(false);
      }
      console.log(response.data.message);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (briefData !== null) {
      fetchBriefPreview();
    }
  }, [briefData]);

  useEffect(() => {
    console.log("Chat Is New ===>", isNewChat);
    setDataToUpdate('')
    setBriefData(null)
  }, [isNewChat]);

  useEffect(() => {
    if (briefData === undefined) {
      console.log("in if without dependency condition  ===> ", briefData);
      setDataToUpdate("");
      setBriefData(null);
    }
    console.log("Brief Data ===>", briefData);
    return () => {
      setDataToUpdate("");
      setBriefData(null);
    };
  }, []);

  // useEffect(() => {
  //   setDataToUpdate(briefData);
  // }, [briefData]);

  const handleUpdateBrief = async () => {
    try {
      const body = {
        brief_id: dataToUpdate.brief_id,
        brief_data: dataToUpdate,
      };
      const response = await axios.post(
        `${net_ip}/bot/UserBriefView`,
        {
          ...body,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIsUpdating(false);

      if (response?.status === 200) {
        console.log(response);
      }
      console.log(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  // till here

  const getChatHistory = async (token) => {
    setIsHistoryLoading(true);
    try {
      const response = await axios.get(
        `${net_ip}/bot/ChatView?page=${pageNumber}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      if (response.data.status) {
        console.log(response.data.response.chats);
        setChatHistory(response.data.response.chats);
        setIsHistoryLoading(false);
        setTotalPageNumber(response.data.response.pagination.total_pages);
      }
    } catch (error) {
      console.log(error);
      setIsHistoryLoading(false);
    }
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePrevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const startNewChat = async (token) => {
    try {
      const response = await axios.post(
        `${net_ip}/bot/ChatView`,
        {
          title: "New Chat",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response);
      if (response.data.status) {
        console.log(response.data.response);
        console.log(response.data.response.chat_title);
        setChatHistory([...chatHistory, response.data.response]);
        handleChatClick(response.data.response.chat_id);
        handleSetChatTitle(response.data.response.chat_title);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    removeAuthTokenCookie();
    router.replace("/login");
  };

  const handleOpenFullView = (id) => {
    let briefType = selectedOption.split(" ").join("_");
    // Open the link in a new tab
    window.open(`/pdf/${id}?briefType=${briefType}`, "_blank");
  };
  return (
    <div
      className="sticky flex flex-col justify-start items-start bg-gray-100 px-2 overflow-auto h-lvh w-full border-l border-gray-200"
      style={{ maxHeight: "100vh", height: "100%" }}
    >
      <div
        className="w-full py-4 px-2 mb-4  rounded-xl"
        style={{ height: "100vh" }}
      >
        <Flex flexDirection={"column"} gap={1} alignItems={"start"} mb={3}>
          <h1 className="text-3xl text-blue-800 font-bold">Briefs</h1>
        </Flex>

        <SupremeCourt
          dataToUpdate={dataToUpdate}
          setDataToUpdate={setDataToUpdate}
          setIsUpdating={setIsUpdating}
        />

        <div className="flex flex-col justify-center w-full pt-6 pb-2 gap-3">
          {isUpdating && (
            <div className="w-full flex justify-between items-center gap-3">
              <Button
                variant="faded"
                color="primary"
                onClick={handleUpdateBrief}
                className="w-1/2"
              >
                Update
              </Button>
              <Button
                variant="faded"
                color="default"
                onClick={() => setIsUpdating(false)}
                className="w-1/2"
              >
                Cancel
              </Button>
            </div>
          )}

          <Button
            onClick={() => handleOpenFullView(briefData.brief_id)}
            className={`${dmSans.className} w-full py-2 px-3 text-center bg-blue-800 text-white rounded-lg`}
          >
            Show Full Document
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PdfSidebar;
