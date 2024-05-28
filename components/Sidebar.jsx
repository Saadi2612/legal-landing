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
import {
  FaAngleLeft,
  FaAngleRight,
  FaRegTrashCan,
  FaRegUser,
} from "react-icons/fa6";
import { FiUser } from "react-icons/fi";
import { PiGear } from "react-icons/pi";
import { PiArrowLineRightBold } from "react-icons/pi";
import { TbWorldSearch } from "react-icons/tb";

import { motion, AnimatePresence } from "framer-motion";

import {
  getAuthTokenFromCookie,
  removeAuthTokenCookie,
} from "@/utils/cookieUtils";

import Link from "next/link";
import { ImSpinner7 } from "react-icons/im";
import axios from "axios";
import { useChat } from "@/utils/context_api/ChatContext";
import { Image } from "@chakra-ui/react";

import { useSidebar } from "@/utils/context_api/SidebarContext";
import { BACKEND_IP, dmSans } from "@/utils";
import { Divider } from "@nextui-org/react";
import { SiTruenas } from "react-icons/si";

const menuItems = [
  // {
  //   title: "Research",
  //   path: "/",
  //   icon: <TbLayoutGrid />,
  // },
  {
    title: "Research",
    path: "/research",
    icon: <TbWorldSearch />,
  },
  {
    title: "Court Brief",
    path: "/court-brief",
    icon: <TbWorldSearch />,
  },
  // {
  //   title: "History",
  //   path: "",
  //   icon: <MdHistory />,
  // },
  // {
  //   title: "Profile",
  //   path: "/profile",
  //   icon: <FiUser />,
  // },
  // {
  //   title: "Details",
  //   path: "",
  //   icon: <TbListDetails />,
  // },
  // {
  //   title: "Settings",
  //   path: "",
  //   icon: <PiGear />,
  // },
];

const number = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const Sidebar = ({ setIsNewChat }) => {
  const router = useRouter();
  const pathName = usePathname();

  const {
    isSidebarExpanded,
    setSidebarExpanded,
    toggleSidebar,
    isPdfSidebarExpanded,
    setIsPdfSidebarExpanded,
  } = useSidebar();
  const net_ip = BACKEND_IP;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(null);
  const [deleteChatHovering, setDeleteChatHovering] = useState(false);

  const historyContainerRef = useRef();
  console.log(historyContainerRef.current?.offsetHeight);

  const {
    selectedChatId,
    handleChatClick,
    handleSetChatTitle,
    selectedChatTitle,
    refreshChat,
  } = useChat();

  console.log(selectedChatTitle);

  const chatType = pathName.includes("/court-brief")
    ? "CourtBrief"
    : "UserResearch";
  console.log(chatType);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [isHistoryLoading, setIsHistoryLoading] = useState(false);

  console.log(pathName);

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

  const getChatHistory = async (token) => {
    setIsHistoryLoading(true);
    try {
      const response = await axios.get(
        `${net_ip}/bot/ChatView?page=${pageNumber}?type=${chatType}`,
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

  useEffect(() => {
    getChatHistory(authToken);
  }, [refreshChat, pageNumber]);

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
          type: chatType,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status) {
        console.log(response.data.response);
        console.log(response.data.response.chat_title);
        setChatHistory([...chatHistory, response.data.response]);
        handleChatClick(response.data.response.chat_id);
        handleSetChatTitle(response.data.response.chat_title);
        setIsNewChat(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteChat = async (id, token) => {
    // console.log(authToken);
    try {
      const response = await axios.delete(`${net_ip}/bot/ChatView`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: {
          // Including the data in the config object
          chat_id: id,
        },
      });
      console.log(response.data);
      getChatHistory(authToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    removeAuthTokenCookie();
    router.replace("/login");
  };
  return (
    <div
      className="sticky flex flex-col justify-start items-start bg-gray-100 p-4 h-full "
      style={{ maxHeight: "100vh" }}
    >
      <div
        className={`w-full flex flex-col-reverse justify-center items-start gap-3 mb-4 duration-200 transition-all`}
      >
        <div className={`w-full overflow-hidden`}>
          {isSidebarExpanded ? (
            <Image
              src={"/assets/optillus-logo.svg"}
              className="w-[150px] min-w-[150px]"
            />
          ) : (
            <Image
              src="/assets/O-optillus.svg"
              className="w-[150px] min-w-[150px]"
            />
          )}
        </div>

        <div className="w-full flex justify-start">
          <button
            onClick={toggleSidebar}
            className="text-xl text-blue-800/90 p-2 rounded-md hover:bg-blue-500/30 duration-200 transition-all"
          >
            <PiArrowLineRightBold
              size={16}
              className={`${
                isSidebarExpanded ? "rotate-180" : "rotate-0"
              } duration-200 transition-all`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full my-1 py-0 px-1">
        <ul className="flex flex-col list-none">
          {menuItems.map((item, index) => (
            <li
              className="flex justify-between items-center group relative"
              key={index}
            >
              <Link
                href={"/" + pathName.split("/")[1] + item.path}
                className="my-4 flex justify-start items-center gap-3 group"
              >
                <span className="text-2xl text-blue-800/90 mr-auto">
                  {item.icon}
                </span>
                <span
                  className={`${isSidebarExpanded ? " " : "w-0"} ${
                    dmSans.className
                  } text-blue-800/90 hover:text-blue-800 font-medium text-left group-hover:translate-x-2 duration-200 whitespace-nowrap overflow-hidden`}
                >
                  {isSidebarExpanded ? item.title : null}
                </span>
              </Link>
              {!isSidebarExpanded && (
                <div className="absolute top-1/2 -translate-y-1/2 left-full px-2 py-1 ml-2 rounded-md text-blue-800/90 bg-blue-500/30 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-[5]">
                  {item.title}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* <button
          onClick={() => setIsPdfSidebarExpanded(!isPdfSidebarExpanded)}
          className="my-4 flex items-center gap-3 group relative"
        >
          <span className="text-2xl text-blue-800/90 hover:text-blue-800">
            <IoDocumentsOutline />
          </span>
          <span
            className={`${isSidebarExpanded ? "w-full " : "w-0"} ${
              dmSans.className
            } text-blue-800/90 hover:text-blue-800 font-medium text-left group-hover:translate-x-2 duration-200 whitespace-nowrap overflow-hidden`}
          >
            {isSidebarExpanded ? "Generate Brief" : null}
          </span>
          {!isSidebarExpanded && (
            <div className="absolute top-1/2 -translate-y-1/2 left-full whitespace-nowrap px-2 py-1 ml-2 rounded-md text-blue-800/80 bg-blue-500/30 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-[5]">
              Generate Brief
            </div>
          )}
        </button> */}

        {/* <button
          onClick={() => setIsPdfSidebarExpanded(!isPdfSidebarExpanded)}
          className="my-4 flex items-center gap-3 group relative"
        >
          <span className="text-2xl text-blue-800/90 hover:text-blue-800">
            <MdHistory />
          </span>
          <span
            className={`${isSidebarExpanded ? "w-auto " : "w-0"} ${
              dmSans.className
            } text-blue-800/90 hover:text-blue-800 font-medium group-hover:translate-x-2 duration-200 whitespace-nowrap overflow-hidden`}
          >
            {isSidebarExpanded ? "Show Chat History" : null}
          </span>

          {!isSidebarExpanded && (
            <div className="absolute top-1/2 -translate-y-1/2 left-full w-auto whitespace-nowrap px-2 py-1 ml-0 rounded-md text-blue-800 bg-blue-500/30 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-[5]">
              Show Chat History
            </div>
          )}
        </button> */}
      </div>

      <Divider className="my-3 bg-gray-300/90" />

      <AnimatePresence>
        {pathName.split("/")[2] === "research" ||
        pathName.split("/")[2] === "court-brief" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            ref={historyContainerRef}
            className="flex flex-col items-center justify-start h-full w-full mb-4 rounded-xl "
          >
            <div className="w-full flex flex-col" style={{ height: "100%" }}>
              <span className="w-full flex items-center justify-between px-1">
                <button
                  onClick={() => setSidebarExpanded(true)}
                  className="my-2 flex items-center gap-3 group relative cursor-pointers"
                >
                  <span className="text-2xl text-blue-800/90 hover:text-blue-800">
                    <MdHistory />
                  </span>
                  <span
                    className={`${isSidebarExpanded ? "w-full " : "w-0"} ${
                      dmSans.className
                    } text-blue-800/90 hover:text-blue-800 font-medium duration-200 whitespace-nowrap overflow-hidden`}
                  >
                    {isSidebarExpanded ? "Show Chat History" : null}
                  </span>

                  {!isSidebarExpanded && (
                    <div className="absolute top-1/2 -translate-y-1/2 left-full w-auto whitespace-nowrap px-2 py-1 ml-0 rounded-md text-blue-800 bg-blue-500/30 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 z-[5]">
                      Show Chat History
                    </div>
                  )}
                </button>
                <div className="flex space-x-3 overflow-hidden">
                  <div>
                    <button
                      onClick={() => startNewChat(authToken)}
                      // className="active:scale-95"
                      className={`${isSidebarExpanded ? "w-auto " : "w-0"} ${
                        dmSans.className
                      } text-blue-800/90 hover:text-blue-800 font-medium active:scale-95 duration-200 whitespace-nowrap overflow-hidden`}
                    >
                      <TbPlus />
                    </button>
                  </div>
                  <div>
                    <button
                      onClick={() => getChatHistory(authToken)}
                      // className="active:scale-95"
                      className={`${isSidebarExpanded ? "w-auto " : "w-0"} ${
                        dmSans.className
                      } text-blue-800/90 hover:text-blue-800 font-medium active:scale-95 duration-200 whitespace-nowrap overflow-hidden`}
                    >
                      <TbRefresh />
                    </button>
                  </div>
                </div>
              </span>

              {isSidebarExpanded && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, display: "none" }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    display: "block",
                  }}
                  transition={{
                    duration: 0.3,
                    delay: 0.2,
                    display: { duration: 0.2, delay: 0.2 },
                  }}
                  className="w-full h-full overflow-hidden relative"
                >
                  {isHistoryLoading ? (
                    <div className="w-full h-full grid place-items-center">
                      <ImSpinner7 color="#1E40AF" className="animate-spin" />
                    </div>
                  ) : (
                    <div
                      className={`w-full h-full gap-1 px-2 pt-2 pb-8 my-2 flex flex-col overflow-y-auto bg-white rounded-xl relative custom-scrollbar`}
                      style={{
                        maxHeight: `calc(
                          ${historyContainerRef.current?.offsetHeight}px - 60px
                        )`,
                        minHeight: `calc(
                          ${historyContainerRef.current?.offsetHeight}px - 70px
                        )`,
                      }}
                    >
                      {/* todo: set overflow of the container: done */}
                      {chatHistory?.map((chat, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            handleChatClick(chat.chat_id, chat.chat_title)
                          }
                          className={`flex justify-between items-center w-full h-auto py-1 px-4 rounded-lg text-left bg-blue-900 relative group cursor-pointer`}
                        >
                          <div className="flex flex-col w-full">
                            <h3
                              className={`${dmSans.className} text-gray-100 font-medium md:text-sm text-xs truncate `}
                            >
                              {chat.chat_title}
                            </h3>
                            <p
                              className={`${dmSans.className} text-gray-300 md:text-xs text-[10px]`}
                            >
                              {chat.chat_date
                                .split("T")[0]
                                .split("-")
                                .reverse()
                                .join("-")}
                            </p>
                            <p
                              className={`${dmSans.className} text-blue-200 md:text-xs text-[10px] mt-0.5`}
                              style={{ fontStyle: "italic" }}
                            >
                              {chat.chat_type}
                            </p>
                          </div>
                          <div
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-gradient-to-l from-blue-900 from-70% to-blue-900/0 hidden group-hover:block"
                            // onMouseEnter={() => setDeleteChatHovering(true)}
                            // onMouseLeave={() => setDeleteChatHovering(false)}
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteChat(chat.chat_id, authToken);
                              }}
                              className="p-2"
                            >
                              <FaRegTrashCan color="white" size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                      {/* <div className="flex text-white items-center justify-center gap-2 mt-auto absolute bottom-0 left-0 right-0 p-1 m-1 rounded-xl backdrop-blur-md bg-white/30">
                        <button
                          onClick={handlePrevPage}
                          disabled={pageNumber <= 1}
                          className={`${
                            pageNumber <= 1
                              ? "bg-gray-800"
                              : "bg-gray-600 hover:bg-gray-700"
                          } font-bold py-2 px-4 rounded-lg`}
                        >
                          Prev
                        </button>
                        <span className="text-xs text-gray-600">
                          {pageNumber} / {totalPageNumber}
                        </span>
                        <button
                          onClick={handleNextPage}
                          disabled={pageNumber >= totalPageNumber}
                          className={`${
                            pageNumber >= totalPageNumber
                              ? "bg-gray-800"
                              : "bg-gray-600 hover:bg-gray-700"
                          } font-bold py-2 px-4 rounded-lg`}
                        >
                          Next
                        </button>
                      </div> */}
                    </div>
                  )}
                  <div className="flex text-white items-center justify-center gap-2 mt-auto absolute bottom-0 left-1 right-1 p-2 rounded-lg bg-white/50 backdrop-blur-[8px]">
                    <button
                      onClick={handlePrevPage}
                      disabled={pageNumber <= 1}
                      className={`${
                        pageNumber <= 1
                          ? "bg-gray-200"
                          : "bg-blue-500/30 hover:bg-blue-500/60"
                      } p-1 rounded-lg`}
                    >
                      <FaAngleLeft color="#1E40AF" />
                    </button>
                    <span className="text-xs text-gray-500">
                      {pageNumber} / {totalPageNumber}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={pageNumber >= totalPageNumber}
                      className={`${
                        pageNumber >= totalPageNumber
                          ? "bg-gray-200"
                          : "bg-blue-500/30 hover:bg-blue-500/60"
                      } p-1 rounded-lg`}
                    >
                      <FaAngleRight color="#1E40AF" />
                    </button>
                  </div>
                </motion.div>
              )}
              {/* <div className="flex text-white items-center gap-2 mt-2 ml-3">
                <button
                  onClick={handlePrevPage}
                  disabled={pageNumber <= 1}
                  className={`${
                    pageNumber <= 1
                      ? "bg-gray-800"
                      : "bg-gray-600 hover:bg-gray-700"
                  } font-bold py-2 px-4 rounded-lg`}
                >
                  Prev
                </button>
                <span>
                  {pageNumber} / {totalPageNumber}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={pageNumber >= totalPageNumber}
                  className={`${
                    pageNumber >= totalPageNumber
                      ? "bg-gray-800"
                      : "bg-gray-600 hover:bg-gray-700"
                  } font-bold py-2 px-4 rounded-lg`}
                >
                  Next
                </button>
              </div> */}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex justify-self-end self-end w-full mt-auto">
        <button
          onClick={handleLogout}
          className="my-2 flex items-center gap-3 group "
        >
          <span className="text-2xl text-blue-800/90 hover:text-blue-800">
            <TbLogout2 />
          </span>
          <span
            className={`${isSidebarExpanded ? "w-auto " : "w-0"} ${
              dmSans.className
            } text-blue-800/90 hover:text-blue-800 font-semibold group-hover:translate-x-2 duration-200 whitespace-nowrap overflow-hidden`}
          >
            {isSidebarExpanded ? "Logout" : null}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
