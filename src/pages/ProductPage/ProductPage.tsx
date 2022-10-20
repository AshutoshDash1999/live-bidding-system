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
  List,
  ListIcon,
  ListItem,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductImg from "../../assets/product-img.jpg";
import { CheckIcon } from "@chakra-ui/icons";

function ProductPage() {
  const toast = useToast();
  const sellerPrice = 120000;
  const [bidderPrice, setBidderPrice] = useState("");
  const [newBidderPrice, setNewBidderPrice] = useState("");
  const [lastBiddedPrice, setLastBiddedPrice] = useState("")
  const priceUpdateHandler = () => {
    setLastBiddedPrice(bidderPrice)
    console.log(parseInt(newBidderPrice), parseInt(lastBiddedPrice));
    
    // if (parseInt(newBidderPrice) > parseInt(lastBiddedPrice)) {
    //   toast({
    //     title: "Bidding Price updated.",
    //     status: "success",
    //     duration: 2000,
    //     isClosable: false,
    //   });
    // } else {
    //   toast({
    //     title: "Price Bidding error.",
    //     description: "Please bid with price greater than previous price",
    //     status: "error",
    //     duration: 2000,
    //     isClosable: false,
    //   });
    // }
    // if (parseInt(newBidderPrice) > sellerPrice){
    //   setBidderPrice(newBidderPrice as string);
    //   toast({
    //     title: 'Bidding Price updated.',
    //     status: 'success',
    //     duration: 2000,
    //     isClosable: false,
    //   })
    // } else {
    //   toast({
    //     title: 'Price Bidding error.',
    //     description: "Please bid with price greater than seller's price",
    //     status: 'error',
    //     duration: 2000,
    //     isClosable: false,
    //   })
    // }
  };
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
                Auction Price: ₹
                <span>{sellerPrice.toLocaleString("en-IN")}</span>
              </Text>
              <InputGroup size="lg">
                <InputLeftElement
                  pointerEvents="none"
                  color="gray.300"
                  fontSize="1.2em"
                  children="₹"
                />
                <Input
                  onChange={(e) => setNewBidderPrice(e.target.value as string)}
                  size="lg"
                  pr="4.5rem"
                  placeholder="Bid your price"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="md" onClick={priceUpdateHandler}>
                    Bid
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Box>
          </HStack>
          <Box
            p={4}
            my={4}
            background={"green.100"}
            borderRadius={"lg"}
            borderBottom="8px"
            borderColor={"green.400"}
          >
            <Text fontSize="lg">
              Your last bidded Price: ₹
              <span>{bidderPrice.toLocaleString()}</span>
            </Text>
          </Box>
          <Box>
            <Heading fontSize="md">Product Features</Heading>
            <List spacing={3}>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Assumenda, quia temporibus eveniet a libero incidunt suscipit
              </ListItem>
              <ListItem>
                <ListIcon as={CheckIcon} color="green.500" />
                Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
              </ListItem>
              {/* You can also use custom icons from react-icons */}
            </List>
          </Box>
        </Box>
        <Spacer />
      </Flex>
    </Box>
  );
}

export default ProductPage;
