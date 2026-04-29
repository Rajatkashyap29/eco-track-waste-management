import {
  Box,
  Text,
  VStack,
  Badge,
  Divider,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";

function ComplaintDetail() {
  const { id } = useParams();

  const data = {
    id,
    title: "Garbage Overflow Near Park",
    status: "Pending",
    date: "2026-04-29",

    // 🔥 WASTE DETAILS
    wasteType: "Mixed",
    volume: "Large",
    description: "Huge garbage pile causing smell",
    extra: "Nearby school affected",

    // 📍 LOCATION
    pincode: "800001",
    ward: "12",
    city: "Patna",
    street: "Main Road",
    landmark: "Near Park",
    locationExtra: "Behind temple",
  };

  return (
    <Box p={6}>
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md">

        <VStack align="start" spacing={4}>

          <Text fontSize="2xl" fontWeight="bold">
            Complaint #{data.id}
          </Text>

          <Badge colorScheme="yellow">{data.status}</Badge>

          <Text><b>Title:</b> {data.title}</Text>
          <Text><b>Date:</b> {data.date}</Text>

          <Divider />

          {/* 🗑️ WASTE DETAILS */}
          <Text fontSize="lg" fontWeight="semibold">
            Waste Details
          </Text>

          <Text><b>Type:</b> {data.wasteType}</Text>
          <Text><b>Volume:</b> {data.volume}</Text>
          <Text><b>Description:</b> {data.description}</Text>
          <Text><b>Additional Info:</b> {data.extra}</Text>

          <Divider />

          {/* 📍 LOCATION DETAILS */}
          <Text fontSize="lg" fontWeight="semibold">
            Location Details
          </Text>

          <Text><b>Pincode:</b> {data.pincode}</Text>
          <Text><b>Ward No:</b> {data.ward}</Text>
          <Text><b>City:</b> {data.city}</Text>
          <Text><b>Street:</b> {data.street}</Text>
          <Text><b>Landmark:</b> {data.landmark}</Text>
          <Text><b>Extra Info:</b> {data.locationExtra}</Text>

        </VStack>

      </Box>
    </Box>
  );
}

export default ComplaintDetail;