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
      <Flex gap={4} align="center">

        {/* ❌ NOT LOGGED IN */}
        {!role && (
          <>
            <Button variant="ghost" color="white" onClick={() => navigate("/about")}>
              About
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/help")}>
              Helpdesk
            </Button>

            <Button colorScheme="whiteAlpha" onClick={() => navigate("/login")}>
              Login
            </Button>

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
          </>
        )}

        {/* 🔴 ADMIN */}
        {role === "admin" && (
          <>
            <Button variant="ghost" color="white" onClick={() => navigate("/admin")}>
              Dashboard
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/user-list")}>
              Users
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/staff-list")}>
              Staff
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/request")}>
              Cleaning Requests
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/admin/complaints")}>
              Complaints
            </Button>
          </>
        )}

        {/* 🔵 STAFF */}
        {role === "staff" && (
          <>
            <Button variant="ghost" color="white" onClick={() => navigate("/staff")}>
              Dashboard
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/staff/tasks")}>
              My Tasks
            </Button>

            <Button variant="ghost" color="white" onClick={() => navigate("/help")}>
              Helpdesk
            </Button>
          </>
        )}

        {/* COMMON */}
        <Button variant="ghost" color="white" onClick={() => navigate("/about")}>
          About
        </Button>

        {role && (
          <Menu>
            <MenuButton as={Button} variant="ghost" color="white">
              Profile
            </MenuButton>

            <MenuList
              bg="white"
              color="gray.800"     // ✅ FIX: readable text
              borderRadius="md"
              boxShadow="lg"
              minW="150px"
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
        )}
      </Flex>
    </Flex>
  );
}

export default Header;