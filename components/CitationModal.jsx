import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  DrawerHeader,
  DrawerCloseButton,
  Input,
  Box,
  Text,
  Button,
  Flex,
  chakra,
  Select,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAngleLeft, FaAngleRight, FaMagnifyingGlass } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";
import { dmSans } from "@/utils";
import { Spinner } from "@nextui-org/react";
import { BACKEND_IP } from "@/utils";
import Cookies from "js-cookie";

const AnimatedCard = ({
  isSelected,
  onSelect,
  title,
  snippet,
  name,
  onCardClick,
  dateFiled,
  status,
  docket,
  citations,
  id,
  courtName,
  courtString,
}) => {
  function formatString(input) {
    // Regular expression to match text wrapped in <mark> tags
    const regex = /<mark>(.*?)<\/mark>/g;
    // Replace matched text with the same text wrapped in actual HTML <strong> tags
    let output = input.replace(regex, "<strong>$1</strong>");

    return output;
  }

  function extractDateFromISOString(isoString) {
    const dateParts = isoString.split("T")[0].split("-");
    const extractedDate = dateParts.join("-");
    return extractedDate;
  }

  const formattedDescription = formatString(snippet);
  const formattedDate = extractDateFromISOString(dateFiled);

  const citationData = citations?.map((cite) => `${cite}`).join(" ,");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2 }}
      // whileHover={{ scale: 1.02 }}
      // whileTap={{ scale: 0.98 }}
      className={`${dmSans.className}`}
    >
      <Box
        p={4}
        mb={2}
        borderWidth="1px"
        bg={isSelected ? "#1E40AF" : "#E5E7EB"}
        borderRadius="2xl"
        boxShadow={"md"}
        color={"gray.800"}
      >
        <Text fontWeight="semibold" color={isSelected ? "#fff" : "gray.600"}>
          {title}
          {", "}
          {name}
        </Text>
        <Flex mt={2} gap={7}>
          <Text color={isSelected ? "#fff" : "gray.600"}>
            {" "}
            <chakra.span fontWeight={"bold"}>Date Filed:</chakra.span>{" "}
            {formattedDate}{" "}
          </Text>
          <Text color={isSelected ? "#fff" : "gray.600"}>
            {" "}
            <chakra.span fontWeight={"bold"}>Status:</chakra.span> {status}{" "}
          </Text>
        </Flex>
        <Flex mt={2} gap={2} flexDir={"column"}>
          <Text color={isSelected ? "#fff" : "gray.600"}>
            {" "}
            <chakra.span fontWeight={"bold"}>Citations:</chakra.span>{" "}
            {citationData}{" "}
          </Text>

          <Text color={isSelected ? "#fff" : "gray.600"}>
            {" "}
            <chakra.span fontWeight={"bold"}>Docket:</chakra.span>{" "}
            {docket ? docket : "N/A"}{" "}
          </Text>
          <Text color={isSelected ? "#fff" : "gray.600"}>
            {" "}
            <chakra.span fontWeight={"bold"}>Court:</chakra.span> {courtName}
            {"  "}
            {courtString}
          </Text>
        </Flex>
        <Text mt={2} fontSize="sm" color={isSelected ? "gray.200" : "gray.600"}>
          <span dangerouslySetInnerHTML={{ __html: formattedDescription }} />
        </Text>
        <Flex flexDir={"row"} gap={2}>
          <Button
            mt={3}
            onClick={onSelect}
            bg={isSelected ? "#E5E7EB" : "#1E40AF"}
            color={isSelected ? "gray.600" : "#fff"}
            _hover={{ bg: isSelected ? "gray.300" : "#1E3B8A" }}
            size="sm"
          >
            {isSelected ? "Deselect" : "Select"}
          </Button>
          <Button
            mt={3}
            bg={"#000"}
            _hover={{ bg: "#222222" }}
            color={"gray.50"}
            size="sm"
            onClick={() => onCardClick(id)}
          >
            Detailed View
          </Button>
        </Flex>
      </Box>
    </motion.div>
  );
};

const PopUpCard = ({ data, setSelectedCard }) => {
  function formatString(input) {
    // Regular expression to match text wrapped in <mark> tags
    const regex = /<mark>(.*?)<\/mark>/g;

    // Replace matched text with the same text wrapped in actual HTML <strong> tags
    let output = input?.replace(regex, "<strong>$1</strong>");

    return output;
  }

  const formattedDescription = formatString(data?.content_detail);
  const formattedHtml = formatString(data?.html_with_citations);
  console.log(data?.html_with_citations);

  return (
    <motion.div
      key="expanded-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 999,
        overflowY: "auto",
        padding: "20px",
        boxSizing: "border-box",
      }}
      className={`${dmSans.className}`}
    >
      <Box
        p={4}
        borderWidth="1px"
        borderRadius="lg"
        boxShadow="xl"
        bg="#fff"
        color="black"
        height={"100%"}
        overflow={"auto"}
      >
        {!data ? (
          <div className="w-full h-full grid place-items-center">
            <Spinner size="md" color="#1E40AF" />
          </div>
        ) : (
          <>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Text color={"#fff"} fontWeight={500} fontSize={"30px"}>
                {data?.case_name}
              </Text>
              <Button
                mt={3}
                onClick={() => setSelectedCard(null)}
                color={"#1E40AF"}
                bg={"transparent"}
                _hover={{ bg: "#C4D9FC" }}
                size="sm"
                p={1}
                rounded={"lg"}
              >
                <CgClose size={20} />
              </Button>
            </Flex>
            <Text mt={2} color={"gray.600"}>
              {data?.court.full_name}
            </Text>
            <Text mt={2} color={"gray.600"}>
              Filed: {data?.date_filed}
            </Text>
            <Text mt={2} color={"gray.600"}>
              Precidental Status: {data?.status}
            </Text>
            {data.citation !== null ? (
              <Text mt={2} color={"gray.600"}>
                Citations:
                {data?.citations.map((cit, index) => (
                  <>
                    <chakra.span>Volume: {cit.volume} </chakra.span>
                    <chakra.span>Reporter: {cit.reporter} </chakra.span>
                    <chakra.span>Page num: {cit.page} </chakra.span>
                    <chakra.span>Type: {cit.type} </chakra.span>
                  </>
                ))}
              </Text>
            ) : (
              <Text mt={2} color={"gray.600"}>
                Citations : N/A{" "}
              </Text>
            )}
            {/* <Text mt={2} color={"gray.600"}>
              Citations:
              {data?.citations.map((cit, index) => (
                <>
                  <chakra.span>Volume: {cit.volume} </chakra.span>
                  <chakra.span>Reporter: {cit.reporter} </chakra.span>
                  <chakra.span>Page num: {cit.page} </chakra.span>
                  <chakra.span>Type: {cit.type} </chakra.span>
                </>
              ))}
            </Text> */}
            <Text mt={2} color={"gray.600"}>
              Docket Number: {data?.docket.number}
            </Text>

            {formattedDescription !== "" ? (
              <Text mt={2} color={"gray.800"}>
                <span
                  dangerouslySetInnerHTML={{ __html: formattedDescription }}
                />
              </Text>
            ) : data?.plain_text !== "" ? (
              <Text
                mt={2}
                color={"gray.800"}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {data?.plain_text}
              </Text>
            ) : (
              <Text mt={2} color={"gray.800"}>
                <span
                  dangerouslySetInnerHTML={{
                    __html: data?.html_with_citaitions,
                  }}
                />
              </Text>
            )}
          </>
        )}
      </Box>
    </motion.div>
  );
};

const RightDrawer = ({
  isOpen,
  onClose,
  data,
  ws,
  searchVal,
  setSearchVal,
  sendSearchQuery,
  setSelectedCitationID,
  popUpData,
  openDetailedView,
  setSelectedIds,
  selectedIds,
  sendSelectedCitations,
  pageNumber,
  handleNextPage,
  handlePrevPage,
  sendSearchPageNumber,
  selectedJurisdiction,
  setSelectedJurisdiction,
  selectedCourt,
  setSelectedCourt,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [jurisidcitions, setJurisidcitions] = useState([]);
  const [courts, setCourts] = useState([]);

  const userToken = Cookies.get("token");

  const sendPageRef = useRef();

  useEffect(() => {
    setTotalPages(data?.pagination?.total_pages);
  }, [data]);

  useEffect(() => {
    const getPages = setTimeout(() => {
      if (currentPage) {
        // console.log("changing page...", currentPage);
        sendSearchPageNumber(currentPage);
      }
    }, 1500);

    return () => clearTimeout(getPages);
  }, [currentPage]);

  useEffect(() => {
    const fetchJurisdiction = async () => {
      const response = await fetch(`${BACKEND_IP}/bot/GetJurisdictions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });
      const data = await response.json();
      console.log(data);
      setJurisidcitions(data.response);
      return data;
    };

    fetchJurisdiction();
  }, []);

  useEffect(() => {
    const fetchCourtsAgainstJurisdiction = async () => {
      const response = await fetch(
        `${BACKEND_IP}/bot/GetCourtsByJurisdiction?jurisdiction_id=${selectedJurisdiction}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const data = await response.json();
      console.log(data);
      setCourts(data.response);
      return data;
    };
    if (selectedJurisdiction !== "") {
      fetchCourtsAgainstJurisdiction();
    }
  }, [selectedJurisdiction]);

  const handleCardSelect = (id) => {
    setSelectedIds((prevSelectedIds) => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter((selectedId) => selectedId !== id);
      } else {
        return [...prevSelectedIds, id];
      }
    });
  };

  console.log(jurisidcitions);

  const handleCardClick = (id) => {
    setSelectedCard(id);
    setSelectedCitationID(id);
    openDetailedView(id);
  };

  const handlePageChange = (e) => {
    const { value } = e.target;
    let page = parseInt(value, 10);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    // console.log(typeof page);
    setCurrentPage(page);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      size={"xl"}
      closeOnOverlayClick={false}
    >
      <DrawerOverlay>
        <DrawerContent backgroundColor={"#F3F4F6"} position={"relative"}>
          <DrawerCloseButton color={"#1E40AF"} _hover={{ bg: "#C4D9FC" }} />
          <DrawerHeader color={"#1E40AF"}>Legal Citations</DrawerHeader>

          <DrawerBody>
            <Flex flexDir={"column"} gap={5} h={"full"} position={"relative"}>
              <Text color={"#1E40AF"} fontSize={"20px"}>
                {" "}
                Select Jurisdiction{" "}
              </Text>
              <Flex width={"100%"} gap={3}>
                <Flex gap={4} width={"100%"}>
                  <Select
                    color={"gray.600"}
                    _focus={{ outline: "none", ring: 0, ringColor: "#1E40AF" }}
                    placeholder="Jurisdiction"
                    border={"1px solid gray"}
                    onChange={(e) => setSelectedJurisdiction(e.target.value)}
                  >
                    {jurisidcitions.map((jurisdiction, index) => (
                      <option key={index} value={jurisdiction.value}>
                        {jurisdiction.display_name}
                      </option>
                    ))}
                  </Select>
                </Flex>
                {selectedJurisdiction !== null && courts?.length > 0 ? (
                  <Flex gap={4} width={"100%"}>
                    <Select
                      color={"gray.600"}
                      _focus={{
                        outline: "none",
                        ring: 0,
                        ringColor: "#1E40AF",
                      }}
                      placeholder="Courts"
                      border={"1px solid gray"}
                      onChange={(e) => setSelectedCourt(e.target.value)}
                      width={"100%"}
                    >
                      {courts.map((court, index) => (
                        <option key={index} value={court.Id}>
                          {court.FullName}
                        </option>
                      ))}
                    </Select>
                  </Flex>
                ) : (
                  <></>
                )}
              </Flex>
              <Flex gap={4}>
                <Input
                  color={"gray.600"}
                  _focus={{ outline: "none", ring: 0, ringColor: "#1E40AF" }}
                  placeholder="Citations"
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                />
                <Button
                  onClick={sendSearchQuery}
                  bg={"#1E40AF"}
                  _hover={{ bg: "#1E3B8A" }}
                >
                  <FaMagnifyingGlass color="white" />
                </Button>
              </Flex>
              <Flex flexDir={"column"} gap={5} flexWrap={"wrap"}>
                {data !== null ? (
                  <AnimatePresence>
                    {data &&
                      data?.search_results?.map((card, index) => (
                        <AnimatedCard
                          key={index}
                          isSelected={selectedIds.includes(card.id)}
                          onSelect={() => handleCardSelect(card.id)}
                          onCardClick={() => handleCardClick(card.id)}
                          title={card.court}
                          name={card.caseName}
                          snippet={card.snippet}
                          dateFiled={card.dateFiled}
                          status={card.status}
                          docket={card.docketNumber}
                          citations={card.citation}
                          courtName={card.court}
                          courtString={card.court_citation_string}
                        />
                      ))}
                  </AnimatePresence>
                ) : (
                  <>
                    <div className="w-full h-full grid place-items-center">
                      <Spinner size="md" color="#1E40AF" />
                    </div>
                  </>
                )}
              </Flex>
            </Flex>
            <AnimatePresence>
              {selectedCard && (
                <PopUpCard data={popUpData} setSelectedCard={setSelectedCard} />
              )}
            </AnimatePresence>
          </DrawerBody>
          <Flex
            alignSelf={"flex-end"}
            alignItems={"center"}
            justify={"space-between"}
            gap={2}
            mt={"auto"}
            mb={2}
            position={"absolute"}
            bottom={2}
            right={4}
          >
            {selectedIds && selectedIds.length > 0 && (
              <Button
                onClick={sendSelectedCitations}
                bg={"#1E40AF"}
                _hover={{ bg: "#1E3B8A" }}
                color={"white"}
                rounded={"xl"}
              >
                Continue
              </Button>
            )}

            <div className="flex items-center gap-4 bg-gray-800/40 backdrop-blur-sm p-1 rounded-xl w-auto h-auto">
              <Button
                size={"sm"}
                bg={"#000"}
                _hover={{ bg: "#222" }}
                _disabled={{ bg: "gray.600" }}
                rounded={"lg"}
                shadow={"lg"}
                color={"white"}
                onClick={() => setCurrentPage((prev) => +prev - 1)}
                isDisabled={pageNumber <= 1}
              >
                <FaAngleLeft />
              </Button>
              <Flex
                w={"auto"}
                alignItems={"center"}
                justifyContent={"space-between"}
                gap={1}
                color={"white"}
                textAlign={"center"}
              >
                <div className="w-20 grid place-items-center rounded-lg p-0.5 text-gray-100 font-semibold">
                  {/* {pageNumber} */}
                  <input
                    type="number"
                    value={currentPage}
                    onChange={handlePageChange}
                    className="outline rounded-md py-0.5 px-1 text-white text-right bg-transparent text-sm w-full h-full"
                  />
                </div>
                /
                {totalPages && (
                  <div className=" w-auto grid place-items-center rounded-lg px-1 py-0.5 text-gray-50 font-semibold">
                    {totalPages}
                  </div>
                )}
              </Flex>
              <Button
                size={"sm"}
                bg={"#000"}
                _hover={{ bg: "#222" }}
                _disabled={{ bg: "gray.700" }}
                rounded={"lg"}
                shadow={"lg"}
                color={"white"}
                onClick={() => setCurrentPage((prev) => +prev + 1)}
                isDisabled={pageNumber >= totalPages}
              >
                <FaAngleRight />
              </Button>
            </div>
          </Flex>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

export default RightDrawer;
