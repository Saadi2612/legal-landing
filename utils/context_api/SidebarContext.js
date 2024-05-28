"use client";

import React, { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [isSidebarExpanded, setSidebarExpanded] = useState(false);
  const [isPdfSidebarExpanded, setIsPdfSidebarExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarExpanded((prev) => !prev);
  };

  const togglePdfSidebar = () => {
    setIsPdfSidebarExpanded((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        isSidebarExpanded,
        setSidebarExpanded,
        toggleSidebar,
        isPdfSidebarExpanded,
        setIsPdfSidebarExpanded,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};
