import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Heading,
  Highlight,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-evenly" height="100vh">
        <Box>
          <Heading as="h1" size="3xl" mb="2rem">
            <Highlight
              query={["Bidding", "easy"]}
              styles={{ px: "6", py: "1", rounded: "full", bg: "teal.100" }}
            >
              Bidding made Easy
            </Highlight>
          </Heading>

          <Center>
            <ButtonGroup gap="2">
              <Link to="/signup">
                <Button colorScheme="teal">Sign Up</Button>
              </Link>
              <Link to="/login">
                <Button colorScheme="teal">Log in</Button>
              </Link>
            </ButtonGroup>
          </Center>
        </Box>
      </Flex>
    </Box>
  );
}

export default LandingPage;
