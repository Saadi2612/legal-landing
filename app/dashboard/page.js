"use client";

import React, { useEffect, useState } from "react";

import { ImSpinner2 } from "react-icons/im";

import { getAuthTokenFromCookie } from "@/utils/cookieUtils";

import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "@nextui-org/react";

const Dashboard = () => {
  const router = useRouter();
  const pathName = usePathname();
  // console.log(pathName);
  // const [authToken, setAuthToken] = useState("");
  const [dashLoading, setDashLoading] = useState(true);

  useEffect(() => {
    // let token = localStorage.getItem("token");
    const tokenCookie = getAuthTokenFromCookie();
    // console.log(tokenCookie);
    if (!tokenCookie) {
      router.replace("/login");
    } else {
      // setAuthToken(tokenCookie);
      router.replace("/dashboard/research");
    }
  }, []);

  // If still loading, show a spinner
  if (dashLoading) {
    return (
      <div className="fixed inset-0 bg-white grid place-items-center">
        <Spinner size="lg" color="primary" />
      </div>
    );
  }

  // If not loading, render nothing (null)
  return null;
};

export default Dashboard;
