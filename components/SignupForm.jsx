"use client";

import React, { useState, useEffect } from "react";

// import { Image } from "@chakra-ui/react";

import { FaRegEye, FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { PiEye, PiEyeClosed } from "react-icons/pi";

import Link from "next/link";
import axios from "axios";

import { AnimatePresence } from "framer-motion";

import SuccessModal from "./SuccessModal";
import WarningModal from "./WarningModal";
import { ImSpinner } from "react-icons/im";
import { BACKEND_IP } from "@/utils";
import { Image, Spinner } from "@nextui-org/react";

const SignupForm = () => {
  const net_ip = BACKEND_IP;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isCPasswordDirty, setIsCPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // useEffect(() => {
  //   if (isCPasswordDirty) {
  //     if (formData.password === formData.confirmPassword) {
  //       setPasswordError(false);
  //     } else {
  //       setPasswordError(true);
  //     }
  //   }
  // }, [formData.confirmPassword]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (isCPasswordDirty) {
        if (formData.password === formData.confirmPassword) {
          setPasswordError(false);
        } else {
          setPasswordError(true);
        }
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [formData.confirmPassword]);

  const handleConfirmPassword = (e) => {
    setCPassword(e.target.value);
    setIsCPasswordDirty(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "password") setIsCPasswordDirty(true);
    if (
      name === "confirmPassword" &&
      formData.password === formData.confirmPassword
    )
      setPasswordError(false);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    let nameLength = formData.fullName.split(" ").length;
    // let first_name = formData.fullName.split(" ").slice(0, -1).join(" ");
    const first_name =
      nameLength > 1
        ? formData.fullName.split(" ").slice(0, -1).join(" ")
        : formData.fullName;

    let last_name =
      nameLength > 1 ? formData.fullName.split(" ")[nameLength - 1] : "";

    if (passwordError) {
      return;
    }

    try {
      var response = await axios.post(
        `${net_ip}/bot/SignupView`,
        JSON.stringify({
          email: formData.email,
          first_name: first_name,
          last_name: last_name,
          password: formData.password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // console.log(response.data.message);
      if (response.data.status) {
        setSuccessMessage(response.data.message);
        setIsSuccess(true);
        setIsLoading(false);

        setFormData({
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response.data.status_code === 400) {
        setErrorMessage(error.response.data.message);
        setIsError(true);
        setIsLoading(false);
      }
      console.log(error.response.data);
    }
  };

  return (
    <div className="w-screen h-dvh md:h-lvh py-4 px-8 flex justify-center lg:justify-end items-center relative bg-[url('/assets/court.jpg')] bg-no-repeat bg-cover">
      <div className="invisible md:visible absolute top-0 left-0 w-full h-full bg-gradient-to-l from-blue-950 from-30% to-blue-950/50 z-0" />
      <div className="md:invisible visible absolute top-0 left-0 w-full h-full bg-blue-950/70 z-0" />

      <div className="w-full max-w-xl h-auto lg:mr-8 bg-white rounded-2xl shadow-2xl shadow-black/20 backdrop-blur-sm z-[5] overflow-hidden">
        {/* <div className="w-full h-full flex flex-col justify-center">
            <div className="w-3/4 h-auto p-6 relative">
              <Image src="/assets/optillus-logo.svg" className="object-cover" />
            </div>
            <div className="w-3/4 h-auto p-6 relative">
              <Image src="/assets/optillus-logo.svg" className="object-cover" />
            </div>


            <Image src="/assets/tax-docs.jpg" objectFit={"cover"} h={"full"} />
          </div> */}

        <div className="w-full h-full flex flex-col py-4 md:py-10">
          <div className="w-full h-auto py-2 px-6 md:px-16">
            <Image
              radius="none"
              src="/assets/optillus-logo.svg"
              className="object-cover h-auto"
              width={150}
            />
          </div>
          <div className="w-full h-full grid place-items-start px-6 md:px-16 py-2">
            {/* Form container */}
            <div className="w-full my-auto flex flex-col justify-center">
              <div className=" ">
                <h1 className="text-gray-700 tracking-tight">
                  Create an account
                </h1>
              </div>

              {/* -------- Form -------- */}
              <form onSubmit={handleSignUp} className="flex flex-col w-full">
                <div className="pt-3 pb-2 gap-1">
                  <label className="text-sm text-gray-600 font-medium">
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-2 border-gray-200 p-2 pe-10"
                      required
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-3">
                      <AiOutlineUser size={18} />
                    </span>
                  </div>
                </div>

                <div className="py-2 gap-1">
                  <label className="text-sm text-gray-600 font-medium">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-2 border-gray-200 p-2 pe-10"
                      required
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-3">
                      <MdAlternateEmail size={18} />
                    </span>
                  </div>
                </div>

                <div className="py-2 gap-1">
                  <label className="text-sm text-gray-600 font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-2 border-gray-200 p-2 pe-10"
                      required
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

                <div className="py-2 gap-1 relative">
                  <label className="text-sm text-gray-600 font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border-2 border-gray-200 p-2 pe-10"
                      required
                    />
                    <span className="absolute inset-y-0 end-0 grid place-content-center px-3">
                      {!showConfirmPassword ? (
                        <PiEyeClosed
                          size={18}
                          className="cursor-pointer"
                          onClick={() => setShowConfirmPassword(true)}
                        />
                      ) : (
                        <PiEye
                          size={18}
                          className="cursor-pointer"
                          onClick={() => setShowConfirmPassword(false)}
                        />
                      )}
                    </span>
                  </div>

                  {passwordError && isCPasswordDirty ? (
                    <span className="absolute -bottom-2 left-0 text-xs text-red-600">
                      Password does not match
                    </span>
                  ) : null}
                </div>

                <div className="w-full py-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-lg bg-[#3359A7] px-5 py-2 font-medium text-white hover:bg-[#4168b7] hover:shadow-lg hover:shadow-black/20 duration-200"
                  >
                    {isLoading ? <Spinner size="sm" color="white" /> : "Signup"}
                  </button>
                </div>

                <div className="w-full flex gap-1 pt-2 pb-1">
                  <p className="text-gray-500 text-sm">
                    Already have an account?
                  </p>
                  <Link
                    href="/login"
                    className="text-black font-medium text-sm hover:underline hover:underline-offset-1"
                  >
                    Login
                  </Link>
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
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
