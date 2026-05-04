import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  Select,
  Textarea,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

function HelpDesk() {
  const toast = useToast();

  const [form, setForm] = useState({
    role: "user",
    topic: "",
    complaintId: "",
    description: "",
    phone: "",
    email: "",
    department: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 API CALL
  const handleSubmit = async () => {
    const { topic, description, phone, email } = form;

    if (!topic || !description || !phone || !email) {
      toast({ title: "Please fill required fields", status: "error" });
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast({ title: "Ticket Raised Successfully ✅", status: "success" });

      // 🔄 reset form
      setForm({
        role: "user",
        topic: "",
        complaintId: "",
        description: "",
        phone: "",
        email: "",
        department: "",
        priority: "medium",
      });

    } catch (err) {
      toast({
        title: err.message || "Error raising ticket",
        status: "error",
      });
    }
  };

  return (
    <Box
      maxW="650px"
      mx="auto"
      mt={8}
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="md"
    >
      {/* HEADER */}
      <VStack spacing={1} mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Help Desk
        </Text>
        <Text fontSize="sm" color="gray.500">
          Raise an issue (User / Staff Support)
        </Text>
      </VStack>

      <VStack spacing={4} align="stretch">

        {/* ROLE */}
        <Box>
          <Text fontSize="sm" mb={1}>Role</Text>
          <Select name="role" value={form.role} onChange={handleChange} bg="gray.50">
            <option value="user">User</option>
            <option value="staff">Staff</option>
          </Select>
        </Box>

        {/* TOPIC */}
        <Box>
          <Text fontSize="sm" mb={1}>Select Topic *</Text>
          <Select name="topic" value={form.topic} onChange={handleChange} bg="gray.50">
            <option value="">Choose topic</option>

            <option value="escalation">Complaint Escalation</option>
            <option value="login">Login Issue</option>
            <option value="register">Registration Issue</option>
            <option value="raise">Unable to Raise Complaint</option>
            <option value="wrong-status">Wrong Complaint Status</option>

            <option value="not-assigned">Complaint Not Assigned</option>
            <option value="update-issue">Unable to Update Status</option>
            <option value="data-error">Incorrect Data / Location</option>
            <option value="duplicate">Duplicate Complaint</option>
            <option value="tech">Technical Issue</option>
            <option value="access">Permission Issue</option>
          </Select>
        </Box>

        {/* COMPLAINT ID */}
        <Box>
          <Text fontSize="sm" mb={1}>Complaint ID (optional)</Text>
          <Input
            name="complaintId"
            value={form.complaintId}
            onChange={handleChange}
            bg="gray.50"
          />
        </Box>

        {/* STAFF ONLY */}
        {form.role === "staff" && (
          <>
            <Box>
              <Text fontSize="sm" mb={1}>Department / Zone</Text>
              <Input
                name="department"
                value={form.department}
                onChange={handleChange}
                bg="gray.50"
              />
            </Box>

            <Box>
              <Text fontSize="sm" mb={1}>Priority</Text>
              <Select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                bg="gray.50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </Box>
          </>
        )}

        {/* DESCRIPTION */}
        <Box>
          <Text fontSize="sm" mb={1}>Description *</Text>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            bg="gray.50"
            rows={4}
          />
        </Box>

        {/* CONTACT */}
        <Input
          placeholder="Phone Number *"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          bg="gray.50"
        />

        <Input
          placeholder="Email *"
          name="email"
          value={form.email}
          onChange={handleChange}
          bg="gray.50"
        />

        <Button colorScheme="green" mt={3} onClick={handleSubmit}>
          Raise Ticket
        </Button>

      </VStack>
    </Box>
  );
}

export default HelpDesk;