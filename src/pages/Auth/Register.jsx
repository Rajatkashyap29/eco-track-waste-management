import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  Select,
  useToast,
  IconButton,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "user",
    address: "",
    pincode: "",

    security1: "",
    answer1: "",
    security2: "",
    answer2: "",
    security3: "",
    answer3: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = () => {
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
      address,
      pincode,
      answer1,
      answer2,
      answer3,
    } = formData;

    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword ||
      !address ||
      !pincode ||
      !answer1 ||
      !answer2 ||
      !answer3
    ) {
      toast({ title: "All fields are required", status: "error" });
      return;
    }

    if (phone.length !== 10) {
      toast({ title: "Phone must be 10 digits", status: "error" });
      return;
    }

    if (pincode.length !== 6) {
      toast({ title: "Pincode must be 6 digits", status: "error" });
      return;
    }

    if (password !== confirmPassword) {
      toast({ title: "Passwords do not match", status: "error" });
      return;
    }



    toast({ title: "Registration Successful", status: "success" });

    console.log("User Data:", formData);

    navigate("/login");
  };

 return (
  <Box
    minH="100vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg="gray.100"
    px={4}
  >
    <Box
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="lg"
      width="100%"
      maxW="650px"
      position="relative"
    >

      {/* ❌ CLOSE BUTTON */}
      <IconButton
        icon={<CloseIcon />}
        size="sm"
        variant="ghost"
        color="gray.600"
        position="absolute"
        top="12px"
        right="12px"
        _hover={{ bg: "gray.100" }}
        onClick={() => navigate("/")}
      />

      {/* HEADER */}
      <VStack spacing={1} mb={6}>
        <Text fontSize="2xl" fontWeight="bold">
          Create Account
        </Text>
        <Text fontSize="sm" color="gray.500">
          Join EcoTrack and help keep your city clean
        </Text>
      </VStack>

      <VStack spacing={4} align="stretch">

        {/* BASIC INFO */}
        <Input placeholder="Full Name" name="name" onChange={handleChange} />
        <Input placeholder="Email" name="email" onChange={handleChange} />

        <Input placeholder="Phone Number" name="phone" onChange={handleChange} />

        <Input placeholder="Password" type="password" name="password" onChange={handleChange} />
        <Input placeholder="Confirm Password" type="password" name="confirmPassword" onChange={handleChange} />

        <Select name="role" onChange={handleChange}>
          <option value="user">User</option>
          <option value="staff">Staff</option>
        </Select>

        <Input placeholder="Address" name="address" onChange={handleChange} />
        <Input placeholder="Pincode" name="pincode" onChange={handleChange} />

       
        {/* SECURITY SECTION */}
        <Box pt={4} mt={2}>
          <Text fontSize="md" fontWeight="semibold" mb={3}>
            Security Questions
          </Text>

          <VStack spacing={4} align="stretch">

            {/* Q1 */}
            <Box>
              <Text fontSize="sm" color="gray.600" mb={1}>
                1. What is your Pet Name?
              </Text>
              <Input
                placeholder="Enter Answer"
                name="answer1"
                onChange={handleChange}
              />
            </Box>

            {/* Q2 */}
            <Box>
              <Text fontSize="sm" color="gray.600" mb={1}>
                2. Who was your Favorite Teacher?
              </Text>
              <Input
                placeholder="Enter Answer"
                name="answer2"
                onChange={handleChange}
              />
            </Box>

            {/* Q3 */}
            <Box>
              <Text fontSize="sm" color="gray.600" mb={1}>
                3. What is your Birth City?
              </Text>
              <Input
                placeholder="Enter Answer"
                name="answer3"
                onChange={handleChange}
              />
            </Box>

          </VStack>
        </Box>

        {/* BUTTON */}
        <Button
          colorScheme="green"
          width="100%"
          size="md"
          mt={3}
          onClick={handleRegister}
        >
          Register
        </Button>

        {/* LOGIN LINK */}
        <Text fontSize="sm" textAlign="center">
          Already have an account?{" "}
          <span
            style={{ color: "#3182ce", cursor: "pointer", fontWeight: "500" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Text>

      </VStack>
    </Box>
  </Box>
);
}

export default Register;