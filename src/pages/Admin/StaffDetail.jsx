import {
  Box,
  Text,
  VStack,
  Badge,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Button,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/axios";

function StaffDetail() {
  const { id } = useParams();

  const [staff, setStaff] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 pagination state
  const [taskPage, setTaskPage] = useState(1);
  const [taskTotalPages, setTaskTotalPages] = useState(1);

  // 🔥 FETCH STAFF
  useEffect(() => {
    fetchStaff();
  }, []);

  // 🔥 FETCH TASKS (with pagination)
  useEffect(() => {
    fetchTasks();
  }, [taskPage]);

  const fetchStaff = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/users/${id}`);
      setStaff(res.data);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await API.get(
        `/complaints/all?assignedTo=${id}&page=${taskPage}&limit=5`
      );

      setTasks(res.data.complaints || []);
      setTaskTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.log(err);
    }
  };

  if (loading || !staff) {
    return <Text textAlign="center" mt={10}>Loading...</Text>;
  }

  return (
    <Box maxW="900px" mx="auto" p={6}>

      {/* HEADER */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Staff Detail
      </Text>

      <VStack align="stretch" spacing={6}>

        {/*  STAFF INFO */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">

          <Text><b>Name:</b> {staff.name}</Text>
          <Text><b>Email:</b> {staff.email}</Text>
          <Text><b>Phone:</b> {staff.phone}</Text>
          <Text><b>Pincode:</b> {staff.pincode}</Text>

          <Flex align="center" gap={3} mt={3}>
            <Badge
              textTransform="capitalize"
              colorScheme={staff.status === "active" ? "green" : "red"}
            >
              {staff.status}
            </Badge>
          </Flex>
        </Box>

        {/*  ASSIGNED TASKS */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">

          <Text fontWeight="bold" mb={3}>
            Assigned Requests
          </Text>

          {tasks.length === 0 ? (
            <Text>No tasks assigned</Text>
          ) : (
            <>
              <Table>
                <Thead bg="gray.100">
                  <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {tasks.map((t) => (
                    <Tr key={t._id}>
                      <Td>#{t._id.slice(-4)}</Td>
                      <Td>{t.title}</Td>

                      <Td>
                        <Badge
                          textTransform="capitalize"
                          colorScheme={
                            t.status === "completed"
                              ? "green"
                              : t.status === "pending"
                              ? "red"
                              : "yellow"
                          }
                        >
                          {t.status}
                        </Badge>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              {/*  PAGINATION */}
              <Flex justify="center" mt={4} gap={3}>
                <Button
                  size="sm"
                  onClick={() => setTaskPage((p) => p - 1)}
                  isDisabled={taskPage === 1}
                >
                  Prev
                </Button>

                <Text fontSize="sm" alignSelf="center">
                  {taskPage} / {taskTotalPages}
                </Text>

                <Button
                  size="sm"
                  onClick={() => setTaskPage((p) => p + 1)}
                  isDisabled={taskPage === taskTotalPages}
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

export default StaffDetail;