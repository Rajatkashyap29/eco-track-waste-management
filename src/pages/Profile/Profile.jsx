import {
  Box,
  Text,
  VStack,
  Divider,
  Button,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../../api/axios";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  //  FETCH LOGGED IN USER
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/users/me");
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear(); // safer than removing only role
    navigate("/");
  };

  if (!user) {
    return (
      <Box textAlign="center" mt={10}>
        Loading...
      </Box>
    );
  }

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