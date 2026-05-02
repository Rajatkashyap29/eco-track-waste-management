import {
  Box,
  Text,
  VStack,
  Badge,
  Select,
  Button,
  SimpleGrid,
  Image,
  useToast,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useState } from "react";

function CleaningRequestDetail() {
  const { id } = useParams();
  const toast = useToast();

  // 🔥 dummy full data (later backend)
  const request = {
    id,
    title: "Garbage near market",
    wasteType: "Mixed",
    volume: "Large",
    description: "Huge garbage pile near main road causing smell",
    extra: "Near temple side",

    images: [
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
      "https://via.placeholder.com/150",
    ],

    pincode: "834001",
    ward: "12",
    city: "Ranchi",
    street: "Main Road",
    landmark: "Near Hanuman Temple",
    locationExtra: "Backside lane",

    date: "29 Apr 2026",
  };

  const [status, setStatus] = useState("Pending");
  const [staff, setStaff] = useState("");

  // ✅ Assign
  const handleAssign = () => {
    if (!staff) {
      toast({ title: "Select staff first", status: "error" });
      return;
    }

    setStatus("Assigned");
    toast({ title: "Staff Assigned ✅", status: "success" });
  };

  // ✅ Complete
  const handleComplete = () => {
    setStatus("Completed");
    toast({ title: "Marked Completed ✅", status: "success" });
  };

  return (
    <Box maxW="900px" mx="auto" p={6}>

      {/* HEADER */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Cleaning Request #{request.id}
      </Text>

      <Badge
        mb={4}
        colorScheme={
          status === "Completed"
            ? "green"
            : status === "Pending"
            ? "red"
            : "yellow"
        }
      >
        {status}
      </Badge>

      <VStack align="stretch" spacing={6}>

        {/* 🔥 WASTE DETAILS */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>Waste Details</Text>

          <Text><b>Title:</b> {request.title}</Text>
          <Text><b>Type:</b> {request.wasteType}</Text>
          <Text><b>Volume:</b> {request.volume}</Text>
          <Text><b>Description:</b> {request.description}</Text>
          <Text><b>Additional Info:</b> {request.extra}</Text>
        </Box>

        {/* 🖼️ IMAGES */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>Images</Text>

          <SimpleGrid columns={[1, 3]} spacing={4}>
            {request.images.map((img, i) => (
              <Image
                key={i}
                src={img}
                borderRadius="md"
                objectFit="cover"
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* 📍 LOCATION */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>Location Details</Text>

          <Text><b>Pincode:</b> {request.pincode}</Text>
          <Text><b>Ward No:</b> {request.ward}</Text>
          <Text><b>City:</b> {request.city}</Text>
          <Text><b>Street:</b> {request.street}</Text>
          <Text><b>Landmark:</b> {request.landmark}</Text>
          <Text><b>Extra Info:</b> {request.locationExtra}</Text>
        </Box>

        {/* ⚙️ ACTION SECTION */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>Admin Actions</Text>

          <VStack align="stretch" spacing={3}>

            <Select
              placeholder="Select Staff"
              onChange={(e) => setStaff(e.target.value)}
            >
              <option value="staff1">Staff 1</option>
              <option value="staff2">Staff 2</option>
              <option value="staff3">Staff 3</option>
            </Select>

            <Button colorScheme="blue" onClick={handleAssign}>
              Assign Staff
            </Button>


          </VStack>
        </Box>

      </VStack>
    </Box>
  );
}

export default CleaningRequestDetail;