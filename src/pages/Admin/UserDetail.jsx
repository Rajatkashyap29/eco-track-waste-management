import {
  Box,
  Text,
  VStack,
  Badge,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  useToast,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/axios";

function UserDetail() {
  const { id } = useParams();
  const toast = useToast();

  const [user, setUser] = useState(null);
  const [complaints, setComplaints] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  //  FETCH USER
  useEffect(() => {
    fetchUser();
  }, []);

  //  FETCH COMPLAINTS
  useEffect(() => {
    fetchComplaints();
  }, [page]);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/users/${id}`);
      setUser(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComplaints = async () => {
    try {
      const res = await API.get(
        `/complaints/all?user=${id}&page=${page}&limit=5`
      );

      setComplaints(res.data.complaints || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.log(err);
    }
  };

  //  REAL BLOCK API CALL
  const toggleStatus = async () => {
    try {
      setBtnLoading(true);

      const res = await API.put(`/users/block/${id}`);

      //  update UI from response
      setUser({
        ...user,
        isBlocked: res.data.isBlocked,
      });

      toast({
        title: res.data.msg,
        status: "success",
      });

    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Failed",
        status: "error",
      });
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading || !user) {
    return <Text textAlign="center" mt={10}>Loading...</Text>;
  }

  return (
    <Box maxW="900px" mx="auto" p={6}>

      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        User Detail
      </Text>

      <VStack spacing={6} align="stretch">

        {/*  USER INFO */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">

          <Text><b>Name:</b> {user.name}</Text>
          <Text><b>Email:</b> {user.email}</Text>
          <Text><b>Phone:</b> {user.phone}</Text>
          <Text><b>Pincode:</b> {user.pincode}</Text>

          <Flex align="center" gap={3} mt={3}>
            <Badge colorScheme={!user.isBlocked ? "green" : "red"}>
              {!user.isBlocked ? "Active" : "Blocked"}
            </Badge>

            <Button
              size="sm"
              onClick={toggleStatus}
              isLoading={btnLoading}
              colorScheme={!user.isBlocked ? "red" : "green"}
            >
              {!user.isBlocked ? "Block User" : "Unblock User"}
            </Button>
          </Flex>
        </Box>

        {/*  COMPLAINTS */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">

          <Text fontWeight="bold" mb={3}>
            User Complaints
          </Text>

          {complaints.length === 0 ? (
            <Text>No complaints found</Text>
          ) : (
            <>
              <Table>
                <Thead bg="gray.100">
                  <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Status</Th>
                    <Th>Date</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {complaints.map((c) => (
                    <Tr key={c._id}>
                      <Td>#{c._id.slice(-4)}</Td>
                      <Td>{c.title}</Td>

                      <Td>
                        <Badge
                          textTransform="capitalize"
                          colorScheme={
                            c.status === "completed"
                              ? "green"
                              : c.status === "pending"
                              ? "red"
                              : "yellow"
                          }
                        >
                          {c.status}
                        </Badge>
                      </Td>

                      <Td>
                        {new Date(c.createdAt).toLocaleDateString()}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {/*  PAGINATION */}
              <Flex justify="center" mt={4} gap={3}>
                <Button
                  size="sm"
                  onClick={() => setPage((p) => p - 1)}
                  isDisabled={page === 1}
                >
                  Prev
                </Button>

                <Text fontSize="sm">
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
            </>
          )}

        </Box>

      </VStack>
    </Box>
  );
}

export default UserDetail;