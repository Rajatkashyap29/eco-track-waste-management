import {
  Box,
  Text,
  Grid,
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
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import API from "../../api/axios";

function AdminDashboard() {

  const [stats, setStats] = useState({});
  const [requests, setRequests] = useState([]);
  const [tickets, setTickets] = useState([]);

  //  FETCH DATA
  useEffect(() => {
    fetchData();
  }, []);

 const fetchData = async () => {
  try {
    //  STATS
    const statsRes = await API.get("/complaints/stats/dashboard");
    setStats(statsRes.data);

    // COMPLAINTS
    const complaintRes = await API.get("/complaints/all?limit=5");
    setRequests(complaintRes.data.complaints || []);

    //  TICKETS
    const ticketRes = await API.get("/tickets/all?limit=5");
    setTickets(ticketRes.data.tickets || []);

  } catch (err) {
    console.log(err);
  }
};

  return (
    <Box p={6} maxW="1200px" mx="auto">

      {/*  CARDS */}
      <Grid templateColumns="repeat(4, 1fr)" gap={4} mb={6}>
        {[
          { label: "Total Requests", value: stats.totalRequests },
          { label: "Pending", value: stats.pending },
          { label: "In Progress", value: stats.inProgress },
          { label: "Completed", value: stats.completed },
          { label: "Total Users", value: stats.totalUsers },
          { label: "Active Staff", value: stats.activeStaff },
        ].map((item, i) => (
          <Box key={i} bg="white" p={4} borderRadius="lg" boxShadow="sm" textAlign="center">
            <Text fontSize="sm" color="gray.500">{item.label}</Text>
            <Text fontSize="2xl" fontWeight="bold">{item.value || 0}</Text>
          </Box>
        ))}
      </Grid>

      {/*  TABS */}
      <Tabs variant="soft-rounded" colorScheme="green">

        <TabList mb={4}>
          <Tab>Recent Requests</Tab>
          <Tab>HelpDesk Tickets</Tab>
        </TabList>

        <TabPanels>

          {/*  COMPLAINTS */}
          <TabPanel p={0}>
            <Box bg="white" borderRadius="lg" boxShadow="sm">
              <Table>
                <Thead bg="gray.100">
                  <Tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>User</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {requests.map((item) => (
                    <Tr key={item._id}>
                      <Td>#{item._id.slice(-4)}</Td>
                      <Td>{item.title}</Td>
                      <Td>{item.user?.name}</Td>
                      <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                      <Td>
                        <Text
                          px={2}
                          py={1}
                          borderRadius="md"
                          fontSize="sm"
                          bg={item.status === "completed" ? "green.100" : "red.100"}
                          color={item.status === "completed" ? "green.700" : "red.700"}
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

          {/*  TICKETS */}
          <TabPanel p={0}>
            <Box bg="white" borderRadius="lg" boxShadow="sm">
              <Table>
                <Thead bg="gray.100">
                  <Tr>
                    <Th>ID</Th>
                    <Th>Topic</Th>
                    <Th>Email</Th>
                    <Th>Date</Th>
                    <Th>Status</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {tickets.map((item) => (
                    <Tr key={item._id}>
                      <Td>#{item._id.slice(-4)}</Td>
                      <Td>{item.topic}</Td>
                      <Td>{item.email}</Td>
                      <Td>{new Date(item.createdAt).toLocaleDateString()}</Td>
                      <Td>
                        <Text
                          px={2}
                          py={1}
                          borderRadius="md"
                          fontSize="sm"
                          bg="yellow.100"
                          color="yellow.700"
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