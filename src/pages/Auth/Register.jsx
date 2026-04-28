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
      security1,
      security2,
      security3,
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
      !security1 ||
      !security2 ||
      !security3 ||
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

    // ❗ Duplicate question check
    if (
      security1 === security2 ||
      security2 === security3 ||
      security1 === security3
    ) {
      toast({ title: "Choose different security questions", status: "error" });
      return;
    }

    toast({ title: "Registration Successful", status: "success" });

    console.log("User Data:", formData);

    navigate("/login");
  };

  return (
    <Box
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="lg"
      width="100%"
      position="relative"
    >
      {/* ❌ CLOSE BUTTON */}
      <IconButton
        icon={<CloseIcon />}
        size="sm"
        position="absolute"
        top="10px"
        right="10px"
        onClick={() => navigate("/")}
      />

      <VStack spacing={5}>

        <Text fontSize="2xl" fontWeight="bold">
          Create Account
        </Text>

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

        {/* 🔐 SECURITY QUESTIONS */}
        <Text fontWeight="semibold">Security Questions</Text>

        <Select name="security1" onChange={handleChange}>
          <option value="">Select Question 1</option>
          <option value="pet">Pet Name</option>
          <option value="teacher">Favorite Teacher</option>
          <option value="city">Birth City</option>
        </Select>
        <Input placeholder="Answer" name="answer1" onChange={handleChange} />

        <Select name="security2" onChange={handleChange}>
          <option value="">Select Question 2</option>
          <option value="pet">Pet Name</option>
          <option value="teacher">Favorite Teacher</option>
          <option value="city">Birth City</option>
        </Select>
        <Input placeholder="Answer" name="answer2" onChange={handleChange} />

        <Select name="security3" onChange={handleChange}>
          <option value="">Select Question 3</option>
          <option value="pet">Pet Name</option>
          <option value="teacher">Favorite Teacher</option>
          <option value="city">Birth City</option>
        </Select>
        <Input placeholder="Answer" name="answer3" onChange={handleChange} />

        <Button colorScheme="green" width="100%" onClick={handleRegister}>
          Register
        </Button>

        <Text fontSize="sm">
          Already have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </Text>

      </VStack>
    </Box>
  );
}

export default Register;