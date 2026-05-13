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
import api from "../../api/axios"; // ✅ axios instance

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
    answer1: "",
    answer2: "",
    answer3: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  REGISTER API CALL
  const handleRegister = async () => {
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

    //  VALIDATION
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

    try {
      //  EXACT PAYLOAD (same as tera)
      const res = await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
        address: formData.address,
        pincode: formData.pincode,
        answer1: formData.answer1,
        answer2: formData.answer2,
        answer3: formData.answer3,
      });

      toast({
        title: res.data.message || "Registration Successful",
        status: "success",
      });

      navigate("/login");

    } catch (err) {
      toast({
        title: err.response?.data?.message || "Registration Failed",
        status: "error",
      });
    }
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

        {/*  CLOSE */}
        <IconButton
          icon={<CloseIcon />}
          size="sm"
          variant="ghost"
          position="absolute"
          top="12px"
          right="12px"
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

          {/* SECURITY */}
          <Box pt={4}>
            <Text fontWeight="semibold" mb={2}>Security Questions</Text>

            <Input placeholder="Pet Name" name="answer1" onChange={handleChange} />
            <Input placeholder="Favorite Teacher" name="answer2" onChange={handleChange} />
            <Input placeholder="Birth City" name="answer3" onChange={handleChange} />
          </Box>

          <Button colorScheme="green" mt={3} onClick={handleRegister}>
            Register
          </Button>

          <Text fontSize="sm" textAlign="center">
            Already have an account?{" "}
            <span
              style={{ color: "#3182ce", cursor: "pointer" }}
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