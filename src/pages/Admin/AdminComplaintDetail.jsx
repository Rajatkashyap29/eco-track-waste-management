import {
  Box,
  Text,
  VStack,
  Select,
  Button,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../../api/axios";

function AdminComplaintDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [ticket, setTicket] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  //  FETCH TICKET
  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/tickets/${id}`);
      setTicket(res.data);
      setStatus(res.data.status);

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 UPDATE STATUS + REDIRECT
  const handleUpdate = async () => {
    try {
      await API.put(`/tickets/${id}`, {
        status,
      });

      toast({
        title: "Ticket updated successfully",
        status: "success",
      });

      // ⬅️ REDIRECT AFTER SUCCESS
      navigate("/admin/complaints");

    } catch (err) {
      toast({
        title: "Update failed",
        status: "error",
      });
    }
  };

  if (loading || !ticket) {
    return <Text textAlign="center" mt={10}>Loading...</Text>;
  }

  return (
    <Box maxW="700px" mx="auto" mt={8} p={6} bg="white" borderRadius="xl">

      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Ticket #{id}
      </Text>

      <VStack spacing={4} align="stretch">

        <Box>
          <Text fontWeight="semibold">Topic</Text>
          <Text>{ticket.topic}</Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">Role</Text>
          <Text textTransform="capitalize">{ticket.role}</Text>
        </Box>

        <Box>
          <Text fontWeight="semibold">Description</Text>
          <Textarea value={ticket.description} isReadOnly />
        </Box>

        <Box>
          <Text fontWeight="semibold">Contact</Text>
          <Text>📞 {ticket.phone}</Text>
          <Text>📧 {ticket.email}</Text>
        </Box>

        {/*  STATUS */}
        <Box>
          <Text fontWeight="semibold">Update Status</Text>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
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