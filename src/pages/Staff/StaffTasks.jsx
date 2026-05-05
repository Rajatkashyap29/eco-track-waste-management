import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

function StaffTasks() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 10;

  // 🔥 FETCH TASKS FROM BACKEND
  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/complaints/assigned?page=${page}&limit=${perPage}`
      );

      setTasks(res.data.complaints || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={6} maxW="1100px" mx="auto">

      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        My Assigned Tasks
      </Text>

      <Box bg="white" borderRadius="xl" boxShadow="sm" overflow="hidden">

        {loading ? (
          <Text textAlign="center" py={10}>Loading...</Text>
        ) : (
          <Table>
            <Thead bg="gray.100">
              <Tr>
                <Th>ID</Th>
                <Th>Title</Th>
                <Th>Type</Th>
                <Th>Priority</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>

            <Tbody>
              {tasks.map((task) => (
                <Tr
                  key={task._id}
                  cursor="pointer"
                  _hover={{ bg: "gray.50" }}
                  onClick={() =>
                    navigate(`/staff/task/${task._id}`)
                  }
                >
                  <Td>#{task._id.slice(-4)}</Td>
                  <Td>{task.title}</Td>
                  <Td>{task.wasteType || "N/A"}</Td>
                  <Td>{task.volume || "N/A"}</Td>

                  {/* STATUS */}
                  <Td>
                    <Text
                      px={2}
                      py={1}
                      borderRadius="md"
                      fontSize="sm"
                      textTransform="capitalize"
                      bg={
                        task.status === "completed"
                          ? "green.100"
                          : task.status === "in-progress"
                          ? "yellow.100"
                          : "red.100"
                      }
                    >
                      {task.status}
                    </Text>
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

export default StaffTasks;