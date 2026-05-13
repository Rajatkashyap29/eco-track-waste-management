import {
  Box,
  Text,
  VStack,
  Button,
  SimpleGrid,
  Image,
  useToast,
} from "@chakra-ui/react";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

function StaffTaskDetail() {
  const { id } = useParams();
  const toast = useToast();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  //  FETCH TASK
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);

        const res = await API.get(`/complaints/${id}`);
        setTask(res.data);
        setStatus(res.data.status);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  // START WORK
  const startWork = async () => {
    try {
      await API.put(`/complaints/status/${id}`, {
        status: "in-progress",
      });

      setStatus("in-progress");

      toast({
        title: "Work Started",
        status: "success",
      });

    } catch (err) {
      toast({
        title: "Failed to update status",
        status: "error",
      });
    }
  };

  //  COMPLETE WORK
  const completeWork = async () => {
    try {
      await API.put(`/complaints/status/${id}`, {
        status: "completed",
      });

      setStatus("completed");

      toast({
        title: "Task Completed",
        status: "success",
      });

      //  redirect after completion
      navigate("/staff/tasks");

    } catch (err) {
      toast({
        title: "Failed to update status",
        status: "error",
      });
    }
  };

  if (loading || !task) {
    return (
      <Text textAlign="center" mt={10}>
        Loading...
      </Text>
    );
  }

  return (
    <Box p={6} maxW="900px" mx="auto">

      <Text fontSize="2xl" fontWeight="bold" mb={5}>
        Task Detail (#{id})
      </Text>

      <VStack spacing={6} align="stretch">

        {/* TITLE */}
        <Box bg="white" p={5} borderRadius="xl">
          <Text fontWeight="bold">{task.title}</Text>
          <Text mt={2}>
            Status:{" "}
            <b style={{ textTransform: "capitalize" }}>{status}</b>
          </Text>
        </Box>

        {/* DETAILS */}
        <Box bg="white" p={5} borderRadius="xl">
          <Text fontWeight="bold" mb={2}>
            Waste Details
          </Text>
          <Text>Type: {task.wasteType}</Text>
          <Text>Volume: {task.volume}</Text>
          <Text>Description: {task.description}</Text>
          <Text>Extra: {task.extra}</Text>
        </Box>

        {/* IMAGES */}
        <SimpleGrid columns={3} spacing={3}>
          {task.images?.map((img, i) => (
            <Image
              key={i}
              src={`${import.meta.env.VITE_API_URL.replace("/api","")}/${img}`}
              borderRadius="md"
            />
          ))}
        </SimpleGrid>

        {/* LOCATION */}
        <Box bg="white" p={5} borderRadius="xl">
          <Text fontWeight="bold" mb={2}>
            Location
          </Text>
          <Text>Pincode: {task.pincode}</Text>
          <Text>Ward: {task.ward}</Text>
          <Text>City: {task.city}</Text>
          <Text>Street: {task.street}</Text>
          <Text>Landmark: {task.landmark}</Text>
        </Box>

        {/* ACTIONS (FIXED - YOUR ORIGINAL UI RESTORED) */}
        <VStack>
          {status === "assigned" && (
            <Button colorScheme="blue" onClick={startWork}>
              Start Work
            </Button>
          )}

          {status === "in-progress" && (
            <Button colorScheme="green" onClick={completeWork}>
              Mark Completed
            </Button>
          )}

          {status === "resolved" && (
            <Button isDisabled colorScheme="gray">
              Completed
            </Button>
          )}
        </VStack>

      </VStack>
    </Box>
  );
}

export default StaffTaskDetail;