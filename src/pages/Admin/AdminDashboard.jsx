import {
  Box,
  Text,
  Grid,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
} from "@chakra-ui/react";

function AdminDashboard() {

  // 🔥 CARD DATA
  const stats = [
    { label: "Total Requests", value: 120 },
    { label: "Pending", value: 35 },
    { label: "In Progress", value: 50 },
    { label: "Resolved", value: 35 },
    { label: "Total Users", value: 200 },
    { label: "Active Staff", value: 15 },
    { label: "Today Requests", value: 12 },
    { label: "High Priority", value: 5 },
  ];

  // 🔥 DUMMY DATA
  const requests = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: "Garbage near market",
    type: "Wet",
    location: "Ward 12",
    date: "29 Apr 2026",
    status: i % 2 === 0 ? "Pending" : "Resolved",
  }));

  const complaints = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    topic: "Login Issue",
    user: "user@gmail.com",
    date: "29 Apr 2026",
    status: i % 2 === 0 ? "Pending" : "Resolved",
  }));

  return (
    <Box p={6} maxW="1200px" mx="auto">

      {/* 🔥 TOP CARDS */}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
        {stats.map((item, index) => (
          <Box
            key={index}
            bg="white"
            p={4}
            borderRadius="lg"
            boxShadow="sm"
            textAlign="center"
          >
            <Text fontSize="sm" color="gray.500">
              {item.label}
            </Text>
            <Text fontSize="2xl" fontWeight="bold">
              {item.value}
            </Text>
          </Box>
        ))}
      </Grid>

      {/* 🔥 TABS */}
      <Tabs variant="soft-rounded" colorScheme="green">

        <TabList mb={4}>
          <Tab>Recent Requests</Tab>
          <Tab>Recent Complaints</Tab>
        </TabList>

        <TabPanels>

          {/* 🟢 TAB 1: REQUESTS */}
          <TabPanel p={0}>
            <Box bg="white" borderRadius="lg" boxShadow="sm">
              <Table>
                <Thead bg="gray.100">
                  <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Type</Th>
                    <Th>Location</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {requests.map((item) => (
                    <Tr key={item.id} _hover={{ bg: "gray.50" }}>
                      <Td>{item.id}</Td>
                      <Td>{item.title}</Td>
                      <Td>{item.type}</Td>
                      <Td>{item.location}</Td>
                      <Td>{item.date}</Td>
                      <Td>
                        <Text
                          px={2}
                          py={1}
                          borderRadius="md"
                          fontSize="sm"
                          display="inline-block"
                          bg={
                            item.status === "Resolved"
                              ? "green.100"
                              : "red.100"
                          }
                          color={
                            item.status === "Resolved"
                              ? "green.700"
                              : "red.700"
                          }
                        >
                          {item.status}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>

          {/* 🟡 TAB 2: COMPLAINTS */}
          <TabPanel p={0}>
            <Box bg="white" borderRadius="lg" boxShadow="sm">
              <Table>
                <Thead bg="gray.100">
                  <Tr>
                    <Th>ID</Th>
                    <Th>Topic</Th>
                    <Th>User</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {complaints.map((item) => (
                    <Tr key={item.id} _hover={{ bg: "gray.50" }}>
                      <Td>{item.id}</Td>
                      <Td>{item.topic}</Td>
                      <Td>{item.user}</Td>
                      <Td>{item.date}</Td>
                      <Td>
                        <Text
                          px={2}
                          py={1}
                          borderRadius="md"
                          fontSize="sm"
                          display="inline-block"
                          bg={
                            item.status === "Resolved"
                              ? "green.100"
                              : "red.100"
                          }
                          color={
                            item.status === "Resolved"
                              ? "green.700"
                              : "red.700"
                          }
                        >
                          {item.status}
                        </Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </TabPanel>

        </TabPanels>
      </Tabs>

    </Box>
  );
}

export default AdminDashboard;