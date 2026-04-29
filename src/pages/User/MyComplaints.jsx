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
  Button,
  Flex,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MyComplaints() {
  const navigate = useNavigate();

  const complaints = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    title: `Garbage Issue ${i + 1}`,
    date: "29 Apr 2026",
    status: i % 3 === 0 ? "Pending" : i % 3 === 1 ? "In Progress" : "Resolved",
  }));

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  const filtered = complaints.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) &&
      (status === "" || c.status === status)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const data = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box p={6} maxW="1100px" mx="auto">

      {/* 🔥 FILTER CARD */}
      <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" mb={6}>
        <Flex
          align="center"
          justify="space-between"
          gap={4}
          wrap="wrap"
        >

          {/* 🔍 LEFT - SEARCH */}
          <Box flex="1" minW="220px">
            <Text fontSize="sm" mb={1} color="gray.600">
              Search Complaint
            </Text>
            <Input
              placeholder="Search by title or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="gray.50"
            />
          </Box>

          {/* ⚙️ CENTER - STATUS */}
          <Box flex="1" minW="180px" textAlign="center">
            <Text fontSize="sm" mb={1} color="gray.600">
              Filter by Status
            </Text>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              bg="gray.50"
            >
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </Select>
          </Box>

          {/* 📅 RIGHT - DATE */}
          <Box flex="1" minW="250px" textAlign="right">
            <Text fontSize="sm" mb={1} color="gray.600">
              Date Range
            </Text>

            <Flex gap={2} justify="flex-end">
              <Input type="date" bg="gray.50" />
              <Input type="date" bg="gray.50" />
            </Flex>
          </Box>

        </Flex>
      </Box>

      {/* 🔥 TABLE */}
      <Box bg="white" borderRadius="xl" overflow="hidden" boxShadow="sm">
        <Table>
          <Thead bg="gray.100">
            <Tr>
              <Th>ID</Th>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((item) => (
              <Tr
                key={item.id}
                _hover={{ bg: "gray.50" }}
                cursor="pointer"
                onClick={() => navigate(`/complaint/${item.id}`)}
              >
                <Td fontWeight="semibold">{item.id}</Td>
                <Td>{item.title}</Td>
                <Td color="gray.600">{item.date}</Td>
                <Td>
                  <Text
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="medium"
                    bg={
                      item.status === "Resolved"
                        ? "green.100"
                        : item.status === "Pending"
                        ? "red.100"
                        : "yellow.100"
                    }
                    color={
                      item.status === "Resolved"
                        ? "green.700"
                        : item.status === "Pending"
                        ? "red.700"
                        : "yellow.700"
                    }
                    display="inline-block"
                  >
                    {item.status}
                  </Text>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* 🔥 PAGINATION */}
      <Flex justify="center" mt={6} gap={4} align="center">
        <Button
          size="sm"
          onClick={() => setPage(page - 1)}
          isDisabled={page === 1}
        >
          Prev
        </Button>

        <Text fontSize="sm" fontWeight="medium">
          Page {page} of {totalPages}
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

export default MyComplaints;