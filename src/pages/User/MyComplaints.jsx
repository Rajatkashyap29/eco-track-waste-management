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
  Spinner,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios"; // 🔥 ADD THIS

function MyComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]); // 🔥 CHANGE
  const [loading, setLoading] = useState(true);     // 🔥 ADD

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const itemsPerPage = 10;

  // 🔥 API CALL
  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/my");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // 🔥 FILTER
  const filtered = complaints.filter(
    (c) =>
      (c.title?.toLowerCase() || "").includes(search.toLowerCase()) &&
      (status === "" || c.status === status)
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const data = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // 🔥 LOADING STATE
  if (loading) {
    return (
      <Flex justify="center" mt={10}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Box p={6} maxW="1100px" mx="auto">

      {/* 🔥 FILTER CARD */}
      <Box bg="white" p={4} borderRadius="lg" boxShadow="sm" mb={6}>
        <Flex align="center" justify="space-between" gap={4} wrap="wrap">

          <Box flex="1" minW="220px">
            <Text fontSize="sm" mb={1} color="gray.600">
              Search Complaint
            </Text>
            <Input
              placeholder="Search by title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="gray.50"
            />
          </Box>

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
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Resolved</option>
            </Select>
          </Box>

          {/* 📅 (UI SAME — no logic added) */}
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
                key={item._id}
                _hover={{ bg: "gray.50" }}
                cursor="pointer"
                onClick={() => navigate(`/complaint/${item._id}`)}
              >
                <Td fontWeight="semibold">
                  {item._id?.slice(-5)}
                </Td>

                <Td>{item.title}</Td>

                <Td color="gray.600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Td>

                <Td>
                  <Text
                    px={3}
                    py={1}
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="medium"
                    bg={
                      item.status === "completed"
                        ? "green.100"
                        : item.status === "pending"
                        ? "red.100"
                        : "yellow.100"
                    }
                    color={
                      item.status === "completed"
                        ? "green.700"
                        : item.status === "pending"
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
          Page {page} of {totalPages || 1}
        </Text>

        <Button
          size="sm"
          onClick={() => setPage(page + 1)}
          isDisabled={page === totalPages || totalPages === 0}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
}

export default MyComplaints;