import {
  Box,
  Text,
  VStack,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";

import { CheckCircleIcon } from "@chakra-ui/icons";

function About() {
  return (
    <Box bg="gray.50" py={10} px={4}>

      <Box maxW="1000px" mx="auto">

        {/* 🔥 HEADER */}
        <VStack spacing={3} mb={10} textAlign="center">
          <Text fontSize="3xl" fontWeight="bold">
            About EcoTrack ♻️
          </Text>

          <Text color="gray.600" maxW="700px">
            EcoTrack is a smart waste management platform designed to keep
            our surroundings clean and healthy. It’s our small contribution
            towards building a greener and better environment.
          </Text>
        </VStack>

        {/* 🔥 WHAT WE DO */}
        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" mb={8}>
          <Text fontSize="xl" fontWeight="bold" mb={3}>
            🌱 What We Do
          </Text>

          <Text color="gray.600">
            We provide an end-to-end solution for reporting and resolving
            garbage-related issues. Whenever a user raises a concern,
            we take responsibility to ensure that the issue gets resolved
            efficiently and quickly.
          </Text>
        </Box>

        {/*  USER STEPS */}
        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm" mb={8}>
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            📌 How You Can Help
          </Text>

          <VStack align="start" spacing={3}>
            <Text>1. Click clear photos (exactly 3) of the garbage you see.</Text>
            <Text>2. Login/Register on our platform.</Text>
            <Text>3. Raise a complaint by filling out a simple form.</Text>
            <Text>4. Track the progress and earn reward points after resolution.</Text>
          </VStack>
        </Box>

        {/*  OUR PROCESS */}
        <Box bg="white" p={6} borderRadius="xl" boxShadow="sm">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            ⚙️ What Happens After You Raise a Request
          </Text>

          <SimpleGrid columns={[1, 3]} spacing={5}>

            <Box textAlign="center">
              <Icon as={CheckCircleIcon} color="green.400" boxSize={6} mb={2} />
              <Text fontWeight="semibold">Staff Assigned</Text>
              <Text fontSize="sm" color="gray.600">
                A responsible staff member is assigned to your request.
              </Text>
            </Box>

            <Box textAlign="center">
              <Icon as={CheckCircleIcon} color="green.400" boxSize={6} mb={2} />
              <Text fontWeight="semibold">Cleaning Process</Text>
              <Text fontSize="sm" color="gray.600">
                The staff visits the location and cleans the area.
              </Text>
            </Box>

            <Box textAlign="center">
              <Icon as={CheckCircleIcon} color="green.400" boxSize={6} mb={2} />
              <Text fontWeight="semibold">Status Updated</Text>
              <Text fontSize="sm" color="gray.600">
                Your complaint is marked completed after the task is done.
              </Text>
            </Box>

          </SimpleGrid>
        </Box>

      </Box>
    </Box>
  );
}

export default About;