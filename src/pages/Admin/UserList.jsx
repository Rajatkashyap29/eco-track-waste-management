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
  Button,
  Badge,
} from "@chakra-ui/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function UserList() {
  const navigate = useNavigate();

  // 🔥 dummy data
  const users = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@mail.com`,
    phone: "9876543210",
    complaints: Math.floor(Math.random() * 10),
    status: i % 4 === 0 ? "Blocked" : "Active",
  }));

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 10;

  const filtered = users.filter(
    (u) =>
      (u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search)) &&
      (status === "" || u.status === status)
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Box maxW="1100px" mx="auto" p={6}>

      {/* 🔥 TOP BAR */}
      <Flex justify="space-between" mb={6} gap={3} flexWrap="wrap">
        <Input
          placeholder="Search name / email / phone"
          maxW="280px"
          size="sm"
          bg="white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          placeholder="Filter by Status"
          size="sm"
          maxW="200px"
          bg="white"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </Select>
      </Flex>

      {/* 🔥 TABLE */}
      <Box bg="white" borderRadius="xl" boxShadow="sm">
        <Table>
          <Thead bg="gray.100">
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Complaints</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((u) => (
              <Tr
                key={u.id}
                _hover={{ bg: "gray.50" }}
                cursor="pointer"
                onClick={() => navigate(`/user-list/${u.id}`)}
              >
                <Td>{u.id}</Td>
                <Td fontWeight="medium">{u.name}</Td>
                <Td>{u.email}</Td>
                <Td>{u.phone}</Td>
                <Td>{u.complaints}</Td>

                <Td>
                  <Badge colorScheme={u.status === "Active" ? "green" : "red"}>
                    {u.status}
                  </Badge>
                </Td>
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

        <Text fontSize="sm" alignSelf="center">
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

export default UserList;