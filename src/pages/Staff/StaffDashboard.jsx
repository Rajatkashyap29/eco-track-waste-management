import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  VStack,
  Spinner,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

function StaffDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH DATA
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      // 🔥 STATS
      const statsRes = await API.get("complaints/stats/staff");
      setStats(statsRes.data);

      // 🔥 RECENT TASKS
      const taskRes = await API.get("/complaints/assigned?page=1");
      setRecentTasks(taskRes.data.complaints.slice(0, 5));

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner />
      </Box>
    );
  }

  return (
    <Box p={6} maxW="1100px" mx="auto">

      {/* 🔥 STATS CARDS */}
      <SimpleGrid columns={[2, 2, 4]} spacing={5} mb={8}>

        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontSize="sm" color="gray.500">Assigned</Text>
          <Text fontSize="2xl" fontWeight="bold">{stats?.total || 0}</Text>
        </Box>

        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontSize="sm" color="gray.500">Pending</Text>
          <Text fontSize="2xl" fontWeight="bold">{stats?.pending || 0}</Text>
        </Box>

        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontSize="sm" color="gray.500">In Progress</Text>
          <Text fontSize="2xl" fontWeight="bold">{stats?.inProgress || 0}</Text>
        </Box>

        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontSize="sm" color="gray.500">Completed</Text>
          <Text fontSize="2xl" fontWeight="bold">{stats?.completed || 0}</Text>
        </Box>

      </SimpleGrid>

      {/* 🔥 QUICK ACTION */}
      <Box
        bg="white"
        p={6}
        borderRadius="xl"
        boxShadow="sm"
        cursor="pointer"
        _hover={{ bg: "gray.50" }}
        mb={6}
        onClick={() => navigate("/staff/tasks")}
      >
        <Text fontSize="lg" fontWeight="bold">
          Go to My Tasks →
        </Text>
      </Box>

      {/* 🔥 RECENT TASKS */}
      <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">

        <Flex justify="space-between" mb={4}>
          <Text fontSize="lg" fontWeight="bold">
            Recent Tasks
          </Text>

          <Text
            fontSize="sm"
            color="blue.500"
            cursor="pointer"
            onClick={() => navigate("/staff/tasks")}
          >
            View All
          </Text>
        </Flex>

        <VStack spacing={3} align="stretch">

          {recentTasks.map((task) => (
            <Flex
              key={task._id}
              justify="space-between"
              p={3}
              borderRadius="md"
              _hover={{ bg: "gray.50" }}
              cursor="pointer"
              onClick={() => navigate(`/staff/task/${task._id}`)}
            >
              <Text fontSize="sm">
                #{task._id.slice(-4)} - {task.title}
              </Text>

              <Text
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="md"
                bg={
                  task.status === "completed"
                    ? "green.100"
                    : task.status === "pending"
                    ? "red.100"
                    : "yellow.100"
                }
                color={
                  task.status === "completed"
                    ? "green.700"
                    : task.status === "pending"
                    ? "red.700"
                    : "yellow.700"
                }
              >
                {task.status}
              </Text>
            </Flex>
          ))}

        </VStack>
      </Box>

    </Box>
  );
}

export default StaffDashboard;