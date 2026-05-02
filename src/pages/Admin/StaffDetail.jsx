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

function StaffDetail() {
  const { id } = useParams();
  const toast = useToast();

  // 🔥 dummy staff
  const [staff, setStaff] = useState({
    id,
    name: "Ravi Kumar",
    phone: "9876543210",
    pincode: "800001",
    status: "Active",
  });

  // 🔥 assigned requests
  const tasks = [
    { id: 1, title: "Garbage near school", status: "Assigned" },
    { id: 2, title: "Drain blockage", status: "In Progress" },
  ];

  const toggleStatus = () => {
    const newStatus = staff.status === "Active" ? "Inactive" : "Active";

    setStaff({ ...staff, status: newStatus });

    toast({
      title: `Staff ${newStatus}`,
      status: "success",
    });
  };

  return (
    <Box maxW="900px" mx="auto" p={6}>

      {/* HEADER */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Staff Detail
      </Text>

      <VStack align="stretch" spacing={6}>

        {/* 🔥 INFO CARD */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">

          <Text><b>Name:</b> {staff.name}</Text>
          <Text><b>Phone:</b> {staff.phone}</Text>
          <Text><b>Pincode:</b> {staff.pincode}</Text>

          <Flex align="center" gap={3} mt={3}>
            <Badge colorScheme={staff.status === "Active" ? "green" : "red"}>
              {staff.status}
            </Badge>

            <Button size="sm" onClick={toggleStatus}>
              Toggle Status
            </Button>
          </Flex>
        </Box>

        {/* 🔥 ASSIGNED TASKS */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">

          <Text fontWeight="bold" mb={3}>
            Assigned Requests
          </Text>

          <Table>
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>

            <Tbody>
              {tasks.map((t) => (
                <Tr key={t.id}>
                  <Td>{t.id}</Td>
                  <Td>{t.title}</Td>
                  <Td>{t.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

        </Box>

      </VStack>
    </Box>
  );
}

export default StaffDetail;