"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@chakra-ui/react";

import { MdAlternateEmail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PiEye, PiEyeClosed } from "react-icons/pi";
import { ImSpinner7 } from "react-icons/im";

import { useRouter } from "next/navigation";
import Link from "next/link";

import Cookies from "js-cookie";
import {
  getAuthTokenFromCookie,
  setAuthTokenCookie,
} from "@/utils/cookieUtils";

import axios from "axios";
import { AnimatePresence } from "framer-motion";
import SuccessModal from "./SuccessModal";
import WarningModal from "./WarningModal";

import notFoundAnimation from "../lottieAnimations/notFoundAnimation.json";
import { BACKEND_IP } from "@/utils";
import { Image, Spinner } from "@nextui-org/react";

const AdminLogin = () => {
  const router = useRouter();
  const net_ip = BACKEND_IP;

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   const authToken = getAuthTokenFromCookie();
  //   if (authToken) {
  //     router.push("/admindash");
  //   }
  // }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${net_ip}/bot/LoginView`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        // localStorage.setItem("token", response.data.response.token);
        setAuthTokenCookie(response.data.response.token);
        setSuccessMessage(
          <span>
            {response.data.message} <br />
            <p className="text-sm text-gray-600 font-normal">redirecting...</p>
          </span>
        );
        setIsSuccess(true);
        setIsLoading(false);
        router.push("/admindash");
        setFormData({
          email: "",
          password: "",
        });
        // router.refresh();
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
      if (error.response?.data.status_code === 400) {
        if (error.response.data.message === "User not Found") {
          setErrorMessage(error.response.data.message);
          setIsNotFound(true);
          setIsLoading(false);
          setFormData({
            email: "",
            password: "",
          });
          return;
        }
        setErrorMessage(error.response.data.message);
        setIsError(true);
        setIsLoading(false);
        setFormData({
          email: "",
          password: "",
        });
      }
      setErrorMessage(error.message);
      setIsError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-dvh md:h-lvh py-4 px-8 flex justify-center lg:justify-end items-center relative bg-[url('/assets/court.jpg')] bg-no-repeat bg-cover">
      <div className="invisible md:visible absolute top-0 left-0 w-full h-full bg-gradient-to-l from-blue-950 from-30% to-blue-950/50 z-0" />
      <div className="md:invisible visible absolute top-0 left-0 w-full h-full bg-blue-950/70 backdrop-blur-sm z-0" />

      {/* Form container */}
      <div className="w-full max-w-xl h-auto lg:mr-8 bg-white rounded-2xl shadow-2xl shadow-black/20 z-[5] overflow-hidden">
        <div className="w-full h-full grid py-4 md:py-10 relative">
          <div className="w-full h-auto py-2 px-6 md:px-16">
            <Image
              radius="none"
              src="/assets/optillus-logo.svg"
              className="object-cover"
              width={150}
            />
          </div>
          <div className="w-full h-full grid place-items-start px-6 md:px-16 py-2">
            {/* Form container */}
            <div className="w-full my-auto flex flex-col justify-center">
              <div className="">
                <h1 className="text-gray-700">Admin Login</h1>
                
              </div>

              {/* -------- Form -------- */}
              <form onSubmit={handleLogin} className="flex flex-col w-full">
                <div className="py-3 gap-1">
                  <label className="text-sm text-gray-600 font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      className="w-full rounded-lg border-2 border-gray-200 p-2 pe-10"
                      required
                      onChange={handleInputChange}
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-3">
                      <MdAlternateEmail size={18} />
                    </span>
                  </div>
                </div>

                <div className="pt-3 gap-1">
                  <label className="text-sm text-gray-600 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      className="w-full rounded-lg border-2 border-gray-200 p-2 pe-10"
                      required
                      onChange={handleInputChange}
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-3">
                      {!showPassword ? (
                        <PiEyeClosed
                          size={18}
                          className="cursor-pointer"
                          onClick={() => setShowPassword(true)}
                        />
                      ) : (
                        <PiEye
                          size={18}
                          className="cursor-pointer"
                          onClick={() => setShowPassword(false)}
                        />
                      )}
                    </span>
                  </div>
                </div>

                

                <div className="w-full py-3">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-lg bg-[#3359A7] px-5 py-2 font-medium text-white hover:bg-[#4168b7] hover:shadow-lg hover:shadow-black/20 duration-200"
                  >
                    {isLoading ? <Spinner size="sm" color="white" /> : "Login"}
                  </button>
                </div>

                
              </form>
              {/* --------- Form -------- */}

              <AnimatePresence>
                {isSuccess && (
                  <SuccessModal
                    message={successMessage}
                    setIsSuccess={setIsSuccess}
                  />
                )}
                {isError && (
                  <WarningModal
                    message={errorMessage}
                    setIsWarning={setIsError}
                  />
                )}
                {isNotFound && (
                  <WarningModal
                    animation={notFoundAnimation}
                    message={errorMessage}
                    setIsWarning={setIsNotFound}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
