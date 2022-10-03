import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import {
  PhoneIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowForwardIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Login() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-evenly" height="100vh">
        <Stack direction="column" spacing={3}>
          <Heading >
            Log in to your account
          </Heading>
          <HStack spacing="1" justify="center">
            <Text color="muted">Don't have an account?</Text>
            <Link to="/signup">
            <Button variant="link" colorScheme="blue">
              Sign up
            </Button>
            </Link>
          </HStack>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<PhoneIcon color="gray.300" />}
            />
            <Input type="email" placeholder="Phone number" />
          </InputGroup>

          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<LockIcon color="gray.300" />}
            />
            <Input
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal">
            Call us
          </Button>

          <HStack>
            <Divider />
            <Text fontSize="sm" whiteSpace="nowrap" color="muted">
              or continue with
            </Text>
            <Divider />
          </HStack>
          <Button width="full">Sign in with Google</Button>
        </Stack>
      </Flex>
    </Box>
  );
}

export default Login;
