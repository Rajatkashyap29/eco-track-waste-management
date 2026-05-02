import {
  Box,
  Text,
  VStack,
  Button,
  SimpleGrid,
  Image,
  useToast,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useState } from "react";

function StaffTaskDetail() {
  const { id } = useParams();
  const toast = useToast();

  const [status, setStatus] = useState("Pending");

  // 🔥 Dummy Full Data
  const data = {
    title: "Garbage near park",
    wasteType: "Mixed",
    volume: "Large",
    description: "Huge garbage pile near children park",
    extra: "Smell is very bad",
    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],
    location: {
      pincode: "800001",
      ward: "12",
      city: "Patna",
      street: "Main Road",
      landmark: "Near Park",
    },
  };

  const startWork = () => {
    setStatus("In Progress");
    toast({ title: "Work Started", status: "success" });
  };

  const completeWork = () => {
    setStatus("Completed");
    toast({ title: "Marked Completed", status: "success" });
  };

  return (
    <Box p={6} maxW="900px" mx="auto">

      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Task Detail (#{id})
      </Text>

      <VStack spacing={6} align="stretch">

        {/* TITLE */}
        <Box bg="white" p={5} borderRadius="xl">
          <Text fontWeight="bold">{data.title}</Text>
          <Text>Status: {status}</Text>
        </Box>

        {/* WASTE */}
        <Box bg="white" p={5} borderRadius="xl">
          <Text fontWeight="bold" mb={2}>Waste Details</Text>
          <Text>Type: {data.wasteType}</Text>
          <Text>Volume: {data.volume}</Text>
          <Text>Description: {data.description}</Text>
          <Text>Extra: {data.extra}</Text>
        </Box>

        {/* IMAGES */}
        <SimpleGrid columns={3} spacing={3}>
          {data.images.map((img, i) => (
            <Image key={i} src={img} borderRadius="md" />
          ))}
        </SimpleGrid>

        {/* LOCATION */}
        <Box bg="white" p={5} borderRadius="xl">
          <Text fontWeight="bold" mb={2}>Location</Text>
          <Text>Pincode: {data.location.pincode}</Text>
          <Text>Ward: {data.location.ward}</Text>
          <Text>City: {data.location.city}</Text>
          <Text>Street: {data.location.street}</Text>
          <Text>Landmark: {data.location.landmark}</Text>
        </Box>

        {/* ACTIONS */}
        <VStack>
          {status === "Pending" && (
            <Button colorScheme="blue" onClick={startWork}>
              Start Work
            </Button>
          )}

          {status === "In Progress" && (
            <Button colorScheme="green" onClick={completeWork}>
              Mark Completed
            </Button>
          )}
        </VStack>

      </VStack>
    </Box>
  );
}

export default StaffTaskDetail;