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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function CleaningRequests() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [requests, setRequests] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const itemsPerPage = 10;

  //  FETCH (debounced)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchRequests();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, status, page]);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/complaints/all?page=${page}&limit=${itemsPerPage}&status=${status}&search=${search}`
      );

      setRequests(res.data.complaints || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="1200px" mx="auto" p={6}>

      {/* HEADER */}
      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Cleaning Requests
      </Text>

      {/* FILTER BAR */}
      <Flex justify="space-between" mb={4} gap={3} flexWrap="wrap">

        <Input
          placeholder="Search by city or Title..."
          maxW="250px"
          size="sm"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
          bg="white"
        />

        <Select
          placeholder="Filter by status"
          maxW="200px"
          size="sm"
          bg="white"
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="pending">Pending</option>
          <option value="assigned">Assigned</option>
          <option value="completed">Completed</option>
        </Select>

      </Flex>

      {/* TABLE */}
      <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden">

        {loading ? (
          <Text textAlign="center" py={10}>Loading...</Text>
        ) : requests.length === 0 ? (
          <Text textAlign="center" py={10}>No requests found</Text>
        ) : (
          <Table>
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Waste Type</Th>
                <Th>Volume</Th>
                <Th>City</Th>
                <Th>Pincode</Th>
                <Th>User</Th>
                <Th>Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>

            <Tbody>
              {requests.map((item) => (
                <Tr
                  key={item._id}
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                  onClick={() => navigate(`/request/${item._id}`)}
                >
                  <Td fontWeight="bold">#{item._id.slice(-4)}</Td>

                  <Td textTransform="capitalize">
                    {item.wasteType}
                  </Td>

                  <Td textTransform="capitalize">
                    {item.volume}
                  </Td>

                  {/*  CITY ONLY */}
                  <Td textTransform="capitalize">
                    {item.city}
                  </Td>

                  {/*  PINCODE */}
                  <Td>{item.pincode}</Td>

                  <Td>{item.user?.name}</Td>

                  <Td>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Td>

                  <Td>
                    <Badge
                      textTransform="capitalize"
                      colorScheme={
                        item.status === "completed"
                          ? "green"
                          : item.status === "pending"
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
        )}

      </Box>

      {/* PAGINATION */}
      <Flex justify="center" mt={6} gap={3}>

        <Button
          size="sm"
          onClick={() => setPage((prev) => prev - 1)}
          isDisabled={page === 1}
        >
          Prev
        </Button>

        <Text alignSelf="center" fontSize="sm">
          {page} / {totalPages}
        </Text>

        <Button
          size="sm"
          onClick={() => setPage((prev) => prev + 1)}
          isDisabled={page === totalPages}
        >
          Next
        </Button>

      </Flex>

    </Box>
  );
}

export default CleaningRequests;