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

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function StaffList() {
  const navigate = useNavigate();

  const [staff, setStaff] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 10;

  // 🔥 FETCH STAFF (debounced)
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchStaff();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, status, page]);

  const fetchStaff = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/users?role=staff&page=${page}&limit=${perPage}&search=${search}&status=${status}`
      );

      setStaff(res.data.users || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 RESET FILTERS
  const handleReset = () => {
    setSearch("");
    setStatus("");
    setPage(1);
  };

  return (
    <Box maxW="1100px" mx="auto" p={6}>

      {/* 🔥 TOP BAR */}
      <Flex justify="space-between" mb={6} gap={3} flexWrap="wrap">

        <Input
          placeholder="Search by name / email"
          maxW="250px"
          size="sm"
          bg="white"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <Select
          placeholder="Work Status"
          size="sm"
          maxW="200px"
          bg="white"
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="assigned">Assigned</option>
          <option value="free">Free</option>
        </Select>

        <Button size="sm" onClick={handleReset}>
          Reset
        </Button>

      </Flex>

      {/* 🔥 TABLE */}
      <Box
        bg="white"
        borderRadius="xl"
        boxShadow="sm"
        overflowX="auto"
      >

        {loading ? (
          <Text textAlign="center" py={10}>Loading...</Text>
        ) : staff.length === 0 ? (
          <Text textAlign="center" py={10}>No staff found</Text>
        ) : (
          <Table>
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Tasks</Th>
                <Th>Work Status</Th>
              </Tr>
            </Thead>

            <Tbody>
              {staff.map((s) => (
                <Tr
                  key={s._id}
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                  onClick={() => navigate(`/staff-list/${s._id}`)}
                >
                  <Td>#{s._id.slice(-4)}</Td>
                  <Td fontWeight="medium">{s.name}</Td>
                  <Td>{s.email}</Td>
                  <Td>{s.phone}</Td>

                  <Td>{s.taskCount ?? 0}</Td>

                  <Td>
                    <Badge
                      textTransform="capitalize"
                      colorScheme={
                        s.workStatus === "assigned"
                          ? "orange"
                          : "green"
                      }
                    >
                      {s.workStatus || "free"}
                    </Badge>
                  </Td>

                </Tr>
              ))}
            </Tbody>
          </Table>
        )}

      </Box>

      {/* 🔥 PAGINATION */}
      <Flex justify="center" mt={6} gap={3}>
        <Button
          size="sm"
          onClick={() => setPage((prev) => prev - 1)}
          isDisabled={page === 1}
        >
          Prev
        </Button>

        <Text fontSize="sm" alignSelf="center">
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

export default StaffList;