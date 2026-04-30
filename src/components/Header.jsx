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
      px={6}
      py={3}
      justify="space-between"
      align="center"
    >
      {/* LOGO */}
      <Text
        fontSize="lg"
        fontWeight="bold"
        cursor="pointer"
        onClick={() => navigate("/")}
      >
        EcoTrack ♻️
      </Text>

      {/* NAV */}
      <Flex gap={5} align="center">

        {/* ❌ NOT LOGGED IN */}
        {!role && (
          <>
            <Button variant="ghost" color="white">About</Button>
            <Button variant="ghost" color="white" onClick={() => navigate("/help")}>
              Helpdesk
            </Button>
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button colorScheme="teal" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}

        {/* 🟢 USER */}
        {role === "user" && (
          <>
            <Button variant="ghost" color="white" onClick={() => navigate("/user")}>
              Dashboard
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/report-waste")}>
              Report Waste
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/complaints")}>
              My Complaints
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/help")}>
              Helpdesk
            </Button>

            <Button variant="ghost" color="white">
              About Us
            </Button>
          </>
        )}

        {/* 🔴 ADMIN */}
        {role === "admin" && (
          <>
            <Button variant="ghost" color="white" onClick={() => navigate("/admin")}>
              Dashboard
            </Button>

            <Button variant="ghost" color="white">
              Users
            </Button>

            <Button variant="ghost" color="white">
              Staff
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/request")}>
              Cleaning Requests
            </Button>

            <Button variant="ghost" color="white">
              Complaints
            </Button>

            <Button variant="ghost" color="white">
              About Us
            </Button>
          </>
        )}

        {/* 🔵 STAFF */}
        {role === "staff" && (
          <>
            <Button variant="ghost" color="white" onClick={() => navigate("/staff")}>
              Dashboard
            </Button>

            <Button variant="ghost" color="white">
              Assigned Tasks
            </Button>

            <Button variant="ghost" color="white">
              Update Status
            </Button>

            <Button variant="ghost" color="white">
              Helpdesk
            </Button>
          </>
        )}

        {/* 🔥 PROFILE (COMMON) */}
        {role && (
          <Menu>
            <MenuButton as={Button} variant="ghost" color="white">
              Profile
            </MenuButton>

            <MenuList bg="white" color="black">
              <MenuItem onClick={() => navigate("/profile")}>
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
        )}

      </Flex>
    </Flex>
  );
}

export default Header;