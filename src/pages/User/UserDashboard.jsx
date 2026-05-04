import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  VStack,
  Grid,
  Spinner,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import API from "../../api/axios";

function UserDashboard() {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    points: 0,
  });

  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const quote = "Clean surroundings lead to a healthy mind 🌿";

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const [statsRes, complaintsRes] = await Promise.all([
        API.get("/complaints/stats/user"),
        API.get("/complaints/my"),
      ]);

      setStats(statsRes.data);

      // 🔥 latest 5 only
      const sorted = complaintsRes.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setRecentComplaints(sorted);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Flex justify="center" mt={10}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex direction="column">

      <Box flex="1" p={6} bg="gray.50">

        {/* 🔥 STATS */}
        <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={6}>
          {[
            { label: "Total Complaints", value: stats.total },
            { label: "Pending", value: stats.pending },
            { label: "Resolved", value: stats.completed },
            { label: "Points Earned", value: stats.points, color: "green.500" },
          ].map((item, index) => (
            <Box
              key={index}
              bg="white"
              p={6}
              borderRadius="xl"
              boxShadow="md"
              textAlign="center"
            >
              <Text fontSize="md" color="gray.500" mb={2}>
                {item.label}
              </Text>

              <Text
                fontSize="3xl"
                fontWeight="bold"
                color={item.color || "gray.800"}
              >
                {item.value}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* 💬 QUOTE */}
        <Flex justify="center" mb={6}>
          <Box
            bg="green.50"
            px={8}
            py={4}
            borderRadius="full"
            boxShadow="sm"
            maxW="600px"
            textAlign="center"
          >
            <Text
              fontStyle="italic"
              fontSize="lg"
              fontWeight="medium"
              color="green.700"
            >
              "{quote}"
            </Text>
          </Box>
        </Flex>

        {/* 📜 RECENT */}
        <Box bg="white" p={5} borderRadius="lg" boxShadow="md">

          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Recent Complaints
          </Text>

          <Grid
            templateColumns="1fr 2fr 1fr 1fr"
            gap={4}
            p={3}
            bg="gray.200"
            borderRadius="md"
            fontWeight="bold"
          >
            <Text>ID</Text>
            <Text>Title</Text>
            <Text>Date</Text>
            <Text>Status</Text>
          </Grid>

          <VStack align="stretch" spacing={2} mt={3}>
            {recentComplaints.map((item) => (
              <Grid
                key={item._id}
                templateColumns="1fr 2fr 1fr 1fr"
                gap={4}
                p={3}
                bg="gray.50"
                borderRadius="md"
                alignItems="center"
              >
                <Text>#{item._id.slice(-5)}</Text>

                <Text fontWeight="medium">{item.title}</Text>

                <Text fontSize="sm" color="gray.600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </Text>

                <Text
                  fontWeight="semibold"
                  color={
                    item.status === "pending"
                      ? "orange.500"
                      : item.status === "completed"
                      ? "green.500"
                      : "blue.500"
                  }
                >
                  {item.status}
                </Text>
              </Grid>
            ))}
          </VStack>

        </Box>

      </Box>
    </Flex>
  );
}

export default UserDashboard;