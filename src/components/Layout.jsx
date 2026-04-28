import { Flex, Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <Flex direction="column" minH="100vh">
      <Header />

      {/* MAIN CONTENT */}
      <Flex flex="1" justify="center" align="center" bg="gray.50" px={4}>
        <Box width="100%" maxW="500px">
          {children}
        </Box>
      </Flex>

      <Footer />
    </Flex>
  );
}

export default Layout;