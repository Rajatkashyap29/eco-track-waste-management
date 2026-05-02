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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminComplaints() {
  const navigate = useNavigate();

  // 🔥 Dummy Data
  const tickets = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    topic: "Login Issue",
    role: i % 2 === 0 ? "User" : "Staff",
    priority: i % 3 === 0 ? "High" : i % 3 === 1 ? "Medium" : "Low",
    status:
      i % 3 === 0 ? "Open" : i % 3 === 1 ? "In Progress" : "Resolved",
    date: "02 May 2026",
  }));

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 10;

  const filtered = tickets.filter(
    (t) =>
      t.topic.toLowerCase().includes(search.toLowerCase()) &&
      (status === "" || t.status === status) &&
      (priority === "" || t.priority === priority)
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Box p={6} maxW="1200px" mx="auto">

      {/* 🔥 TOP FILTER BAR */}
      <Flex
        mb={6}
        justify="space-between"
        align="center"
        gap={4}
        wrap="wrap"
      >
        {/* LEFT */}
        <Input
          placeholder="Search tickets..."
          maxW="250px"
          size="sm"
          bg="white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CENTER */}
        <Flex gap={3}>
          <Select
            placeholder="Status"
            size="sm"
            bg="white"
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </Select>

          <Select
            placeholder="Priority"
            size="sm"
            bg="white"
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Select>
        </Flex>
      </Flex>

      {/* 🔥 TABLE */}
      <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden">
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
            {data.map((t) => (
              <Tr
                key={t.id}
                cursor="pointer"
                _hover={{ bg: "gray.50" }}
                onClick={() => navigate(`/admin/complaints/${t.id}`)}
              >
                <Td>{t.id}</Td>
                <Td>{t.topic}</Td>
                <Td>{t.role}</Td>

                <Td>
                  <Text
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                    bg={
                      t.priority === "High"
                        ? "red.100"
                        : t.priority === "Medium"
                        ? "yellow.100"
                        : "green.100"
                    }
                  >
                    {t.priority}
                  </Text>
                </Td>

                <Td>
                  <Text
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="sm"
                    bg={
                      t.status === "Resolved"
                        ? "green.100"
                        : t.status === "Open"
                        ? "red.100"
                        : "blue.100"
                    }
                  >
                    {t.status}
                  </Text>
                </Td>

                <Td>{t.date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* 🔥 PAGINATION */}
      <Flex justify="center" mt={6} gap={3}>
        <Button
          size="sm"
          onClick={() => setPage(page - 1)}
          isDisabled={page === 1}
        >
          Prev
        </Button>

        <Text alignSelf="center">
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

export default AdminComplaints;