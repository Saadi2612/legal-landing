"use client";

import React, { useEffect, useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_IP } from "@/utils";
import { Spinner } from "@nextui-org/react";

const PDFView = ({ params, searchParams }) => {
  const [briefData, setBriefData] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // console.log(searchParams, params);
  const briefType = searchParams.briefType;

  const userToken = Cookies.get("token");
  const net_ip = BACKEND_IP;

  useEffect(() => {
    const fetchBriefPreview = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${net_ip}/bot/UserBriefView?brief_id=${params.pdf}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (response.status === 200) {
          // console.log(response);
          setBriefData(response.data.response.brief_data);
          setIsLoading(false);
        }
        // console.log(response.data.message);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    if (params.pdf) {
      fetchBriefPreview();
    }
  }, [params.pdf]);

  // console.log(briefData);

  function convertToRoman(num) {
    const romanMap = {
      M: 1000,
      CM: 900,
      D: 500,
      CD: 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X: 10,
      IX: 9,
      V: 5,
      IV: 4,
      I: 1,
    };
    let roman = "";
    for (let key in romanMap) {
      while (num >= romanMap[key]) {
        roman += key;
        num -= romanMap[key];
      }
    }
    return roman;
  }

  const downloadDoc = async () => {
    try {
      const response = await axios.get(`${net_ip}/bot/DownloadAsDocx?brief_id=${params.pdf}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        responseType: 'blob', // This tells Axios to expect a binary response
      });
      if (response.status === 200) {
        // Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
        // Create a link to download it
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileURL;
        link.setAttribute('download', 'document.docx'); // or any other extension
        document.body.appendChild(link);
        link.click();
        URL.revokeObjectURL(link.href); // Clean up and remove the link
        link.remove();
        
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      <Flex width={"100%"} p={4}>
        <Button alignSelf={"flex-end"} onClick={downloadDoc} >Download Document</Button>
      </Flex>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {isLoading ? (
          <div className="fixed inset-0 grid place-items-center">
            <Spinner size="lg" color="primary" />
          </div>
        ) : briefType === "Brief" ? (
          <Flex
            backgroundColor={"#fff"}
            gap={3}
            flexDir={"column"}
            p={4}
            maxW={"800px"}
          >
            <Text textAlign={"center"} color={"black"}>
              NO. 2013-01{" "}
            </Text>
            <Box>
              <Box
                width={"100%"}
                height={"10px"}
                backgroundColor={"black"}
              ></Box>
              <Box
                width={"100%"}
                height={"3px"}
                mt={"1px"}
                backgroundColor={"black"}
              ></Box>
            </Box>
            <Text textAlign={"center"} color={"black"}>
              IN THE
            </Text>
            <Text
              textAlign={"center"}
              color={"black"}
              fontSize={"30px"}
              fontWeight={500}
              textTransform={"uppercase"}
            >
              {briefData.court_name}
            </Text>

            <Text
              textAlign={"center"}
              color={"black"}
              textTransform={"uppercase"}
            >
              {briefData.court_term}
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box
                width={"15%"}
                height={"3px"}
                mt={"1px"}
                backgroundColor={"black"}
              ></Box>
            </Flex>
            <Text
              textAlign={"center"}
              color={"black"}
              textTransform={"uppercase"}
            >
              {briefData.petitioner_name}
            </Text>
            <Text textAlign={"center"} color={"black"} ml={"250px"}>
              Petitioner,
            </Text>
            <Text textAlign={"center"} color={"black"}>
              v.
            </Text>
            <Text
              textAlign={"center"}
              color={"black"}
              textTransform={"uppercase"}
            >
              {briefData.respondent_name}
            </Text>
            <Text textAlign={"center"} color={"black"} ml={"250px"}>
              Respondent,
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box
                width={"15%"}
                height={"3px"}
                mt={"1px"}
                backgroundColor={"black"}
              ></Box>
            </Flex>
            {/* <Text textAlign={"center"} color={"black"}>
            ON WRIT OF CERTIORARI TO THE UNITED
            <br /> STATES COURT OF APPEALS FOR THE
            <br />
            THIRTEENTH CIRCUIT
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Box
              width={"15%"}
              height={"3px"}
              mt={"1px"}
              backgroundColor={"black"}
            ></Box>
          </Flex> */}
            <Text textAlign={"center"} color={"black"} fontWeight={"bold"}>
              BRIEF FOR THE RESPONDENT
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box
                width={"15%"}
                height={"3px"}
                mt={"1px"}
                backgroundColor={"black"}
              ></Box>
            </Flex>
            <Text textAlign={"center"} color={"black"}>
              NORTHWESTERN UNIVERSITY SCHOOL OF LAW
              <br /> JULIUS H. MINER MOOT COURT COMPETITION
              <br /> ATTORNEYS FOR THE RESPONDENT:
            </Text>
            <Box>
              <Box
                width={"100%"}
                height={"3px"}
                mb={"1px"}
                backgroundColor={"black"}
              ></Box>
              <Box
                width={"100%"}
                height={"10px"}
                backgroundColor={"black"}
              ></Box>
            </Box>
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={"bold"}
              textDecoration={"underline"}
              marginTop={"600px"}
            >
              QUESTIONS PRESENTED
            </Text>
            <Flex flexDir={"column"} gap={5}>
              {briefData?.questions_presented &&
                briefData?.questions_presented?.map((question, index) => (
                  <span
                    key={index}
                    style={{ display: "block" }}
                    dangerouslySetInnerHTML={{
                      __html: index + 1 + ". " + question || "",
                    }}
                  />
                ))}
            </Flex>

            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={"bold"}
              textDecoration={"underline"}
              marginTop={"450px"}
            >
              INDEX
            </Text>
            <Text color={"black"} fontWeight={"bold"}>
              QUESTIONS PRESENTED
            </Text>
            <Text color={"black"} fontWeight={"bold"}>
              TABLE OF AUTHORITIES
            </Text>
            <Text color={"black"} fontWeight={"bold"}>
              STATEMENT OF THE CASE
            </Text>
            <Text color={"black"} fontWeight={"bold"}>
              SUMMARY OF THE ARGUMENT
            </Text>
            <Text color={"black"} fontWeight={"bold"}>
              ARGUMENT
            </Text>
            <Flex flexDir={"column"} ml={10}>
              {briefData?.brief_arguments?.map((sectionOuter, indexOuter) => (
                <React.Fragment key={indexOuter}>
                  <Flex justifyContent={"space-between"}>
                    <Text fontWeight="bold" fontSize="lg" color={"black"}>
                      {convertToRoman(indexOuter + 1)}. {sectionOuter.title}
                    </Text>
                  </Flex>
                </React.Fragment>
              ))}
            </Flex>
            <Text color={"black"} fontWeight={"bold"}>
              CONCLUSION
            </Text>

            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={"bold"}
              textDecoration={"underline"}
              marginTop={"600px"}
            >
              TABLE OF AUTHORITIES
            </Text>
            <Text color={"black"} fontWeight={"bold"}>
              Cases:
            </Text>
            {briefData?.table_of_authorities?.map((line, index) => (
              <Flex
                key={index}
                justifyContent={"flex-start"}
                alignItems={"center"}
                ml={9}
                my={1}
              >
                <Text color={"black"}>{index + 1}.</Text>
                <Text
                  color={"black"}
                  fontStyle={"italic"}
                  ml={2}
                  dangerouslySetInnerHTML={{ __html: line || "" }}
                />
              </Flex>
            ))}

            {/* <Text
          textAlign={"center"}
          color={"black"}
          fontWeight={"bold"}
          textDecoration={"underline"}
          marginTop={"700px"}
        >
          INDEX
        </Text>
        <Flex flexDir={"column"}>
          {documentSections.map((sectionOuter, indexOuter) => (
            <React.Fragment key={indexOuter}>
              <Flex justifyContent={"space-between"}>
                <Text fontWeight="bold" fontSize="lg" color={"black"}>
                  {sectionOuter.title}
                </Text>
                <Text color={"black"}>{indexOuter + 1}</Text>
              </Flex>
            </React.Fragment>
          ))}
          {dummyLegalDocument.map((section, index) => (
            <Flex key={index} justifyContent={"space-between"}>
              <Text fontWeight="bold" fontSize="lg" color={"black"}>
                {section.title}
              </Text>
              <Text color={"black"}>{index + 1}</Text>
            </Flex>
          ))}
          {dummyLegalArgument.map((sectionInner, indexInner) => (
            <Flex key={indexInner} justifyContent={"space-between"}>
              <Text fontWeight="bold" fontSize="lg" color={"black"}>
                {sectionInner.title}
              </Text>
              <Text color={"black"}>{indexInner + 1}</Text>
            </Flex>
          ))}
        </Flex>
        <Text
          textAlign={"center"}
          color={"black"}
          fontWeight={"bold"}
          textDecoration={"underline"}
          marginTop={"600px"}
        >
          TABLE OF AUTHORITIES
        </Text> */}
            {/* <Text color={"black"} fontWeight={"bold"}>
          Cases:
        </Text>
        {dummyCases.map((section, index) => (
          <Flex key={index} justifyContent={"space-between"} ml={9}>
            <Text color={"black"} fontStyle={"italic"}>
              {section.title}
            </Text>
            <Text color={"black"}>{index + 1}</Text>
          </Flex>
        ))}
        <Text color={"black"} fontWeight={"bold"}>
          Cases-Continued:
        </Text>
        {dummyCases.map((section, index) => (
          <Flex key={index} justifyContent={"space-between"} ml={9}>
            <Text color={"black"} fontStyle={"italic"}>
              {section.title}
            </Text>
            <Text color={"black"}>{index + 1}</Text>
          </Flex>
        ))}
        <Text color={"black"} fontWeight={"bold"}>
          Constitution, statutes, and rules:
        </Text>
        {dummyCases.map((section, index) => (
          <Flex key={index} justifyContent={"space-between"} ml={9}>
            <Text color={"black"} fontStyle={"italic"}>
              {section.title}
            </Text>
            <Text color={"black"}>{index + 1}</Text>
          </Flex>
        ))}
        <Text color={"black"} fontWeight={"bold"}>
          Other Authorities:
        </Text>
        {dummyCases.map((section, index) => (
          <Flex key={index} justifyContent={"space-between"} ml={9}>
            <Text color={"black"} fontStyle={"italic"}>
              {section.title}
            </Text>
            <Text color={"black"}>{index + 1}</Text>
          </Flex>
        ))} */}
            {/* <Text textAlign={"center"} color={"black"} mt={"350px"}>
            NO. 2013-01{" "}
          </Text>
          <Text textAlign={"center"} color={"black"}>
            IN THE
          </Text>
          <Text
            textAlign={"center"}
            color={"black"}
            fontSize={"30px"}
            fontWeight={500}
            textTransform={"uppercase"}
          >
            {briefData.court_name}
          </Text>

          <Text
            textAlign={"center"}
            color={"black"}
            textTransform={"uppercase"}
          >
            {briefData.court_term}
          </Text>
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Box
              width={"15%"}
              height={"3px"}
              mt={"1px"}
              backgroundColor={"black"}
            ></Box>
          </Flex>
          <Flex flexDir={"column"} gap={1}>
            <Text
              textAlign={"center"}
              fontWeight={"bold"}
              color={"black"}
              textTransform={"uppercase"}
            >
              {briefData.petitioner_name}
            </Text>
            <Text textAlign={"center"} color={"black"}>
              Petitioner,
            </Text>
          </Flex>
          <Text textAlign={"center"} color={"black"}>
            v.
          </Text>
          <Flex flexDir={"column"} gap={1}>
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={"bold"}
              textTransform={"uppercase"}
            >
              {briefData.respondent_name}
            </Text>
            <Text textAlign={"center"} color={"black"}>
              Respondent,
            </Text>
          </Flex> */}
            {/* <Flex alignItems={"center"} justifyContent={"center"}>
          <Box
            width={"15%"}
            height={"3px"}
            mt={"1px"}
            backgroundColor={"black"}
          ></Box>
        </Flex> */}
            {/* <Text textAlign={"center"} color={"black"} fontStyle={"italic"}>
          ON WRIT OF CERTIORARI TO THE UNITED
          <br /> STATES COURT OF APPEALS FOR THE
          <br />
          THIRTEENTH CIRCUIT
        </Text> */}
            {/* <Flex alignItems={"center"} justifyContent={"center"}>
          <Box
            width={"15%"}
            height={"3px"}
            mt={"1px"}
            backgroundColor={"black"}
          ></Box>
        </Flex> */}
            {/* <Text textAlign={"center"} color={"black"} fontWeight={"bold"}>
          BRIEF FOR THE RESPONDENT
        </Text> */}
            {/* <Flex alignItems={"center"} justifyContent={"center"}>
          <Box
            width={"15%"}
            height={"3px"}
            mt={"1px"}
            backgroundColor={"black"}
          ></Box>
        </Flex> */}
            {/* <Text
          textAlign={"center"}
          color={"black"}
          fontWeight={"bold"}
          textDecoration={"underline"}
        >
          OPINIONS BELOW
        </Text>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
        >
          <Text textAlign={"center"} color={"black"} maxW={"500px"}>
            The opinion of the United States District Court for the District of
            Wigmore is reported as Leiter v. Village of Spies-Roth, 231 F.Supp.
            6th 4 (D. Wig. 2012).
          </Text>
          <Text textAlign={"center"} color={"black"} maxW={"500px"}>
            The opinion of the United States Court of Appeals for the Thirteenth
            Circuit is reported as Leiter v. Village of Spies-Roth, 528 F.4th 16
            (13th Cir. 2013).
          </Text>
        </Box>
        <Text
          textAlign={"center"}
          color={"black"}
          fontWeight={"bold"}
          textDecoration={"underline"}
        >
          RELEVANT STATUTES AND CONSTITUTIONAL PROVISIONS
        </Text>
        <Text textAlign={"center"} color={"black"}>
          The relevant provisions are set forth in the Appendix.
        </Text> */}
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={"bold"}
              textDecoration={"underline"}
              marginTop={"700px"}
              textTransform={"uppercase"}
            >
              Statement of the case
            </Text>
            <Text color={"black"}>{briefData.statement_of_case}</Text>
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={"bold"}
              textDecoration={"underline"}
              marginTop={"70px"}
              textTransform={"uppercase"}
            >
              SUMMARY OF THE ARGUMENT
            </Text>
            <Text color={"black"}>{briefData.summary_of_arguments}</Text>
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={"bold"}
              textDecoration={"underline"}
              textTransform={"uppercase"}
            >
              ARGUMENT
            </Text>
            {briefData?.brief_arguments?.map((item, index) => (
              <Box key={index}>
                <Text
                  textAlign={"center"}
                  fontWeight={"bold"}
                  textTransform={"uppercase"}
                  textDecoration={"underline"}
                  color={"black"}
                >
                  {item.title}
                </Text>
                <Text color={"black"}>{item.description}</Text>
              </Box>
            ))}
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={"bold"}
              textDecoration={"underline"}
              textTransform={"uppercase"}
            >
              Conclusion
            </Text>
            <Text
              color={"black"}
              dangerouslySetInnerHTML={{ __html: briefData?.conclusion || "" }}
            />
          </Flex>
        ) : (
          <Flex backgroundColor={"#fff"} gap={3} flexDir={"column"} p={4}>
            <Text textAlign={"center"} color={"black"}>
              NO. 2013-01{" "}
            </Text>
            <Text textAlign={"center"} color={"black"}>
              IN THE
            </Text>
            <Text
              textAlign={"center"}
              color={"black"}
              textTransform={"uppercase"}
            >
              {briefData?.court_name ? briefData?.court_name : "N/A"}
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box
                width={"60%"}
                height={"3px"}
                mt={"1px"}
                borderStyle={"dashed"}
                borderWidth={"1.1px"} // Adjust the border width to change the size of the dots
                borderColor={"black"}
              ></Box>
            </Flex>
            <Text textAlign={"center"} color={"black"}>
              {briefData?.petitioner_name ? briefData?.petitioner_name : "N/A"},
              Petitioner
            </Text>
            <Text textAlign={"center"} color={"black"}>
              v.
            </Text>
            <Text textAlign={"center"} color={"black"}>
              {briefData?.respondent_name ? briefData?.respondent_name : "N/A"},
              Respondent
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box
                width={"65%"}
                height={"2px"}
                mt={"1px"}
                backgroundColor={"black"}
              ></Box>
            </Flex>
            <Text textAlign={"center"} color={"black"}>
              On Appeal from the Third Department
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box
                width={"80%"}
                height={"3px"}
                mt={"1px"}
                borderStyle={"dashed"}
                borderWidth={"1.1px"} // Adjust the border width to change the size of the dots
                borderColor={"black"}
              ></Box>
            </Flex>
            {/* <Text
            textAlign={"center"}
            color={"black"}
            fontWeight={"bold"}
            textTransform={"uppercase"}
          >
            {briefData?.title_of_brief ? briefData?.title_of_brief : "N/A"}
          </Text> */}
            <Text
              textAlign={"center"}
              color={"black"}
              textTransform={"uppercase"}
              fontWeight={500}
            >
              BRIEF FOR THE RESPONDENT:
            </Text>
            <Text textAlign={"center"} color={"black"}>
              {briefData?.title_of_brief ? briefData?.title_of_brief : "N/A"}
            </Text>
            <Flex alignItems={"center"} justifyContent={"center"}>
              <Box
                width={"80%"}
                height={"3px"}
                mt={"1px"}
                borderStyle={"dashed"}
                borderWidth={"1.1px"} // Adjust the border width to change the size of the dots
                borderColor={"black"}
              ></Box>
            </Flex>
            <Text
              textAlign={"center"}
              color={"black"}
              textDecoration={"underline"}
              marginTop={"400px"}
              fontWeight={500}
            >
              QUESTIONS PRESENTED
            </Text>
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              flexDir={"column"}
              color={"black"}
              gap={5}
            >
              {briefData?.questions_presented &&
                briefData?.questions_presented?.map((question, index) => (
                  <span key={index} style={{ display: "block" }}>
                    {index + 1}. {question}
                  </span>
                ))}
            </Flex>
            {/* <Text
          textAlign={"center"}
          color={"black"}
          fontWeight={"bold"}
          textDecoration={"underline"}
          marginTop={"700px"}
        >
          INDEX
        </Text>
        <Flex flexDir={"column"}>
          {documentSections.map((sectionOuter, indexOuter) => (
            <React.Fragment key={indexOuter}>
              <Flex justifyContent={"space-between"}>
                <Text fontWeight="bold" fontSize="lg" color={"black"}>
                  {sectionOuter.title}
                </Text>
                <Text color={"black"}>{indexOuter + 1}</Text>
              </Flex>
            </React.Fragment>
          ))}
          {dummyLegalDocument.map((section, index) => (
            <Flex key={index} justifyContent={"space-between"}>
              <Text fontWeight="bold" fontSize="lg" color={"black"}>
                {section.title}
              </Text>
              <Text color={"black"}>{index + 1}</Text>
            </Flex>
          ))}
          {dummyLegalArgument.map((sectionInner, indexInner) => (
            <Flex key={indexInner} justifyContent={"space-between"}>
              <Text fontWeight="bold" fontSize="lg" color={"black"}>
                {sectionInner.title}
              </Text>
              <Text color={"black"}>{indexInner + 1}</Text>
            </Flex>
          ))}
        </Flex>
        <Text
          textAlign={"center"}
          color={"black"}
          fontWeight={"bold"}
          textDecoration={"underline"}
          marginTop={"600px"}
        >
          TABLE OF AUTHORITIES
        </Text> */}
            {/* <Text color={"black"} fontWeight={"bold"}>
          Cases:
        </Text>
        {dummyCases.map((section, index) => (
          <Flex key={index} justifyContent={"space-between"} ml={9}>
            <Text color={"black"} fontStyle={"italic"}>
              {section.title}
            </Text>
            <Text color={"black"}>{index + 1}</Text>
          </Flex>
        ))}
        <Text color={"black"} fontWeight={"bold"}>
          Cases-Continued:
        </Text>
        {dummyCases.map((section, index) => (
          <Flex key={index} justifyContent={"space-between"} ml={9}>
            <Text color={"black"} fontStyle={"italic"}>
              {section.title}
            </Text>
            <Text color={"black"}>{index + 1}</Text>
          </Flex>
        ))}
        <Text color={"black"} fontWeight={"bold"}>
          Constitution, statutes, and rules:
        </Text>
        {dummyCases.map((section, index) => (
          <Flex key={index} justifyContent={"space-between"} ml={9}>
            <Text color={"black"} fontStyle={"italic"}>
              {section.title}
            </Text>
            <Text color={"black"}>{index + 1}</Text>
          </Flex>
        ))}
        <Text color={"black"} fontWeight={"bold"}>
          Other Authorities:
        </Text>
        {dummyCases.map((section, index) => (
          <Flex key={index} justifyContent={"space-between"} ml={9}>
            <Text color={"black"} fontStyle={"italic"}>
              {section.title}
            </Text>
            <Text color={"black"}>{index + 1}</Text>
          </Flex>
        ))} */}
            {/* <Flex alignItems={"center"} justifyContent={"center"}>
          <Box
            width={"15%"}
            height={"3px"}
            mt={"1px"}
            backgroundColor={"black"}
          ></Box>
        </Flex> */}
            {/* <Text textAlign={"center"} color={"black"} fontStyle={"italic"}>
          ON WRIT OF CERTIORARI TO THE UNITED
          <br /> STATES COURT OF APPEALS FOR THE
          <br />
          THIRTEENTH CIRCUIT
        </Text> */}
            {/* <Flex alignItems={"center"} justifyContent={"center"}>
          <Box
            width={"15%"}
            height={"3px"}
            mt={"1px"}
            backgroundColor={"black"}
          ></Box>
        </Flex> */}
            {/* <Text textAlign={"center"} color={"black"} fontWeight={"bold"}>
          BRIEF FOR THE RESPONDENT
        </Text> */}
            {/* <Flex alignItems={"center"} justifyContent={"center"}>
          <Box
            width={"15%"}
            height={"3px"}
            mt={"1px"}
            backgroundColor={"black"}
          ></Box>
        </Flex> */}
            {/* <Text
          textAlign={"center"}
          color={"black"}
          fontWeight={"bold"}
          textDecoration={"underline"}
        >
          OPINIONS BELOW
        </Text>
        <Box
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          gap={3}
        >
          <Text textAlign={"center"} color={"black"} maxW={"500px"}>
            The opinion of the United States District Court for the District of
            Wigmore is reported as Leiter v. Village of Spies-Roth, 231 F.Supp.
            6th 4 (D. Wig. 2012).
          </Text>
          <Text textAlign={"center"} color={"black"} maxW={"500px"}>
            The opinion of the United States Court of Appeals for the Thirteenth
            Circuit is reported as Leiter v. Village of Spies-Roth, 528 F.4th 16
            (13th Cir. 2013).
          </Text>
        </Box>
        <Text
          textAlign={"center"}
          color={"black"}
          fontWeight={"bold"}
          textDecoration={"underline"}
        >
          RELEVANT STATUTES AND CONSTITUTIONAL PROVISIONS
        </Text>
        <Text textAlign={"center"} color={"black"}>
          The relevant provisions are set forth in the Appendix.
        </Text> */}
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={500}
              textDecoration={"underline"}
              marginTop={"700px"}
              textTransform={"uppercase"}
            >
              Statement of Facts
            </Text>
            <Text color={"black"}>{briefData?.statement_of_case}</Text>
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={500}
              textDecoration={"underline"}
              marginTop={"70px"}
              textTransform={"uppercase"}
            >
              SUMMARY OF THE ARGUMENT
            </Text>
            <Text color={"black"}>{briefData?.summary_of_arguments}</Text>
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={500}
              textDecoration={"underline"}
              textTransform={"uppercase"}
            >
              ARGUMENT
            </Text>
            {briefData?.brief_arguments?.map((item, index) => (
              <Box key={index}>
                <Text
                  textAlign={"center"}
                  fontWeight={500}
                  textTransform={"uppercase"}
                  textDecoration={"underline"}
                  color={"black"}
                >
                  {index + 1}. {item.title}
                </Text>
                <Text color={"black"}>{item.description}</Text>
              </Box>
            ))}
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight={500}
              textDecoration={"underline"}
              textTransform={"uppercase"}
            >
              Conclusion
            </Text>
            <Text color={"black"}>{briefData?.conclusion}</Text>
            <Text textAlign={"right"} color={"black"} fontWeight={500}>
              Respectfully Submitted,
            </Text>
            <Text textAlign={"right"} color={"black"} fontWeight={500}>
              ------------------------------
            </Text>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default PDFView;
