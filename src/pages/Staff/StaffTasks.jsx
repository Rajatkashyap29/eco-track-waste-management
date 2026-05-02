import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

function StaffTasks() {
  const navigate = useNavigate();

  const allTasks = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Garbage Issue ${i + 1}`,
    wasteType: "Dry",
    volume: "Medium",
    location: "Patna",
    date: "2 May 2026",
    status: i % 2 === 0 ? "Pending" : "In Progress",
  }));

  const [page, setPage] = useState(1);
  const perPage = 10;

  const totalPages = Math.ceil(allTasks.length / perPage);
  const data = allTasks.slice((page - 1) * perPage, page * perPage);

  return (
    <Box p={6} maxW="1100px" mx="auto">

      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        My Assigned Tasks
      </Text>

      <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden">
        <Table>
          <Thead bg="gray.100">
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Type</Th>
              <Th>Volume</Th>
              <Th>Location</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((task) => (
              <Tr
                key={task.id}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                onClick={() => navigate(`/staff/task/${task.id}`)}
              >
                <Td>{task.id}</Td>
                <Td>{task.title}</Td>
                <Td>{task.wasteType}</Td>
                <Td>{task.volume}</Td>
                <Td>{task.location}</Td>
                <Td>
                  <Text
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                    bg={
                      task.status === "Pending"
                        ? "red.100"
                        : "yellow.100"
                    }
                  >
                    {task.status}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* PAGINATION */}
      <Flex justify="center" mt={6} gap={3}>
        <Button
          size="sm"
          onClick={() => setPage(page - 1)}
          isDisabled={page === 1}
        >
          Prev
        </Button>

        <Text>{page} / {totalPages}</Text>

        <Button
          size="sm"
          onClick={() => setPage(page + 1)}
          isDisabled={page === totalPages}
        >
          Next
        </Button>
      </Flex>

    </Box>
  );
}

export default StaffTasks;