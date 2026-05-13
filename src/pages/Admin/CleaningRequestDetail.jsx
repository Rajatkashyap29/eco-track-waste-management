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
import { useState, useEffect } from "react";
import API from "../../api/axios";

function CleaningRequestDetail() {
  const { id } = useParams();
  const toast = useToast();

  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState("");
  const [staff, setStaff] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);

  //  FETCH DATA
  useEffect(() => {
    fetchRequest();
    fetchStaff();
  }, []);

  const fetchRequest = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/complaints/${id}`);

      setRequest(res.data);
      setStatus(res.data.status);

      //  AUTO SELECT STAFF IF ASSIGNED
      if (res.data.assignedTo) {
        setStaff(res.data.assignedTo._id);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    try {
      const res = await API.get("/users?role=staff");
      setStaffList(res.data.users || []);
    } catch (err) {
      console.log(err);
    }
  };

  //  Assign Staff
  const handleAssign = async () => {
    if (!staff) {
      toast({ title: "Select staff first", status: "error" });
      return;
    }

    try {
      await API.put(`/complaints/assign/${id}`, {
        staffId: staff,
      });

      setStatus("assigned");

      toast({ title: "Staff Assigned ✅", status: "success" });
    } catch (err) {
      toast({ title: "Failed to assign", status: "error" });
    }
  };

  if (loading || !request) {
    return <Text textAlign="center" mt={10}>Loading...</Text>;
  }

  return (
    <Box maxW="900px" mx="auto" p={6}>

      {/* HEADER */}
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        Cleaning Request #{request._id.slice(-4)}
      </Text>

      <Badge
        mb={4}
        textTransform="capitalize"
        colorScheme={
          status === "completed"
            ? "green"
            : status === "pending"
            ? "red"
            : "yellow"
        }
      >
        {status}
      </Badge>

      <VStack align="stretch" spacing={6}>

        {/* DETAILS */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>Waste Details</Text>

          <Text><b>Title:</b> {request.title}</Text>
          <Text textTransform="capitalize"><b>Type:</b> {request.wasteType}</Text>
          <Text textTransform="capitalize"><b>Volume:</b> {request.volume}</Text>
          <Text><b>Description:</b> {request.description}</Text>
          <Text><b>Additional Info:</b> {request.extra}</Text>
        </Box>

        {/* IMAGES */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>Images</Text>

          <SimpleGrid columns={[1, 3]} spacing={4}>
            {request.images?.map((img, i) => (
              <Image
                key={i}
                src={`${import.meta.env.VITE_API_URL.replace("/api","")}/${img}`}
                borderRadius="md"
                objectFit="cover"
              />
            ))}
          </SimpleGrid>
        </Box>

        {/* LOCATION */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>Location Details</Text>

          <Text><b>City:</b> {request.city}</Text>
          <Text><b>Pincode:</b> {request.pincode}</Text>
          <Text><b>Ward:</b> {request.ward}</Text>
          <Text><b>Street:</b> {request.street}</Text>
        </Box>

        {/* USER */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>User Info</Text>

          <Text><b>Name:</b> {request.user?.name}</Text>
          <Text><b>Email:</b> {request.user?.email}</Text>
          <Text><b>Phone:</b> {request.user?.phone}</Text>
        </Box>

        {/* ACTION */}
        <Box bg="white" p={5} borderRadius="xl" boxShadow="sm">
          <Text fontWeight="bold" mb={3}>Assign Staff</Text>

          <VStack align="stretch" spacing={3}>

            {/*  DROPDOWN */}
            <Select
              placeholder="Select Staff"
              value={staff}
              isDisabled={status === "assigned"} // ✅ disable if assigned
              onChange={(e) => setStaff(e.target.value)}
            >
              {staffList.map((s) => (
                <option key={s._id} value={s._id}>
                  {s.name} ({s.email})
                </option>
              ))}
            </Select>

            {/*  BUTTON */}
            <Button
              colorScheme="blue"
              onClick={handleAssign}
              isDisabled={status === "assigned"} // ✅ disable
            >
              Assign Staff
            </Button>

            {/*  SHOW ASSIGNED INFO */}
            {status === "assigned" && (
              <Text fontSize="sm" color="green.500">
                Assigned to: {request.assignedTo?.name}
              </Text>
            )}

          </VStack>
        </Box>

      </VStack>
    </Box>
  );
}

export default CleaningRequestDetail;