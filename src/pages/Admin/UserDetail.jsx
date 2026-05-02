import {
  Box,
  Text,
  VStack,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useState } from "react";

function UserDetail() {
  const { id } = useParams();
  const toast = useToast();

  const [user, setUser] = useState({
    id,
    name: "Rajat Kumar",
    email: "rajat@mail.com",
    phone: "9876543210",
    pincode: "800001",
    status: "Active",
  });

  const complaints = [
    { id: 1, title: "Garbage near park", status: "Pending", date: "1 May 2026" },
    { id: 2, title: "Street waste issue", status: "Completed", date: "28 Apr 2026" },
  ];

  const toggleStatus = () => {
    const newStatus = user.status === "Active" ? "Blocked" : "Active";

    setUser({ ...user, status: newStatus });

    toast({
      title: `User ${newStatus}`,
      status: "success",
    });
  };

  return (
    <Box maxW="900px" mx="auto" p={6}>

      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        User Detail
      </Text>

      <VStack spacing={6} align="stretch">

        {/* 🔥 USER INFO */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text><b>Name:</b> {user.name}</Text>
          <Text><b>Email:</b> {user.email}</Text>
          <Text><b>Phone:</b> {user.phone}</Text>
          <Text><b>Pincode:</b> {user.pincode}</Text>

          <Flex align="center" gap={3} mt={3}>
            <Badge colorScheme={user.status === "Active" ? "green" : "red"}>
              {user.status}
            </Badge>

            <Button size="sm" onClick={toggleStatus}>
              {user.status === "Active" ? "Block User" : "Unblock User"}
            </Button>
          </Flex>
        </Box>

        {/* 🔥 USER COMPLAINTS */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>
            User Complaints
          </Text>

          <Table>
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Status</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>

            <Tbody>
              {complaints.map((c) => (
                <Tr key={c.id}>
                  <Td>{c.id}</Td>
                  <Td>{c.title}</Td>
                  <Td>{c.status}</Td>
                  <Td>{c.date}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

      </VStack>
    </Box>
  );
}

export default UserDetail;