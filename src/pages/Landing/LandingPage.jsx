import {
  Text,
  Button,
  VStack,
  Flex,
  HStack,
} from "@chakra-ui/react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Flex
      align="center"
      justify="center"
      bg="gray.50"
      px={4}
      py={20}
      textAlign="center"
    >

      {/* HERO SECTION */}
      <Flex
        flex="1"
        align="center"
        justify="center"
        bg="gray.50"
        textAlign="center"
        px={4}
        py={16}  
      >
        <VStack spacing={6} maxW="600px">
          
          <Text color="green.500" fontWeight="semibold">
            Smart Waste Management 
          </Text>

          <Text fontSize="5xl" fontWeight="bold" lineHeight="1.2">
            Keep Your City Clean & Organized 🍀
          </Text>

          <Text fontSize="lg" color="gray.600">
            Report waste issues, track progress, and help create a cleaner environment around you.
          </Text>

          <HStack spacing={4}>
            <Button
              colorScheme="green"
              size="lg"
              onClick={() => navigate("/login")}
            >
              Get Started
            </Button>

            <Button variant="outline" size="lg"
              onClick={() => navigate("/about")}>
              Learn more

            </Button>
          </HStack>

        </VStack>
      </Flex>


    </Flex>
  );
}

export default LandingPage;