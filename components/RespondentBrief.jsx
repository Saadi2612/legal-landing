import React from "react";
import { Box, Text, Flex } from "@chakra-ui/react";

const RespondentBrief = ({ briefData }) => {
  return (
    <Box height={"650px"} overflow={"auto"} borderRadius={"10px"}>
      <Box
        display={"flex"}
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        width={"100%"}
      >
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
      </Box>
    </Box>
  );
};

export default RespondentBrief;
