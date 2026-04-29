import { Flex, Box } from "@chakra-ui/react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <Flex direction="column" minH="100vh">

      <Header />

      {/* MAIN AREA ONLY */}
      <Box
        flex="1"
        bg="gray.50"
        overflowX="hidden"
      >
        {children}
      </Box>

      <Footer />

    </Flex>
  );
}

export default Layout;