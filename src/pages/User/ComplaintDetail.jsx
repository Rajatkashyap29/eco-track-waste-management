import {
  Box,
  Text,
  VStack,
  Badge,
  Divider,
  Spinner,
  Flex,
  Image,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

function ComplaintDetail() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 API CALL
  const fetchComplaint = async () => {
    try {
      const res = await API.get(`/complaints/${id}`);
      setData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaint();
  }, [id]);

  // 🎨 STATUS COLOR
  const getStatusColor = (status) => {
    if (status === "completed") return "green";
    if (status === "pending") return "red";
    return "yellow";
  };

  // 🔄 LOADING
  if (loading) {
    return (
      <Flex justify="center" mt={10}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  // ❌ NO DATA
  if (!data) {
    return (
      <Text textAlign="center" mt={10}>
        Complaint not found
      </Text>
    );
  }

  return (
    <Box p={6} maxW="800px" mx="auto">
      <Box bg="white" p={6} borderRadius="lg" boxShadow="md">

        <VStack align="start" spacing={4}>

          <Text fontSize="2xl" fontWeight="bold">
            Complaint #{data._id?.slice(-5)}
          </Text>

          <Badge colorScheme={getStatusColor(data.status)}>
            {data.status}
          </Badge>

          <Text><b>Title:</b> {data.title}</Text>

          <Text>
            <b>Date:</b>{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </Text>

          <Divider />

          {/* 🖼️ IMAGES */}
          {data.images?.length > 0 && (
            <>
              <Text fontSize="lg" fontWeight="semibold">
                Images
              </Text>

              <Flex gap={3} wrap="wrap">
                {data.images.map((img, i) => (
                  <Image
                    key={i}
                    src={`${import.meta.env.VITE_API_URL.replace("/api","")}/${img}`}
                    boxSize="120px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                ))}
              </Flex>

              <Divider />
            </>
          )}

          {/* 🗑️ WASTE DETAILS */}
          <Text fontSize="lg" fontWeight="semibold">
            Waste Details
          </Text>

          <Text><b>Type:</b> {data.wasteType}</Text>
          <Text><b>Volume:</b> {data.volume}</Text>
          <Text><b>Description:</b> {data.description}</Text>
          <Text><b>Additional Info:</b> {data.extra}</Text>

          <Divider />

          {/* 📍 LOCATION */}
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