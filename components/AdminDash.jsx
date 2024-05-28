import React, { useEffect, useState } from "react";
import {
  Flex,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from "@chakra-ui/react";
import { dmSans } from "@/utils";
import { BACKEND_IP } from "@/utils";
import axios from "axios";
import Cookies from "js-cookie";

const AdminDash = () => {
  const [waitingList, setWaitingList] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPageNumber, setTotalPageNumber] = useState(null);
  const userToken = Cookies.get("token");

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handlePrevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const body = {
          page_num: pageNumber,
        };
        const response = await fetch(`${BACKEND_IP}/bot/GetWaitingList`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        setWaitingList(data.response.list);
        setTotalPageNumber(data.response.paginator.total_pages);

        console.log(data);
      } catch (error) {}
    };
    fetchWaitingList();
  }, [pageNumber]);

  console.log(waitingList);

  return (
    <div style={{ padding: 10 }}>
      <Text
        textAlign={"center"}
        className={`${dmSans.className}`}
        fontSize={30}
      >
        {" "}
        Waiting List{" "}
      </Text>

      <Flex flexDir="column" gap={9} >
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Sr.</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Date Joined</Th>
              </Tr>
            </Thead>
            <Tbody>
              {waitingList &&
                waitingList.map((list, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{list.name ? list.name : "N/A"}</Td>
                    <Td>{list.email ? list.email : "N/A"}</Td>
                    <Td>{new Date(list.date_joined).toLocaleDateString()}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex
          flexDir={"row"}
          alignItems={"center"}
          justifyContent={"flex-end"}
          gap={3}
        >
          <Button onClick={handlePrevPage} isDisabled={pageNumber <=1 }>
            Prev
          </Button>
          <Text>
            {pageNumber} / {totalPageNumber}
          </Text>
          <Button
            onClick={handleNextPage}
            isDisabled={pageNumber === totalPageNumber}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default AdminDash;
