"use client";

import React, { useState } from "react";
import {
  Button,
  Image,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { IoIosArrowRoundForward } from "react-icons/io";
import { FaF } from "react-icons/fa6";
import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { BACKEND_IP } from "@/utils";
import axios from "axios";

const Navbar = () => {
  const router = useRouter();

  const net_ip = BACKEND_IP;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleJoinWaitingList = async () => {
    setIsLoading(true);
    if (formData.email.trim() === "" || formData.fullName.trim() === "") {
      setIsLoading(false);
      return;
    }
    try {
      const response = await axios.post(
        `${net_ip}/bot/JoinWaitingList`,
        {
          name: formData.fullName,
          email: formData.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      if (response.data.status) {
        setIsLoading(false);
        setFormData({ fullName: "", email: "" });
        onClose();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleLoginClick = () => {
    router.push("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-20 md:h-24 z-10">
      <div className="w-full h-full px-4 md:px-12 py-2 flex justify-between items-center bg-white border-b border-gray-200">
        <Link href="/">
          <Image
            loading="eager"
            src="/assets/optillus-logo.svg"
            alt="Logo"
            className="object-cover w-[90px] md:w-[130px]"
            radius="none"
          />
        </Link>
        <div className="flex gap-4">
          {/* <button
            type="submit"
            className="rounded-xl bg-blue-800 px-5 py-2 font-medium text-white hover:bg-[#4168b7] hover:shadow-lg hover:shadow-black/20 duration-200"
          >
            Login
          </button>
          <button
            type="submit"
            className="rounded-xl bg-blue-500/20 px-4 py-2 font-medium text-blue-800 hover:bg-blue-500/30 hover:shadow-lg hover:shadow-black/20 duration-200"
          >
            Sign up
          </button> */}
          {/* <Button
            disableRipple
            endContent={
              <IoIosArrowRoundForward
                color="white"
                className="group-hover:translate-x-1 duration-150 size-4 sm:size-5"
              />
            }
            className="relative overflow-visible text-gray-100 text-xs sm:text-base sm:px-6 shadow-xl hover:bg-black/90 bg-black after:content-[''] after:absolute after:rounded-xl after:inset-0 after:bg-black/15 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 group"
            onClick={onOpen}
          >
            Join waiting list
          </Button> */}

          <Button
            disableRipple
            className="relative overflow-visible text-gray-100 text-xs sm:text-base sm:px-6 shadow-xl hover:bg-blue-800/90 bg-blue-800 after:content-[''] after:absolute after:rounded-xl after:inset-0 after:bg-blue-800/15 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0 group"
            onClick={handleLoginClick}
          >
            Login / Signup
          </Button>
        </div>
      </div>
      <Modal
        size="lg"
        isOpen={isOpen}
        onClose={onClose}
        backdrop="opaque"
        classNames={{
          backdrop:
            "bg-gradient-to-t from-blue-900 to-blue-900/10 backdrop-opacity-20",
        }}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="w-full h-auto py-2">
                  <Image
                    radius="none"
                    src="/assets/optillus-logo.svg"
                    className="object-cover"
                    width={150}
                  />
                </div>
                <h1 className="text-gray-700">We are launching soon</h1>
                <p className="text-gray-500 text-sm font-normal">
                  Join our waiting list now to get early access
                </p>
              </ModalHeader>
              <ModalBody>
                <form className="flex flex-col w-full">
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
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-blue-800 text-white"
                  isLoading={isLoading}
                  onPress={handleJoinWaitingList}
                >
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </nav>
  );
};

export default Navbar;
