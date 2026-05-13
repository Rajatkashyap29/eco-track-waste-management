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

function UserList() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(""); // active / blocked
  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 10;

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(delay);
  }, [search, status, page]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/users?page=${page}&limit=${perPage}&search=${search}&role=user`
      );

      let data = res.data.users || [];

      //  FRONTEND FILTER (status)
      if (status) {
        data = data.filter((u) =>
          status === "active" ? !u.isBlocked : u.isBlocked
        );
      }

      setUsers(data);
      setTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="1100px" mx="auto" p={6}>

      {/*  TOP BAR */}
      <Flex justify="space-between" mb={6} gap={3} flexWrap="wrap">

        <Input
          placeholder="Search name / email"
          maxW="280px"
          size="sm"
          bg="white"
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />

        <Select
          placeholder="Filter by Status"
          size="sm"
          maxW="200px"
          bg="white"
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </Select>

      </Flex>

      {/*  TABLE */}
      <Box bg="white" borderRadius="xl" boxShadow="sm">

        {loading ? (
          <Text textAlign="center" py={10}>Loading...</Text>
        ) : users.length === 0 ? (
          <Text textAlign="center" py={10}>No users found</Text>
        ) : (
          <Table>
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>

            <Tbody>
              {users.map((u) => (
                <Tr
                  key={u._id}
                  _hover={{ bg: "gray.50" }}
                  cursor="pointer"
                  onClick={() => navigate(`/user-list/${u._id}`)}
                >
                  <Td>#{u._id.slice(-4)}</Td>
                  <Td fontWeight="medium">{u.name}</Td>
                  <Td>{u.email}</Td>
                  <Td>{u.phone}</Td>

                  {/*  STATUS FIX */}
                  <Td>
                    <Badge
                      colorScheme={!u.isBlocked ? "green" : "red"}
                    >
                      {!u.isBlocked ? "Active" : "Blocked"}
                    </Badge>
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

        <Text fontSize="sm" alignSelf="center">
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

export default UserList;