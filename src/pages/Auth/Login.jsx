import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  useToast,
  IconButton,
} from "@chakra-ui/react";

import { CloseIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "123") {
      toast({ title: "Admin Login Success", status: "success" });
      localStorage.setItem("role", "admin");
      navigate("/admin");
    } 
    else if (email === "user@gmail.com" && password === "123") {
      toast({ title: "User Login Success", status: "success" });
      localStorage.setItem("role", "user");
      navigate("/user");
    } 
    else if (email === "staff@gmail.com" && password === "123") {
      toast({ title: "Staff Login Success", status: "success" });
      localStorage.setItem("role", "staff");
      navigate("/staff");
    } 
    else {
      toast({ title: "Invalid Credentials", status: "error" });
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  const goToForgot = () => {
    navigate("/forgot-password");
  };

  return (
  <Box
    minH="80vh"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg="gray.50"
    px={4}
  >
    <Box
      bg="white"
      p={8}
      borderRadius="xl"
      boxShadow="lg"
      width="100%"
      maxW="500px"   
      position="relative"
    >

      {/* ❌ CLOSE */}
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
          Login
        </Text>

        <Input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Enter Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          colorScheme="green"
          width="100%"
          onClick={handleLogin}
        >
          Login
        </Button>

        <Text
          fontSize="sm"
          color="blue.500"
          cursor="pointer"
          onClick={goToForgot}
        >
          Forgot Password?
        </Text>

        <Text fontSize="sm">
          Don't have an account?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={goToRegister}
          >
            Register
          </span>
        </Text>

      </VStack>

    </Box>
  </Box>
);
}

export default Login;