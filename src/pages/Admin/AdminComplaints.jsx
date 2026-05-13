import {
  Box,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function AdminComplaints() {
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 10;

  //  FETCH DATA
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTickets();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, status, priority, page]);

  const fetchTickets = async () => {
  try {
    setLoading(true);

    const res = await API.get(
      `/tickets/all?page=${page}&limit=${perPage}` +
      `&search=${search.trim()}` +
      `&status=${status.toLowerCase()}` +
      `&priority=${priority.toLowerCase()}`
    );

    setTickets(res.data.tickets || []);
    setTotalPages(res.data.totalPages || 1);

  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

  return (
    <Box p={6} maxW="1200px" mx="auto">

      {/* FILTER BAR */}
      <Flex mb={6} justify="space-between" wrap="wrap" gap={4}>

        <Input
          placeholder="Search tickets..."
          maxW="250px"
          size="sm"
          bg="white"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <Flex gap={3}>

          <Select
            placeholder="Status"
            size="sm"
            bg="white"
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="open">Open</option>
            <option value="in progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </Select>

          <Select
            placeholder="Priority"
            size="sm"
            bg="white"
            onChange={(e) => {
              setPage(1);
              setPriority(e.target.value);
            }}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </Select>

        </Flex>
      </Flex>

      {/*  TABLE */}
      <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden">

        {loading ? (
          <Text textAlign="center" py={10}>
            Loading...
          </Text>
        ) : tickets.length === 0 ? (
          <Text textAlign="center" py={10}>
            No tickets found
          </Text>
        ) : (
          <Table>
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Topic</Th>
                <Th>Role</Th>
                <Th>Priority</Th>
                <Th>Status</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>

            <Tbody>
              {tickets.map((t) => (
                <Tr
                  key={t._id}
                  cursor="pointer"
                  _hover={{ bg: "gray.50" }}
                  onClick={() =>
                    navigate(`/admin/complaints/${t._id}`)
                  }
                >
                  <Td>#{t._id.slice(-4)}</Td>
                  <Td>{t.topic}</Td>
                  <Td>{t.role}</Td>

                  {/* PRIORITY */}
                  <Td>
                    <Text
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="sm"
                      textTransform="capitalize"
                      bg={
                        t.priority === "high"
                          ? "red.100"
                          : t.priority === "medium"
                          ? "yellow.100"
                          : "green.100"
                      }
                    >
                      {t.priority}
                    </Text>
                  </Td>

                  {/* STATUS */}
                  <Td>
                    <Text
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="sm"
                      textTransform="capitalize"
                      bg={
                        t.status === "resolved"
                          ? "green.100"
                          : t.status === "open"
                          ? "red.100"
                          : "blue.100"
                      }
                    >
                      {t.status}
                    </Text>
                  </Td>

                  <Td>
                    {new Date(t.createdAt).toLocaleDateString()}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>

      {/*  PAGINATION */}
      <Flex justify="center" mt={6} gap={3}>
        <Button
          size="sm"
          onClick={() => setPage((p) => p - 1)}
          isDisabled={page === 1}
        >
          Prev
        </Button>

        <Text alignSelf="center">
          {page} / {totalPages}
        </Text>

        <Button
          size="sm"
          onClick={() => setPage((p) => p + 1)}
          isDisabled={page === totalPages}
        >
          Next
        </Button>
      </Flex>

    </Box>
  );
}

export default AdminComplaints;