import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  PhoneIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowForwardIcon,
  AddIcon,
  AtSignIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const handleViewPassword = () => setShowPassword(!showPassword);
  return (
    <Box bg='gray.50'>
      <Flex alignItems="center" justifyContent="space-evenly" height="100vh">
        <Box boxShadow='lg' p='6' rounded='md' bg='white'>
          <Stack direction="column" spacing={3}>
            <Heading>Create your account</Heading>
            <HStack spacing="1" justify="center">
              <Text color="muted">Already have an account?</Text>
              <Link to="/login">
                <Button variant="link" colorScheme="blue">
                  Log in
                </Button>
              </Link>
            </HStack>

            <Center>
              <RadioGroup defaultValue="1">
                <Stack spacing={5} direction="row">
                  <Radio colorScheme="teal" value="1">
                    Bidder
                  </Radio>
                  <Radio colorScheme="teal" value="2">
                    Seller
                  </Radio>
                </Stack>
              </RadioGroup>
            </Center>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AtSignIcon color="gray.300" />}
              />
              <Input type="email" placeholder="Email" />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleViewPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<LockIcon color="gray.300" />}
              />
              <Input
                pr="4.5rem"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleViewPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button rightIcon={<AddIcon />} colorScheme="teal">
              Sign Up
            </Button>

            <HStack>
              <Divider />
              <Text fontSize="sm" whiteSpace="nowrap" color="muted">
                or continue with
              </Text>
              <Divider />
            </HStack>
            <Button width="full">Sign up with Google</Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Signup;
