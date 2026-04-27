import {
  Box,
  Text,
  Button,
  VStack,
  Flex,
  HStack,
  useDisclosure,
  Input,
} from "@chakra-ui/react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

function LandingPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  // 🔐 LOGIN LOGIC
  const handleLogin = () => {
    if (email === "admin@gmail.com" && password === "123") {
      toast({ title: "Admin Login Success", status: "success" });
      navigate("/admin");
    } 
    else if (email === "user@gmail.com" && password === "123") {
      toast({ title: "User Login Success", status: "success" });
      navigate("/user");
    } 
    else if (email === "staff@gmail.com" && password === "123") {
      toast({ title: "Staff Login Success", status: "success" });
      navigate("/staff");
    } 
    else {
      toast({ title: "Invalid Credentials", status: "error" });
    }
  };

  // 🔁 NAVIGATION
  const goToRegister = () => {
    onClose();
    navigate("/register");
  };

  const goToForgot = () => {
    onClose();
    navigate("/forgot-password");
  };

  return (
    <Flex direction="column" minH="100vh">

      {/* HEADER */}
      <Header />

      {/* HERO SECTION */}
      <Flex
        flex="1"
        align="center"
        justify="center"
        bg="gray.50"
        textAlign="center"
        px={4}
      >
        <VStack spacing={6} maxW="600px">
          
          <Text color="green.500" fontWeight="semibold">
            Smart Waste Management
          </Text>

          <Text fontSize="5xl" fontWeight="bold" lineHeight="1.2">
            Keep Your City Clean & Organized
          </Text>

          <Text fontSize="lg" color="gray.600">
            Report waste issues, track progress, and help create a cleaner environment around you.
          </Text>

          <HStack spacing={4}>
            <Button colorScheme="green" size="lg" onClick={onOpen}>
              Get Started
            </Button>

            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </HStack>

        </VStack>
      </Flex>

      {/* LOGIN MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent p={5} borderRadius="xl">

          <ModalHeader textAlign="center">Login</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <VStack spacing={5}>

              <Input 
                placeholder="Enter Email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Input 
                placeholder="Enter Password"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button 
                colorScheme="green" 
                width="100%" 
                size="lg"
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
          </ModalBody>

        </ModalContent>
      </Modal>

      {/* FOOTER */}
      <Footer />

    </Flex>
  );
}

export default LandingPage;