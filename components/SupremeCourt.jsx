"use client";

import React, { useEffect, useState } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import { BACKEND_IP } from "@/utils";
import Cookies from "js-cookie";
import { Button } from "@nextui-org/react";
import axios from "axios";

const SupremeCourt = ({ dataToUpdate, setDataToUpdate, setIsUpdating }) => {
  const handleEditableChange = (key, value) => {
    console.log("key", key);
    console.log("value", value);
    console.log(dataToUpdate);
    setIsUpdating(true);

    setDataToUpdate((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleEditabelArrayChange = (key, index, value) => {
    console.log("key", key);
    console.log("value", value);
    console.log(dataToUpdate);

    setIsUpdating(true);
    const newArray = dataToUpdate[key];
    newArray[index] = value;
    setDataToUpdate((prevState) => ({
      ...prevState,
      [key]: newArray,
    }));
  };

  const handleParagraphChange = (argumentIndex, paragraphIndex, value) => {
    console.log(argumentIndex, paragraphIndex, value);

    setIsUpdating(true);

    setDataToUpdate((prevState) => {
      const updatedArguments = [...prevState.brief_arguments];
      const updatedParagraphs = [
        ...updatedArguments[argumentIndex].description,
      ];

      console.log(updatedParagraphs);
      updatedParagraphs[paragraphIndex] = value;
      console.log(updatedParagraphs);

      updatedArguments[argumentIndex] = {
        ...updatedArguments[argumentIndex],
        description: updatedParagraphs,
      };
      console.log(updatedArguments);

      return {
        ...prevState,
        brief_arguments: updatedArguments,
      };
    });
  };

  const handleArgumentTitleChange = (index, value) => {
    setIsUpdating(true);

    setDataToUpdate((prevState) => {
      const updatedArguments = [...prevState.brief_arguments];
      updatedArguments[index] = {
        ...updatedArguments[index],
        title: value,
      };

      return {
        ...prevState,
        brief_arguments: updatedArguments,
      };
    });
  };

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
    let roman = '';
    for (let key in romanMap) {
        while (num >= romanMap[key]) {
            roman += key;
            num -= romanMap[key];
        }
    }
    return roman;
}

  return (
    <Box height={"560px"} overflow={"auto"} borderRadius={"10px"}>
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
          <Box>
            <Box width={"100%"} height={"10px"} backgroundColor={"black"}></Box>
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
            contentEditable
            onBlur={(e) =>
              handleEditableChange("court_name", e.target.textContent)
            }
            dangerouslySetInnerHTML={{
              __html: dataToUpdate?.court_name || "N/A",
            }}
          />
          {/* {briefData?.court_name || "N/A"}
          </Text> */}
          <Text
            textAlign={"center"}
            color={"black"}
            textTransform={"uppercase"}
            contentEditable
            onBlur={(e) =>
              handleEditableChange("court_term", e.target.textContent)
            }
            dangerouslySetInnerHTML={{
              __html: dataToUpdate?.court_term || "N/A",
            }}
          />
          {/* {briefData?.court_term || "N/A"}
          </Text> */}
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
            contentEditable
            onBlur={(e) =>
              handleEditableChange("petitioner_name", e.target.textContent)
            }
            dangerouslySetInnerHTML={{
              __html: dataToUpdate?.petitioner_name || "N/A",
            }}
          />
          {/* {briefData?.petitioner_name || "N/A"}
          </Text> */}
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
            contentEditable
            onBlur={(e) =>
              handleEditableChange("respondent_name", e.target.textContent)
            }
            dangerouslySetInnerHTML={{
              __html: dataToUpdate?.respondent_name || "N/A",
            }}
          />
          {/* {briefData?.respondent_name || "N/A"}
          </Text> */}
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
          <Text
            textAlign={"center"}
            color={"black"}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            contentEditable
            onBlur={(e) =>
              handleEditableChange("title_of_brief", e.target.textContent)
            }
            dangerouslySetInnerHTML={{
              __html: dataToUpdate?.title_of_brief || "N/A",
            }}
          />
          {/* {briefData?.title_of_brief || "N/A"}
          </Text> */}
          <Flex alignItems={"center"} justifyContent={"center"}>
            <Box
              width={"15%"}
              height={"3px"}
              mt={"1px"}
              backgroundColor={"black"}
            ></Box>
          </Flex>
          <Box textAlign={"center"} color={"black"} textTransform={"uppercase"}>
            <Text
              textAlign={"center"}
              color={"black"}
              contentEditable
              onBlur={(e) =>
                handleEditableChange("submitting_entity", e.target.textContent)
              }
              dangerouslySetInnerHTML={{
                __html: dataToUpdate?.submitting_entity || "N/A",
              }}
            />
            {/* {briefData?.submitting_entity || "N/A"}
            </Text> */}
            <Text textAlign={"center"} color={"black"}>
              ATTORNEYS FOR THE RESPONDENT:
            </Text>
          </Box>
          <Box textAlign={"center"} color={"black"} textTransform={"uppercase"}>
            {dataToUpdate?.attorneys &&
              dataToUpdate?.attorneys?.map((att, index) => (
                <Text
                  key={index}
                  style={{ display: "block" }}
                  contentEditable
                  onBlur={(e) =>
                    handleEditabelArrayChange(
                      "attorneys",
                      index,
                      e.target.textContent
                    )
                  }
                  dangerouslySetInnerHTML={{ __html: att || "" }}
                />
                //</Box> {att}
                // </Text>
              ))}
          </Box>
          <Box>
            <Box
              width={"100%"}
              height={"3px"}
              mb={"1px"}
              backgroundColor={"black"}
            ></Box>
            <Box width={"100%"} height={"10px"} backgroundColor={"black"}></Box>
          </Box>
          <Text
            textAlign={"center"}
            color={"black"}
            fontWeight={"bold"}
            textDecoration={"underline"}
            marginTop={"400px"}
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
            {dataToUpdate?.questions_presented &&
              dataToUpdate?.questions_presented?.map((question, index) => (
                <span
                  key={index}
                  style={{ display: "block" }}
                  contentEditable
                  onBlur={(e) =>
                    handleEditabelArrayChange(
                      "questions_presented",
                      index,
                      e.target.textContent
                    )
                  }
                  dangerouslySetInnerHTML={{
                    __html: index + 1 + ". " + question || "",
                  }}
                />
                //{index + 1}. {question}
                //</span>
              ))}
          </Flex>

          <Text
            textAlign={"center"}
            color={"black"}
            fontWeight={"bold"}
            textDecoration={"underline"}
            marginTop={"700px"}
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
          <Flex flexDir={'column'} ml={10} >
          {dataToUpdate?.brief_arguments?.map((sectionOuter, indexOuter) => (
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
          {dataToUpdate?.table_of_authorities?.map((line, index) => (
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
                contentEditable
                onInput={(e) =>
                  handleEditabelArrayChange(
                    "table_of_authorities",
                    index,
                    e.target.textContent
                  )
                }
                dangerouslySetInnerHTML={{ __html: line || "" }}
              />
              {/* {line}
              </Text> */}
            </Flex>
          ))}

          <Text textAlign={"center"} color={"black"} mt={"350px"}>
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
            contentEditable
            onInput={(e) =>
              handleEditableChange("court_name", e.target.textContent)
            }
            dangerouslySetInnerHTML={{
              __html: dataToUpdate?.court_name || "N/A",
            }}
          />
          {/* {briefData?.court_name || "N/A"}
          </Text> */}
          <Text
            textAlign={"center"}
            color={"black"}
            textTransform={"uppercase"}
            contentEditable
            onInput={(e) =>
              handleEditableChange("court_term", e.target.textContent)
            }
            dangerouslySetInnerHTML={{
              __html: dataToUpdate?.court_term || "N/A",
            }}
          />
          {/* {briefData?.court_term ? briefData?.court_term : "N/A"}
          </Text> */}
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
              contentEditable
              onInput={(e) =>
                handleEditableChange("petitioner_name", e.target.textContent)
              }
              dangerouslySetInnerHTML={{
                __html: dataToUpdate?.petitioner_name || "N/A",
              }}
            />
            {/* {briefData?.petitioner_name ? briefData?.petitioner_name : "N/A"}
            </Text> */}
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
              contentEditable
              onInput={(e) =>
                handleEditableChange("respondent_name", e.target.textContent)
              }
              dangerouslySetInnerHTML={{
                __html: dataToUpdate?.respondent_name || "N/A",
              }}
            />
            {/* {briefData?.respondent_name ? briefData?.respondent_name : "N/A"}
            </Text> */}
            <Text textAlign={"center"} color={"black"}>
              Respondent,
            </Text>
          </Flex>

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
          <div className="w-full">
            {dataToUpdate?.statement_of_case?.map((para, index) => (
              <p
                key={index}
                className="py-2 text-base text-gray-800"
                contentEditable
                onInput={(e) =>
                  handleEditabelArrayChange(
                    "statement_of_case",
                    index,
                    e.currentTarget.textContent
                  )
                }
                dangerouslySetInnerHTML={{ __html: para || "" }}
              />
              //{para}
              //</p>
            ))}
          </div>
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
          <div color={"black"}>
            {dataToUpdate?.summary_of_arguments?.map((para, index) => (
              <Text
                py={2}
                color={"gray.700"}
                key={index}
                contentEditable
                onInput={(e) =>
                  handleEditabelArrayChange(
                    "summary_of_arguments",
                    index,
                    e.currentTarget.textContent
                  )
                }
                dangerouslySetInnerHTML={{ __html: para || "" }}
              />
              //{para}
              //</Text>
            ))}
          </div>
          <Text
            textAlign={"center"}
            color={"black"}
            fontWeight={"bold"}
            textDecoration={"underline"}
            textTransform={"uppercase"}
          >
            ARGUMENT
          </Text>
          {dataToUpdate?.brief_arguments?.map((argument, argumentIndex) => (
            <Box key={argumentIndex}>
              <Text
                textAlign={"center"}
                fontWeight={"bold"}
                textTransform={"uppercase"}
                textDecoration={"underline"}
                color={"black"}
                contentEditable
                onInput={(e) =>
                  handleArgumentTitleChange(argumentIndex, e.target.textContent)
                }
                dangerouslySetInnerHTML={{ __html: argument.title || "" }}
              />
              {/* {argument.title}
              </Text> */}
              <div className="w-full text-gray-800">
                {argument.description?.map((para, index) => (
                  <p
                    key={index}
                    className="py-2 text-base text-gray-800"
                    contentEditable
                    onInput={(e) =>
                      handleParagraphChange(
                        argumentIndex,
                        index,
                        e.target.textContent
                      )
                    }
                    dangerouslySetInnerHTML={{ __html: para || "" }}
                  />
                  //{para}
                  //</p>
                ))}
              </div>
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
            contentEditable
            onBlur={(e) =>
              handleEditableChange("conclusion", e.target.textContent)
            }
            dangerouslySetInnerHTML={{ __html: dataToUpdate?.conclusion || "" }}
          />
          {/* {briefData?.conclusion}</Text> */}
        </Flex>
      </Box>
    </Box>
  );
};

export default SupremeCourt;
