import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductImg from "../../assets/product-img.jpg";

function ProductPage() {
  return (
    <Box>
      <Navbar />
      <Flex py={2} px={4} m={4}>
        <Spacer />
        <Box boxSize="lg">
          <Image
            src={ProductImg}
            fallbackSrc="https://via.placeholder.com/150"
          />
        </Box>
        <Spacer />
        <Box>
          <Heading mb={2} as="h2" size="2xl">
            Mac Computer
          </Heading>
          <HStack spacing="24px">
            <Box background="gray.200" p={4} borderRadius={"md"}>
              <Text fontSize="2xl">Time</Text>
              <Text fontSize="lg">Time Left</Text>
            </Box>
            <Box>
              <Text fontSize="lg">
                Auction Price: ₹<span>45678</span>
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="₹"
                />
                <Input size="lg" pr="4.5rem" placeholder="Bid your price" />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="md">
                    Bid
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </HStack>
          <Box p={4} my={4} background={"green.100"} borderRadius={"lg"} borderBottom='8px' borderColor={"green.400"}>
          <Text fontSize="lg">
                Your last bidded Price: ₹<span>45678</span>
              </Text>
          </Box>
        </Box>
        <Spacer />
      </Flex>
    </Box>
  );
}

export default ProductPage;
