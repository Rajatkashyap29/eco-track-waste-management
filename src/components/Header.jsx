import {
  Flex,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <Flex
      bg="green.400"
      color="white"
      p={4}
      justify="space-between"
      align="center"
    >
      {/* LOGO */}
      <Text
        fontSize="xl"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => navigate("/")}
      >
        EcoTrack ♻️
      </Text>

      {/* RIGHT SIDE */}
      <Flex gap={4} align="center">

        {/* ❌ NOT LOGGED IN */}
        {!role && (
          <>
            <Button variant="ghost" color="white">About</Button>
            <Button variant="ghost" color="white">Contact</Button>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button colorScheme="teal" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}

        {/* ✅ LOGGED IN */}
        {role && (
          <>
            <Button variant="ghost" color="white" onClick={() => navigate("/user")}>
              Dashboard
            </Button>

            <Button variant="ghost" color="white">
              Report Waste
            </Button>

            <Button variant="ghost" color="white">
              My Complaints
            </Button>

            <Button variant="ghost" color="white">
              Helpdesk
            </Button>

            <Button variant="ghost" color="white">
              About Us
            </Button>

            {/* 🔥 PROFILE DROPDOWN */}
            {/* 🔥 PROFILE DROPDOWN */}
<Menu>
  <MenuButton
    as={Button}
    variant="ghost"     // ✅ same as others
    color="white"
  >
    Profile
  </MenuButton>

  <MenuList
    bg="white"
    color="black"
    borderRadius="md"
    boxShadow="lg"
  >
    <MenuItem
      _hover={{ bg: "gray.100" }}
      onClick={() => navigate("/profile")}
    >
      My Profile
    </MenuItem>

    <MenuItem
      _hover={{ bg: "red.100", color: "red.600" }}
      onClick={logout}
    >
      Logout
    </MenuItem>
  </MenuList>
</Menu>
          </>
        )}

      </Flex>
    </Flex>
  );
}

export default Header;