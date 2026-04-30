import {
  Box,
  Text,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Badge,
  Button,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CleaningRequests() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  // 🔥 Dummy Data
  const data = Array.from({ length: 35 }, (_, i) => ({
    id: i + 1,
    wasteType: i % 2 === 0 ? "Dry" : "Wet",
    volume: ["Small", "Medium", "Large"][i % 3],
    location: "Ranchi, Ward 12",
    date: "29 Apr 2026",
    status:
      i % 3 === 0
        ? "Pending"
        : i % 3 === 1
        ? "Assigned"
        : "Completed",
  }));

  const filtered = data.filter(
    (item) =>
      item.location.toLowerCase().includes(search.toLowerCase()) &&
      (status === "" || item.status === status)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const currentData = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Box maxW="1200px" mx="auto" p={6}>

      {/* HEADER */}
      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Cleaning Requests
      </Text>

      {/* FILTER BAR */}
      <Flex justify="space-between" mb={4} gap={3} flexWrap="wrap">

        <Input
          placeholder="Search by location..."
          maxW="250px"
          size="sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          bg="white"
        />

        <Select
          placeholder="Filter by status"
          maxW="200px"
          size="sm"
          onChange={(e) => setStatus(e.target.value)}
          bg="white"
        >
          <option value="Pending">Pending</option>
          <option value="Assigned">Assigned</option>
          <option value="Completed">Completed</option>
        </Select>

      </Flex>

      {/* TABLE */}
      <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden">
        <Table>
          <Thead bg="gray.100">
            <Tr>
              <Th>ID</Th>
              <Th>Waste Type</Th>
              <Th>Volume</Th>
              <Th>Location</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>
            {currentData.map((item) => (
              <Tr
                key={item.id}
                _hover={{ bg: "gray.50" }}
                cursor="pointer"
                onClick={() => navigate(`/request/${item.id}`)}
              >
                <Td fontWeight="bold">{item.id}</Td>
                <Td>{item.wasteType}</Td>
                <Td>{item.volume}</Td>
                <Td>{item.location}</Td>
                <Td>{item.date}</Td>

                <Td>
                  <Badge
                    colorScheme={
                      item.status === "Completed"
                        ? "green"
                        : item.status === "Pending"
                        ? "red"
                        : "yellow"
                    }
                  >
                    {item.status}
                  </Badge>
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

        <Text alignSelf="center" fontSize="sm">
          {page} / {totalPages}
        </Text>

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

export default CleaningRequests;