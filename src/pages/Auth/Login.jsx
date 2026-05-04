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
import API from "../../api/axios";
 
function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  const handleLogin = async () => {


    if (!email || !password) {
      toast({ title: "All fields required", status: "error" });
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      // 🔥 SAVE DATA
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      toast({ title: "Login Successful", status: "success" });

      // 🔀 REDIRECT
      if (res.data.role === "admin") navigate("/admin");
      else if (res.data.role === "staff") navigate("/staff");
      else navigate("/user");

    } catch (err) {
      toast({
        title: err.response?.data?.msg || "Login failed",
        status: "error",
      });
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