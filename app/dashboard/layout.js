"use client";

import React, { useState } from "react";

import Sidebar from "@/components/Sidebar";
import { Box } from "@chakra-ui/react";
import { useSidebar } from "@/utils/context_api/SidebarContext";
import PdfSidebar from "@/components/PdfSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useChat } from "@/utils/context_api/ChatContext";
// import Sidebar from "../../components/Sidebar";

const Layout = ({ children }) => {
  const {
    isSidebarExpanded,
    toggleSidebar,
    isPdfSidebarExpanded,
    setIsPdfSidebarExpanded,
  } = useSidebar();

  const pathName = usePathname();

  const { briefData, setBriefData } = useChat();

  const [isNewChat, setIsNewChat] = useState(false);

  return (
    <div className="flex w-full">
      {/* div for sidebar */}
      <Box
        // flex={isSidebarExpanded ? 1 : 0.2}
        // w={isSidebarExpanded ? "25%" : "5%"}
        // maxWidth={300}
        // minWidth={50}
        borderRight="1px solid #E8E8E8"
        className={`${
          isSidebarExpanded
            ? "w-[25%] max-w-[300px] min-w-[300px]"
            : "w-20 min-w-20 max-w-20"
        } duration-200 transition-all`}
      >
        <Sidebar setIsNewChat={setIsNewChat} />
      </Box>

      {/* div for rest of the dashboard content */}
      <Box
        // flex={4}
        w={"full"}
        overflow={"auto"}
        height={"100lvh"}
      >
        {children}
      </Box>

      <Box
        // flex={isPdfSidebarExpanded ? 1.5 : 0}
        // w={isPdfSidebarExpanded ? "25%" : 0}
        className={`${
          isPdfSidebarExpanded ? "w-[60%] max-w-[60%] overflow-auto" : "w-0"
        } duration-200 transition-all`}
      >
        {isPdfSidebarExpanded && pathName.split("/")[2] === "court-brief" && (
          <div
            className={`${
              isPdfSidebarExpanded ? "w-full" : "w-0"
            } duration-200 transition-all`}
          >
            <PdfSidebar
              isNewChat={isNewChat}
              briefData={briefData}
              setBriefData={setBriefData}
            />
          </div>
        )}
      </Box>
    </div>
  );
};

export default Layout;
