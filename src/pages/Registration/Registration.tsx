import { AtSignIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
} from "@chakra-ui/react";
import React from "react";

function Registration() {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="center" height="100vh">
        <Box width="30%">
          <Stack spacing={3}>
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input placeholder="Jane" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input placeholder="Doe" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<PhoneIcon color="gray.300" />}
                />
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mail Id</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AtSignIcon color="gray.300" />}
                />
                <Input type="tel" placeholder="Phone number" />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Bank Account Number</FormLabel>
              <Input placeholder="xxx-xxx-xxx-xxx" />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Yearly Income</FormLabel>
              <Input placeholder="18" />
            </FormControl>
            <Flex alignItems="center" justifyContent="space-between">
              <Button width="10rem" colorScheme="blue">Reset</Button>
              <Button width="10rem">Save</Button>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Registration;
