import {
  Box,
  Text,
  Flex,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function UserDashboard() {

  // 👉 Dummy data (backend later)
  const total = 5;
  const pending = 2;
  const resolved = 3;
  const points = 30;

  const quote = "Clean surroundings lead to a healthy mind 🌿";

 const recentComplaints = [
  { id: 101, title: "Garbage near park", status: "Pending", date: "2026-04-20" },
  { id: 102, title: "Overflowing dustbin", status: "Resolved", date: "2026-04-18" },
  { id: 103, title: "Street waste issue", status: "Pending", date: "2026-04-17" },
  { id: 104, title: "Plastic dump", status: "Resolved", date: "2026-04-15" },
  { id: 105, title: "Garbage on road", status: "Pending", date: "2026-04-12" },
];

  return (
    <Flex direction="column">


      {/* MAIN */}
      <Box flex="1" p={6} bg="gray.50">

        {/* STATS */}
        <SimpleGrid columns={[1, 2, 4]} spacing={6} mb={6}>

          {[ 
            { label: "Total Complaints", value: total },
            { label: "Pending", value: pending },
            { label: "Resolved", value: resolved },
            { label: "Points Earned", value: points, color: "green.500" },
          ].map((item, index) => (
            <Box
              key={index}
              bg="white"
              p={6}
              borderRadius="xl"
              boxShadow="md"
              textAlign="center"   // ✅ center content
            >
              <Text fontSize="md" color="gray.500" mb={2}>
                {item.label}
              </Text>

              <Text
                fontSize="3xl"      // ✅ bigger font
                fontWeight="bold"   // ✅ bold
                color={item.color || "gray.800"}
              >
                {item.value}
              </Text>
            </Box>
          ))}

        </SimpleGrid>


        {/* 💬 QUOTE SECTION */}
        <Flex justify="center" mb={6}>
          <Box
            bg="green.50"            // ✅ light green
            px={8}
            py={4}
            borderRadius="full"      // ✅ cylinder look
            boxShadow="sm"
            maxW="600px"             // ❌ full width remove
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

        {/* 📜 RECENT COMPLAINTS */}
        
          <Box bg="white" p={5} borderRadius="lg" boxShadow="md">

  <Text fontSize="xl" fontWeight="bold" mb={4}>
    Recent Complaints
  </Text>

  {/* HEADER ROW */}
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

  {/* DATA ROWS */}
  <VStack align="stretch" spacing={2} mt={3}>
    {recentComplaints.map((item) => (
      <Grid
        key={item.id}
        templateColumns="1fr 2fr 1fr 1fr"
        gap={4}
        p={3}
        bg="gray.50"
        borderRadius="md"
        alignItems="center"
      >
        <Text>#{item.id}</Text>
        <Text fontWeight="medium">{item.title}</Text>
        <Text fontSize="sm" color="gray.600">
          {item.date}
        </Text>
        <Text
          fontWeight="semibold"
          color={
            item.status === "Pending"
              ? "orange.500"
              : "green.500"
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