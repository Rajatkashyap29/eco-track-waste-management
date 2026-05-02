import {
  Box,
  Text,
  VStack,
  Select,
  Button,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useState } from "react";

function AdminComplaintDetail() {
  const { id } = useParams();
  const toast = useToast();

  const [status, setStatus] = useState("Open");
  const [assignedTo, setAssignedTo] = useState("");

  const handleUpdate = () => {
    toast({ title: "Updated Successfully", status: "success" });
  };

  return (
    <Box maxW="700px" mx="auto" mt={8} p={6} bg="white" borderRadius="xl">

      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Ticket #{id}
      </Text>

      <VStack spacing={4} align="stretch">

        <Box>
          <Text fontWeight="semibold">Topic</Text>
          <Text>Login Issue</Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">Role</Text>
          <Text>User</Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">Complaint ID</Text>
          <Text>#12345</Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">Description</Text>
          <Textarea value="User unable to login" isReadOnly />
        </Box>

        <Box>
          <Text fontWeight="semibold">Contact</Text>
          <Text>📞 9876543210</Text>
          <Text>📧 user@gmail.com</Text>
        </Box>

        {/* 🔥 ADMIN ACTION */}
        <Box>
          <Text fontWeight="semibold">Assign Staff</Text>
          <Input
            placeholder="Enter staff name / ID"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          />
        </Box>

        <Box>
          <Text fontWeight="semibold">Update Status</Text>
          <Select onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </Select>
        </Box>

        <Button colorScheme="green" onClick={handleUpdate}>
          Save Changes
        </Button>

      </VStack>
    </Box>
  );
}

export default AdminComplaintDetail;