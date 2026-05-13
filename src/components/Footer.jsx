import { Box, Text, Flex, Link, VStack, HStack } from "@chakra-ui/react";

function Footer() {
  return (
    <Box bg="green.400" color="white" py={4} px={6}>

      <Flex
        maxW="1100px"
        mx="auto"
        justify="space-between"
        align="flex-start"
        wrap="wrap"
        gap={6}
      >

        {/* LEFT */}
        <VStack align="start" spacing={1} maxW="350px">
          <Text fontSize="lg" fontWeight="bold">
            EcoTrack ♻️
          </Text>

          <Text fontSize="sm" opacity={0.9}>
            A smart waste management platform to report, track and resolve
            garbage issues efficiently for cleaner and greener cities.
          </Text>
        </VStack>

        {/* RIGHT */}
        <VStack align="start" spacing={2}>
          <Text fontSize="sm" fontWeight="semibold">
            Contact ☎️📞
          </Text>

          <Text fontSize="sm">
            📧 mr.rajat.29@gmail.com
          </Text>

          <HStack spacing={4}>
            <Link
              href="https://linkedin.com/in/rajat-kashyap-885a5832a"
              isExternal
              fontSize="sm"
              _hover={{ textDecoration: "underline" }}
            >
              LinkedIn
            </Link>

            <Link
              href="https://github.com/Rajatkashyap29"
              isExternal
              fontSize="sm"
              _hover={{ textDecoration: "underline" }}
            >
              GitHub
            </Link>
          </HStack>
        </VStack>

      </Flex>

      {/*  BOTTOM TAGLINE */}
      <Text
        textAlign="center"
        mt={4}
        fontSize="sm"
        opacity={0.85}
      >
        © 2026 EcoTrack • Building a Smarter & Cleaner Tomorrow 🌱
      </Text>

    </Box>
  );
}

export default Footer;