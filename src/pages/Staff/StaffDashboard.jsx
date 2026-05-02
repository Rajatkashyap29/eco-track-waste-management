import {
  Box,
  Text,
  SimpleGrid,
  Flex,
  VStack,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

function StaffDashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: "Assigned", value: 12 },
    { label: "Pending", value: 5 },
    { label: "In Progress", value: 4 },
    { label: "Completed", value: 3 },
  ];

  // 🔥 DUMMY RECENT TASKS (last 5)
  const recentTasks = [
    { id: 101, title: "Garbage near park", status: "Pending" },
    { id: 102, title: "Street waste issue", status: "In Progress" },
    { id: 103, title: "Overflow dustbin", status: "Completed" },
    { id: 104, title: "Market area cleaning", status: "Pending" },
    { id: 105, title: "Drain blockage", status: "In Progress" },
  ];

  return (
    <Box p={6} maxW="1100px" mx="auto">

      {/* 🔥 CARDS */}
      <SimpleGrid columns={[2, 2, 4]} spacing={5} mb={8}>
        {stats.map((item, i) => (
          <Box
            key={i}
            bg="white"
            p={5}
            borderRadius="xl"
            boxShadow="sm"
          >
            <Text fontSize="sm" color="gray.500">
              {item.label}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {item.value}
            </Text>
          </Box>
        ))}
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
              key={task.id}
              justify="space-between"
              p={3}
              borderRadius="md"
              _hover={{ bg: "gray.50" }}
              cursor="pointer"
              onClick={() => navigate(`/staff/task/${task.id}`)}
            >
              <Text fontSize="sm">
                #{task.id} - {task.title}
              </Text>

              <Text
                fontSize="xs"
                px={2}
                py={1}
                borderRadius="md"
                bg={
                  task.status === "Completed"
                    ? "green.100"
                    : task.status === "Pending"
                    ? "red.100"
                    : "yellow.100"
                }
                color={
                  task.status === "Completed"
                    ? "green.700"
                    : task.status === "Pending"
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