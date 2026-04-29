import {
  Box,
  Text,
  VStack,
  Divider,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  // 🔥 dummy data (later backend se aayega)
  const user = {
    name: "Rajat Kashyap",
    email: "rajat@gmail.com",
    phone: "9999999999",
    role: localStorage.getItem("role"),
    address: "Bihar, India",
    pincode: "800001",
  };

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <Box p={20}>
        <Box
            maxW="500px"
            mx="auto"
            bg="white"
            p={6}
            borderRadius="xl"
            boxShadow="md"
        >
      
        <VStack spacing={4} align="start">

          <Text fontSize="2xl" fontWeight="bold">
            My Profile
          </Text>

          <Divider />

          <Text><b>Name:</b> {user.name}</Text>
          <Text><b>Email:</b> {user.email}</Text>
          <Text><b>Phone:</b> {user.phone}</Text>
          <Text><b>Role:</b> {user.role}</Text>
          <Text><b>Address:</b> {user.address}</Text>
          <Text><b>Pincode:</b> {user.pincode}</Text>

          <Divider />

          <Button
            colorScheme="red"
            width="100%"
            onClick={logout}
          >
            Logout
          </Button>

        </VStack>
      </Box>
    </Box>
  );
}

export default Profile;