// "use client";

import React, { useEffect, useRef, useState } from "react";

import {
  StackDivider,
  VStack,
  Avatar,
  Divider,
  Box,
  Image,
} from "@chakra-ui/react";
import { FaCircleCheck } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import { PiPlugsLight, PiPlugs, PiPlugsConnectedFill } from "react-icons/pi";
import { LuFileSearch } from "react-icons/lu";

import InputDeck from "@/components/InputDeck.jsx";
import PdfViewer from "@/components/PdfViewer";
import { FiDownload } from "react-icons/fi";
import { ImAttachment } from "react-icons/im";
import { ImSpinner2, ImSpinner7 } from "react-icons/im";

import { getAuthTokenFromCookie } from "@/utils/cookieUtils";

import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import { useChat } from "@/utils/context_api/ChatContext";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { FaFilePdf, FaTimes } from "react-icons/fa";
import { MdOutlinePending } from "react-icons/md";
import FilePreviewModal from "./FilePreview";
import CitationModal from "./CitationModal";
import { Button } from "@chakra-ui/react";
import { BACKEND_IP, SOCKET_IP, dmSans, dmSerifDisplay } from "@/utils";
import { Spinner } from "@nextui-org/react";
import { IoDocumentsOutline } from "react-icons/io5";
import { useSidebar } from "@/utils/context_api/SidebarContext";

const ChatInterface = React.memo(() => {
  const router = useRouter();
  const pathName = usePathname();

  const { isPdfSidebarExpanded, setIsPdfSidebarExpanded } = useSidebar();

  const { briefData, setBriefData, refreshChat, setRefreshChat } = useChat();

  const net_ip = BACKEND_IP;

  const userToken = Cookies.get("token");
  console.log(userToken);
  const chatTypePath = pathName.includes("/court-brief")
    ? "socket-server"
    : "user-research";

  const url = `${SOCKET_IP}/ws/${chatTypePath}/${userToken}/`;

  const { selectedChatId, handleChatClick, handleSetChatTitle } = useChat();

  const [fileIds, setFileIds] = useState([]);
  const [myDocuments, setMyDocuments] = useState([]);

  const [message, setMessage] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [messages, setMessages] = useState([{ text: "", type: "" }]);

  const [queryHistory, setQueryHistory] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [dashLoading, setDashLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [connetionErrorAlert, setConnetionErrorAlert] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesRef = useRef(null);
  const inputDeckContainer = useRef(null);

  console.log("Refreshing.....", refreshChat);

  const [ws, setWs] = useState(null);
  const [reply, setReply] = useState("");

  const [conversation, setConversation] = useState([]);
  const conversationRef = useRef(conversation);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerData, setDrawerData] = useState(null);
  const [searchVal, setSearchval] = useState("");
  const [selectedCitationID, setSelectedCitationID] = useState(null);
  const [popUpData, setPopUpData] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [fullName, setFullName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [connected, setIsConnected] = useState(false);
  const [isSendingDisabled, setIsSendingDisabled] = useState(false);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("");
  const [selectedCourt, setSelectedCourt] = useState("");
  const [chatId, setChatId] = useState("");

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
      if (response.data.status) {
        console.log(response.data.response);
        console.log(response.data.response.chat_title);
        handleChatClick(response.data.response.chat_id);
        handleSetChatTitle(response.data.response.chat_title);
        setChatId(response.data.response.chat_id);
        setRefreshChat(!refreshChat);
      }
      return response.data.response.chat_id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextPage = (page) => {
    setPageNumber(page + 1);
    sendSearchPageNumber();
  };
  const handlePrevPage = (page) => {
    setPageNumber(page - 1);
    sendSearchPageNumber();
  };

  // Function to open the drawer
  const openDrawer = (data) => {
    setIsDrawerOpen(true);
    setDrawerData(data);
  };

  // Function to close the drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const removeFile = () => {
    // setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    setSelectedFiles([]);
  };

  useEffect(() => {
    getDocuments();
  }, [
    selectedChatId,
    myDocuments.map((doc) => doc.embedding_status).join(","),
  ]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        console.log(selectedChatId);

        await axios
          .get(`${net_ip}/bot/UserProfileView`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then(async (response) => {
            console.log(response.data);
            setFullName(
              `${response.data.response.first_name} ${response.data.response.last_name}`
            );
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (e) {}
    };
    fetchUserProfile();
  }, []);

  const getDocuments = async () => {
    if (selectedChatId) {
      try {
        console.log(selectedChatId);

        await axios
          .get(`${net_ip}/bot/UserDocumentsByChat?chat_id=${selectedChatId}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          })
          .then(async (response) => {
            console.log(response.data);

            setMyDocuments(response.data.response);
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (e) {}
    }
  };

  console.log(searchVal);

  useEffect(() => {
    // Update the conversationRef whenever conversation state changes
    conversationRef.current = conversation;
  }, [conversation]);

  function handleNewMessage(newMessage) {
    if (!(newMessage.reply.id > 0)) {
      return;
    }

    console.log(newMessage);

    if (newMessage.reply.type === "BRIEF") {
      setBriefData(newMessage.reply.value.brief_data);
    }

    setConversation((prev) => {
      const updatedConversation = [...prev];
      if (newMessage.reply.type == "ARGUMENT_FROM_OPINION") {
        updatedConversation.push({
          type: "reply",
          query: null,
          reply: newMessage.reply,
        });
        return updatedConversation;
      }
      const messageObjectIndex = updatedConversation.findIndex(
        (x) => x.type === "reply" && x.reply.id === newMessage.reply.id
      );

      if (messageObjectIndex !== -1) {
        console.log(
          "This is what will be appended : ",
          newMessage.reply.value.message
        );
        // If the object is already in the conversation, update its text
        // updatedConversation[messageObjectIndex] = {
        //   type: "reply",
        //   query: null,
        //   reply: updatedConversation[messageObjectIndex].reply["value"]["message"]+=newMessage.reply.value.message,
        // }
        updatedConversation[messageObjectIndex] = {
          ...updatedConversation[messageObjectIndex],
          reply: {
            id: updatedConversation[messageObjectIndex].reply.id,
            type: updatedConversation[messageObjectIndex].reply.type,
            value: {
              message:
                updatedConversation[messageObjectIndex].reply.value.message +
                newMessage.reply.value.message,
            },
          },
        };
      } else {
        // If the object is not in the conversation, add a new one
        updatedConversation.push({
          type: "reply",
          query: null,
          reply: newMessage.reply,
        });
      }

      return updatedConversation;
    });
  }

  useEffect(() => {
    if (selectedChatId) {
      getChatDetail(selectedChatId, userToken);
    } else {
      setConversation([]);
    }
  }, [selectedChatId]);

  const getChatDetail = async (id, token) => {
    setIsChatLoading(true);
    try {
      const response = await axios.get(
        `${net_ip}/bot/ChatDetailView?chat_id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log(response);
      if (response.data.status) {
        // console.log(response.data.response.chat_detail);
        setConversation(response.data.response.chat_detail);
        setIsChatLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsChatLoading(false);
    }
  };

  // Establish the WebSocket connection when the component mounts
  useEffect(() => {
    const ws = new WebSocket(url);
    setConnetionErrorAlert(false);

    ws.onopen = () => {
      setConnetionErrorAlert(false);
      console.log("WebSocket Client Connected");
      setIsConnected(true);
    };

    ws.onmessage = (msg) => {
      const parsedMsg = JSON.parse(msg.data);
      console.log(parsedMsg);
      console.log(parsedMsg.type);
      if (parsedMsg.type === "type.courtlistener_search") {
        console.log("In Drawer Mode");
        setSearchval(parsedMsg.data.search_query);
        openDrawer(parsedMsg.data);
      }
      if (parsedMsg.type === "type.courtlistener_opinion") {
        console.log("In PopUp Mode ===>", parsedMsg);
        setPopUpData(parsedMsg.data);
      }
      if (parsedMsg.type === "type.query_and_reply") {
        setIsSendingDisabled(true);
        if (
          parsedMsg.data.hasOwnProperty("reply") &&
          parsedMsg.data.reply.id > 0
        ) {
          handleNewMessage(parsedMsg.data);
        }
      } else if (parsedMsg.type === "type.system_easy") {
        setIsSendingDisabled(false);
      }
    };

    ws.onerror = (error) => {
      console.log(error);
      setConnetionErrorAlert(true);
      setIsConnected(false);
      // setRefresh(!refresh)
    };

    ws.onclose = (msg) => {
      console.log(msg);
      setIsConnected(false);
    };

    setWs(ws);

    return () => {
      ws.close();
    };
  }, [refresh]);

  const sendMessage = (data) => {
    if (ws) {
      const msg = {
        type: "type.query_and_reply",
        data: data,
      };
      ws.send(JSON.stringify(msg));
    }
    setMessage("");
  };

  console.log(conversation);

  const openDetailedView = (id) => {
    setPopUpData(null);
    if (ws) {
      const msg = {
        type: "type.courtlistener_opinion",
        data: {
          opinion_id: id,
        },
      };
      ws.send(JSON.stringify(msg));
    }
  };

  const sendSearchQuery = () => {
    if (ws) {
      setDrawerData(null);
      const msg = {
        type: "type.courtlistener_search",
        data: {
          search_query: searchVal,
          jurisdiction_id: selectedJurisdiction,
          jurisdiction_court_id: selectedCourt,
          page_number: 1,
        },
      };
      ws.send(JSON.stringify(msg));
    }
  };

  const sendSelectedCitations = () => {
    if (ws) {
      const msg = {
        type: "type.courtlistener_citations",
        data: {
          selected_opnions: selectedIds,
          history: conversation,
          chat_id: selectedChatId,
        },
      };
      ws.send(JSON.stringify(msg));
      closeDrawer();
    }
  };

  const sendSearchPageNumber = (page) => {
    // console.log(page);
    if (ws) {
      setDrawerData(null);
      const msg = {
        type: "type.courtlistener_search",
        data: {
          search_query: searchVal,
          jurisdiction_id: selectedJurisdiction,
          jurisdiction_court_id: selectedCourt,
          page_number: page,
        },
      };
      ws.send(JSON.stringify(msg));
    }
  };

  const sendDocuments = async () => {
    setIsChatLoading(true);
    try {
      var formdata = new FormData();
      console.log(selectedFiles);

      selectedFiles &&
        selectedFiles.forEach((file, index) => {
          formdata.append("pdf_files", file);
        });
      formdata.append("payload", JSON.stringify({ chat_id: selectedChatId }));
      console.log(formdata.get("payload"));

      const response = await axios.post(
        `${net_ip}/bot/UploadUserDocuments`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        console.log();
        getDocuments();
        setFileIds(response.data.response.map((file) => file.file_id));
        setSelectedFiles([]);
        console.log(fileIds);
      }
      console.log(response.data.message);
      setIsChatLoading(false);
    } catch (error) {
      console.log(error);
      setIsChatLoading(false);
    }
  };

  console.log(selectedCitationID);

  useEffect(() => {
    // let token = localStorage.getItem("token");
    const tokenCookie = getAuthTokenFromCookie();
    console.log(tokenCookie);
    if (!tokenCookie) {
      setDashLoading(true);
      router.replace("/login");
    } else {
      setAuthToken(tokenCookie);
      setDashLoading(false);
    }
  }, []);

  const handleDownload = () => {
    if (pdfFile) {
      // Create a Blob from the file data
      const blob = new Blob([pdfFile], { type: pdfFile.type });

      // Create a URL for the Blob
      const url = URL.createObjectURL(blob);

      // Create an anchor element with download attribute
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFile.name || "download.pdf"; // You can customize the default download filename

      // Append the anchor element to the document
      document.body.appendChild(a);

      // Trigger a click event on the anchor element to start the download
      a.click();

      // Remove the anchor element from the document
      document.body.removeChild(a);

      // Release the object URL
      URL.revokeObjectURL(url);
    }
  };

  function NewlineText2({ text }) {
    const newText = text.split("\n").map((str, index, array) =>
      index === array.length - 1 ? (
        str
      ) : (
        <>
          {str}
          <br />
        </>
      )
    );
    return <>{newText}</>;
  }

  const Message = ({ msg, name, tag }) => {
    const handleOpenPdfView = (id) => {
      const url = `/pdf/${id}`;
      window.open(url, "_blank");
    };

    useEffect(() => {
      if (msg?.reply?.type === "BRIEF") {
        setBriefData(msg?.reply?.value?.brief_data);
      }
    }, []);

    return (
      <div className="w-full h-auto row-span-1 justify-end items-start">
        {/* Message container */}
        <div className="flex w-full h-full">
          {/* Profile picture div */}
          <div className="h-full w-min flex justify-start items-start">
            {tag === "reply" ? (
              <Avatar size={"sm"} name={"Optillus AI"} className="w-8 h-8" />
            ) : (
              <Avatar size={"sm"} name={name} className="w-8 h-8" />
            )}
          </div>

          {/* Content div */}
          <div className="flex flex-col w-full px-2">
            <span
              className={` text-inherit ${dmSans.className}`}
              style={{ color: "#222222", fontWeight: 500 }}
            >
              {tag === "reply" ? "Optillus Legal AI" : name}
            </span>

            <div className="w-full flex flex-col ">
              {pdfFile ? (
                <div className="flex flex-col">
                  <span className="w-full text-sm text-gray-100">
                    {pdfFile.name}
                  </span>

                  <div className="flex justify-start">
                    <div className="rounded-lg overflow-hidden relative group">
                      <PdfViewer url={pdfFile} width={250} pageNumber={1} />

                      <button
                        onClick={handleDownload}
                        className="absolute bottom-2 right-2 hidden group-hover:block p-2 rounded-md bg-gray-400/40 hover:bg-gray-800 cursor-pointer duration-200"
                      >
                        <FiDownload color="white" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}

              <div
                className="w-full h-auto text-gray-200"
                style={{ marginTop: "10px" }}
              >
                {tag === "reply" ? (
                  msg.reply.type === "TEXT" ? (
                    <p
                      style={{ color: "#222222" }}
                      className={`${dmSans.className}`}
                    >
                      <NewlineText2 text={msg.reply.value.message} />
                    </p>
                  ) : msg.reply.type === "LLM_ACTION" ? (
                    <p
                      style={{ color: "#222222" }}
                      className={`${dmSans.className}`}
                    >
                      <NewlineText2 text={msg.reply.value.message} />
                    </p>
                  ) : msg.reply.type === "ARGUMENT_FROM_OPINION" ? (
                    // Render Arguemnt Section here

                    <div
                      style={{
                        padding: "16px",
                        marginBottom: "16px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        color: "#222222",
                        backgroundColor: "#E8E8E8",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <strong
                          style={{
                            fontWeight: 500,
                            color: "#222222",
                            fontSize: "20px",
                          }}
                          className={`${dmSans.className}`}
                        >
                          {msg.reply.value.case_name}
                        </strong>
                      </div>
                      <div
                        style={{
                          marginTop: "8px",
                          display: "flex",
                          gap: "20px",
                        }}
                      >
                        <span
                          style={{ color: "#222222" }}
                          className={`${dmSans.className}`}
                        >
                          <strong
                            style={{ fontWeight: 500 }}
                            className={`${dmSans.className}`}
                          >
                            Date Filed:
                          </strong>{" "}
                          {msg.reply.value.date_filed}
                        </span>
                        <span
                          style={{ color: "#222222" }}
                          className={`${dmSans.className}`}
                        >
                          <strong
                            style={{ fontWeight: 500 }}
                            className={`${dmSans.className}`}
                          >
                            Status:
                          </strong>{" "}
                          {msg.reply.value.status}
                        </span>
                      </div>
                      {/* <div
                        style={{
                          marginTop: "8px",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <span style={{ color: "#fff" }}>
                          <strong style={{ fontWeight: "bold" }}>
                            Citations:
                          </strong>{" "}
                          {msg.reply.value.citations}
                        </span>
                      </div> */}
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "sm",
                          color: "#222222",
                        }}
                        className={`${dmSans.className}`}
                        dangerouslySetInnerHTML={{
                          __html: msg.reply.value.generated_argument,
                        }}
                      ></div>
                    </div>
                  ) : (
                    // Render Breif Section here
                    <>
                      <p
                        style={{ color: "#222222" }}
                        className={`${dmSans.className}`}
                      >
                        <NewlineText2 text={msg.reply.value.message} />
                      </p>
                    </>
                  )
                ) : (
                  <>
                    <p
                      style={{ color: "#222222" }}
                      className={`${dmSans.className}`}
                      dangerouslySetInnerHTML={{ __html: msg.query.message }}
                    ></p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleMessageSend = async () => {
    let c = "";
    if (!selectedChatId) {
      console.log("Starting a new chat");
      c = await startNewChat(authToken);
    }
    console.log(c);
    setIsSendingDisabled(true);
    setConversation([
      ...conversation,
      {
        type: "query",
        query: {
          query_id: conversation.filter((x) => x.type == "query").length + 1,
          message: message,
        },
        reply_id: null,
      },
    ]);

    setQueryHistory(message);
    const body = {
      query: message,
      chat_id: selectedChatId ? selectedChatId : c,
      history: conversation,
    };
    sendMessage(body);
  };

  useEffect(() => {
    scrollToLatestMessage();
  }, [conversation, messagesRef]);

  const scrollToLatestMessage = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [modal, setModal] = useState(false);
  const openModal = (file) => {
    console.log("working");
    setSelectedFile(file);
    setModal(true);
  };

  const closeModal = () => {
    setSelectedFile(null);
    setModal(false);
  };

  const socketAfterClass = connected ? "connected" : "disconnected";

  return (
    <>
      {dashLoading ? (
        <div className="fixed inset-0 bg-white grid place-items-center">
          <ImSpinner2 size={40} color="black" className="animate-spin" />
        </div>
      ) : (
        <>
          <div
            className="flex justify-between items-center w-full p-4 gap-3"
            // style={{
            //   display: "flex",
            //   flexDirection: "row",
            //   justifyContent: "space-between",
            //   alignItems: "center",
            //   gap: 10,
            //   padding: 10,
            // }}
          >
            <div className="w-full flex">
              <div className="flex justify-between items-center py-2 gap-3 bg-gray-100 text-gray-100 rounded-xl h-full w-full">
                <div className="ml-4 flex p-2 items-center space-x-2 overflow-x-auto max-w-full ">
                  {myDocuments?.map((file, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-2 text-sm cursor-pointer text-blue-800 bg-white rounded-xl"
                      style={{ minWidth: "200px" }}
                      onClick={() => openModal(file)}
                    >
                      <>
                        <FaFilePdf color="red" />
                        <span>{file?.file_name}</span>
                      </>
                      <span>
                        {file?.embedding_status === "Done" ? (
                          ""
                        ) : (
                          <MdOutlinePending color="red" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {selectedFiles.length > 0 && (
                    <>
                      <select
                        className="p-2 border border-gray-300 rounded-md"
                        onChange={(e) => console.log(e.target.value)} // Handle selected file here
                      >
                        {selectedFiles.map((file, index) => (
                          <option key={index} value={file.name}>
                            {file.name}
                          </option>
                        ))}
                      </select>
                      <button onClick={removeFile}>Clear All</button>
                    </>
                  )}
                  {selectedFiles.length > 0 && (
                    <button
                      className="p-2 rounded-lg focus:outline-none cursor-pointer bg-gray-700"
                      onClick={sendDocuments}
                    >
                      <PiPaperPlaneRightFill color="white" />
                    </button>
                  )}
                  {/* Attach Button */}
                  <label
                    htmlFor="fileInput"
                    className="rounded-lg p-2 mr-2 bg-blue-800 focus:outline-none cursor-pointer"
                  >
                    <ImAttachment color="white" />
                  </label>
                  {/* Hidden File Input */}
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    id="fileInput"
                    className="hidden"
                    onChange={(e) =>
                      setSelectedFiles((prevFiles) => [
                        ...prevFiles,
                        ...Array.from(e.target.files),
                      ])
                    }
                  />
                  {/* Loading Spinner */}
                  {isLoading && (
                    <div className="mt-4 flex items-center">
                      <ImSpinner2 className="animate-spin mr-2" />
                      Uploading...
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Button
              backgroundColor={"#1E40AF"}
              color={"white"}
              onClick={openDrawer}
              _hover={{
                backgroundColor: "#1E3B8A",
                color: "white",
              }}
              p={4}
              position={"relative"}
              borderRadius={"12px"}
              className={`${dmSans.className} group`}
            >
              <LuFileSearch color="white" size={24} />

              <div className="absolute left-1/2 -translate-x-3/4 bottom-full px-2 py-1 ml-2 rounded-md text-blue-800/90 bg-blue-500/30 text-sm invisible opacity-20 -translate-y-1 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-y-3">
                Search Citations
              </div>
            </Button>

            {pathName.includes("/court-brief") && (
              <Button
                backgroundColor={"#1E40AF"}
                color={"white"}
                onClick={() => setIsPdfSidebarExpanded(!isPdfSidebarExpanded)}
                _hover={{
                  backgroundColor: "#1E3B8A",
                  color: "white",
                }}
                p={4}
                position={"relative"}
                borderRadius={"12px"}
                className={`${dmSans.className} group`}
              >
                <IoDocumentsOutline color="white" size={24} />

                <div className="absolute left-1/2 -translate-x-3/4 bottom-full px-2 py-1 ml-2 rounded-md text-blue-800/90 bg-blue-500/30 text-sm invisible opacity-20 -translate-y-1 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-y-3">
                  Show Brief
                </div>
              </Button>
            )}

            <Button
              backgroundColor={"transparent"}
              border={"1px solid"}
              borderColor={"gray.200"}
              _hover={{
                backgroundColor: "gray.100",
              }}
              p={4}
              borderRadius={"12px"}
              position={"relative"}
              onClick={() => setRefresh(!refresh)}
              className={`${dmSans.className} group`}
            >
              {connected ? (
                <PiPlugsConnectedFill size={24} color="green" />
              ) : (
                <PiPlugs size={24} color="red" />
              )}

              <div className="absolute left-1/2 -translate-x-3/4 bottom-full px-2 py-1 ml-2 rounded-md text-blue-800/90 bg-blue-500/30 text-sm invisible opacity-20 -translate-y-1 transition-all group-hover:visible group-hover:opacity-100 group-hover:-translate-y-3">
                {connected ? "Connected" : "Disconnected"}
              </div>
              {/* {connected ? (
              <PiPlugsConnectedLight
                style={{ color: "#2FF32F" }}
                size={20}
              />
            ) : (
              <PiPlugsLight style={{ color: "#FF0000" }} />
            )} */}
            </Button>
          </div>

          <VStack
            divider={<Divider borderColor="#E8E8E8" />}
            spacing={2}
            p={2}
            align="stretch"
            className={`flex-[5] px-2 mt-3 py-1 flex flex-col-reverse overflow-y-auto gap-2 rounded-xl text-gray-50 bg-white duration-300 `}
            ref={messagesRef}
          >
            {isChatLoading ? (
              <span className="w-full h-full grid place-items-center">
                <Spinner color="primary" size="md" />
              </span>
            ) : (
              conversation.map((msg, index) => (
                <Message key={index} msg={msg} name={fullName} tag={msg.type} />
              ))
            )}
          </VStack>

          {/* ---------------------- Input Area ---------------------- */}
          <div className="flex justify-center flex-[1] p-3">
            <div
              className="w-full max-w-5xl pt-3 h-full flex flex-col justify-end items-center bg-white relative"
              ref={inputDeckContainer}
            >
              {isSendingDisabled && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  <span className="animate-pulse bg-blue-800 size-3 rounded-full " />
                  <p className="text-sm text-gray-500">
                    Generating Response...
                  </p>
                </div>
              )}
              <InputDeck
                message={message}
                setMessage={setMessage}
                pdfFile={pdfFile}
                setPdfFile={setPdfFile}
                sendHandler={handleMessageSend}
                isSendingDisabled={isSendingDisabled}
              />
            </div>
          </div>
          {selectedFile && (
            <FilePreviewModal
              open={modal}
              file={selectedFile}
              onClose={closeModal}
            />
          )}
          <CitationModal
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
            data={drawerData}
            setSearchVal={setSearchval}
            searchVal={searchVal}
            sendSearchQuery={sendSearchQuery}
            setSelectedCitationID={setSelectedCitationID}
            openDetailedView={openDetailedView}
            popUpData={popUpData}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            sendSelectedCitations={sendSelectedCitations}
            handleNextPage={handleNextPage}
            pageNumber={pageNumber}
            handlePrevPage={handlePrevPage}
            sendSearchPageNumber={sendSearchPageNumber}
            selectedJurisdiction={selectedJurisdiction}
            setSelectedJurisdiction={setSelectedJurisdiction}
            selectedCourt={selectedCourt}
            setSelectedCourt={setSelectedCourt}
          />
        </>
      )}
    </>
  );
});

export default ChatInterface;
