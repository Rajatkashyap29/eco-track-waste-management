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

function StaffList() {
  const navigate = useNavigate();

  // 🔥 dummy data
  const staffData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Staff ${i + 1}`,
    phone: "9876543210",
    pincode: i % 2 === 0 ? "800001" : "834001",
    status: i % 3 === 0 ? "Inactive" : "Active",
    tasks: Math.floor(Math.random() * 5),
  }));

  const [search, setSearch] = useState("");
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 10;

  const filtered = staffData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) &&
      (pincode === "" || s.pincode === pincode) &&
      (status === "" || s.status === status)
  );

  const totalPages = Math.ceil(filtered.length / perPage);
  const data = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <Box maxW="1100px" mx="auto" p={6}>

      {/* 🔥 TOP BAR */}
      <Flex justify="space-between" mb={6} gap={3} flexWrap="wrap">

        <Input
          placeholder="Search by name / phone"
          maxW="250px"
          size="sm"
          bg="white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select
          placeholder="Filter by Pincode"
          size="sm"
          maxW="200px"
          bg="white"
          onChange={(e) => setPincode(e.target.value)}
        >
          <option value="800001">800001</option>
          <option value="834001">834001</option>
        </Select>

        <Select
          placeholder="Status"
          size="sm"
          maxW="180px"
          bg="white"
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </Select>
      </Flex>

      {/* 🔥 TABLE */}
      <Box bg="white" borderRadius="xl" boxShadow="sm">
        <Table>
          <Thead bg="gray.100">
            <Tr>
              <Th>ID</Th>
              <Th>Name</Th>
              <Th>Phone</Th>
              <Th>Pincode</Th>
              <Th>Status</Th>
              <Th>Tasks</Th>
            </Tr>
          </Thead>

          <Tbody>
            {data.map((s) => (
              <Tr
                key={s.id}
                _hover={{ bg: "gray.50" }}
                cursor="pointer"
                onClick={() => navigate(`/staff-list/${s.id}`)}
              >
                <Td>{s.id}</Td>
                <Td fontWeight="medium">{s.name}</Td>
                <Td>{s.phone}</Td>
                <Td>{s.pincode}</Td>

                <Td>
                  <Badge
                    colorScheme={s.status === "Active" ? "green" : "red"}
                  >
                    {s.status}
                  </Badge>
                </Td>

                <Td>{s.tasks}</Td>
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

export default StaffList;