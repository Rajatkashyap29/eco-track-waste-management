import {
  Box,
  Text,
  Button,
  Select,
  VStack,
  Badge,
  useToast,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useState } from "react";

function CleaningRequestDetail() {
  const { id } = useParams();
  const toast = useToast();

  const [status, setStatus] = useState("Pending");
  const [staff, setStaff] = useState("");

  const handleAssign = () => {
    if (!staff) {
      toast({ title: "Select staff", status: "error" });
      return;
    }

    setStatus("Assigned");
    toast({ title: "Staff Assigned", status: "success" });
  };

  const handleComplete = () => {
    setStatus("Completed");
    toast({ title: "Marked as Completed", status: "success" });
  };

  return (
    <Box maxW="700px" mx="auto" p={6}>

      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Request #{id}
      </Text>

      <VStack align="start" spacing={3}>

        <Text><b>Waste Type:</b> Dry</Text>
        <Text><b>Volume:</b> Medium</Text>
        <Text><b>Location:</b> Ranchi, Ward 12</Text>
        <Text><b>Description:</b> Garbage pile near road</Text>

        <Badge
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

        {/* ASSIGN STAFF */}
        <Select
          placeholder="Select Staff"
          onChange={(e) => setStaff(e.target.value)}
        >
          <option value="staff1">Staff 1</option>
          <option value="staff2">Staff 2</option>
        </Select>

        <Button colorScheme="blue" onClick={handleAssign}>
          Assign Staff
        </Button>

        {/* COMPLETE */}
        {status === "Assigned" && (
          <Button colorScheme="green" onClick={handleComplete}>
            Mark as Completed
          </Button>
        )}

      </VStack>
    </Box>
  );
}

export default CleaningRequestDetail;