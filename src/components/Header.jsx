import { Flex, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const about_us = () => {
    alert("jaldi aane wala hai ");
  };

  const contact_us = () => {
    alert("wait karo ek do din");
  };

  return (
    <Flex
      bg="green.400"
      color="white"
      p={4}
      justify="space-between"
      align="center"
    >
      {/* Left Side */}
      <Text fontSize="xl" fontWeight="bold" cursor="pointer" onClick={() => navigate("/")}>
        EcoTrack ♻️
      </Text>

      {/* Right Side */}
      <Flex gap={4}>
        <Button variant="ghost" color="white" onClick={about_us}>
          About
        </Button>

        <Button variant="ghost" color="white" onClick={contact_us}>
          Contact
        </Button>

        <Button colorScheme="blackAlpha" onClick={() => navigate("/login")}>
          Login
        </Button>

        <Button colorScheme="teal" onClick={() => navigate("/register")}>
          Register
        </Button>
      </Flex>
    </Flex>
  );
}

export default Header;