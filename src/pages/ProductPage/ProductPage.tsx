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
  const [newBidderPrice, setNewBidderPrice] = useState("")
  const [prevBiddedPrice, setPrevBiddedPrice] = useState(0)
  
  const priceUpdateHandler = () => {
    if (parseInt(newBidderPrice)>sellerPrice){
      if (parseInt(newBidderPrice)> prevBiddedPrice){
        toast({
          title: "Bidding successfull.",
          status: "success",
          duration: 2000,
          isClosable: false,
        });
        setPrevBiddedPrice(parseInt(newBidderPrice))
      } else {
        toast({
          title: "Bidding un-successfull.",
          description:"Please bid higher than your last bidded price",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
    } else {
      toast({
        title: "Bidding un-successfull.",
        description:"Please bid higher than base price",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
      
    }
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
                  <Button mr="0.5rem" h="2rem" size="lg" onClick={priceUpdateHandler}>
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
            <Text fontSize="lg" >
              Your last bidded Price: ₹
              <span>{prevBiddedPrice.toLocaleString()}</span>
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
