import { Flex, Text, Button } from "@chakra-ui/react";

const about_us = () => {
  alert("jaldi aane wala hai ")
}

const contact_us = () => {
  alert("wait karo ek do din")
}

function Header() {
  return (
    <Flex
      bg="green.400"
      color="white"
      p={4}
      justify="space-between"
      align="center"
    >
      {/* Left Side */}
      <Text fontSize="xl" fontWeight="bold">
        EcoTrack ♻️
      </Text>

      {/* Right Side */}
      <Flex gap={4}>
        <Button variant="ghost" color="white" onClick={about_us}>About</Button>
        <Button variant="ghost" color="white" onClick={contact_us}>Contact</Button>
        <Button colorScheme="blackAlpha">Login</Button>
        <Button colorScheme="teal">Register</Button>
      </Flex>
    </Flex>
  );
}

export default Header;