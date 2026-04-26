import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Header({ role }) {
  return (
    <Flex bg="green.400" p={4} gap={4}>
      
      {/* ADMIN */}
      {role === "admin" && (
        <>
          <Button as={Link} to="/admin">Dashboard</Button>
          <Button>Request Resolver</Button>
          <Button>User Management</Button>
          <Button>Helpdesk</Button>
        </>
      )}

      {/* USER */}
      {role === "user" && (
        <>
          <Button as={Link} to="/user">Dashboard</Button>
          <Button>Locate Kachra</Button>
          <Button>Past Records</Button>
          <Button>Helpdesk</Button>
        </>
      )}

      {/* STAFF */}
      {role === "staff" && (
        <>
          <Button as={Link} to="/staff">Dashboard</Button>
          <Button>Assigned Kachra</Button>
          <Button>Past Records</Button>
          <Button>Helpdesk</Button>
        </>
      )}
      
    </Flex>
  );
}

export default Header;