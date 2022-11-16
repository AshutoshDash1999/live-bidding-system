import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
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
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ProductImg from "../../assets/product-img.jpg";
import { CheckIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db, rtdb } from "../../utils/firebaseConfig";
import { child, get, onValue, ref, set } from "firebase/database";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface ProductDataType {
  itemId: string;
  itemPrice: string;
  itemName: string;
  itemDesc: string;
  auctionTimeLeft: string;
}

function ProductPage() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [newBidderPrice, setNewBidderPrice] = useState("");
  const [productData, setProductData] = useState({} as ProductDataType);
  const [highestBiddedPrice, setHighestBiddedPrice] = useState("0");
  let { productID } = useParams();

  // get data from frirebase realtime
  const highestBiddedPriceHandler = () => {
    get(
      child(
        ref(rtdb),
        "product/" + `product_id_${productData!.itemId}` + "/highestBiddedPrice"
      )
    )
      .then((snapshot) => {
        if (snapshot.exists()) {
          setHighestBiddedPrice(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const priceUpdateHandler = async () => {
    if (parseInt(newBidderPrice) > parseInt(productData?.itemPrice)) {
      if (parseInt(newBidderPrice) > parseInt(highestBiddedPrice)) {
        // add data to realtime database
        try {
          const itemReferenceInRTDB = ref(
            rtdb,
            "product/" + `product_id_${productData!.itemId}`
          );
          await set(itemReferenceInRTDB, {
            highestBiddedPrice: newBidderPrice,
          });
          highestBiddedPriceHandler();
          toast({
            title: "Bidding successfull.",
            status: "success",
            duration: 2000,
            isClosable: false,
          });
        } catch (error) {
          toast({
            title: "Bidding un-successfull.",
            description: `${error}`,
            status: "error",
            duration: 2000,
            isClosable: false,
          });
        }

      } else {
        toast({
          title: "Bidding un-successfull.",
          description: "Please bid higher than highest bidded price",
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
    } else {
      toast({
        title: "Bidding un-successfull.",
        description: "Please bid higher than base price",
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, "itemData", `${productID?.toString()}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // console.log(docSnap.data());
          setProductData(docSnap.data() as ProductDataType);
        } else {
          // doc.data() will be undefined in this case
          toast({
            title: "Product not found",
            status: "error",
            duration: 2000,
            isClosable: false,
          });
        }
      } catch (error) {
        toast({
          title: "Something went wrong.",
          description: `${error}`,
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      }
      setIsLoading(false);
    };

    fetchProductData().catch((err) =>
      toast({
        title: "Couldn't fetch the data.",
        description: `${err}`,
        status: "error",
        duration: 2000,
        isClosable: false,
      })
    );
  }, [productID]);

  get(
    child(
      ref(rtdb),
      "product/" + `product_id_${productData!.itemId}` + "/highestBiddedPrice"
    )
  )
    .then((snapshot) => {
      if (snapshot.exists()) {
        setHighestBiddedPrice(snapshot.val());
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  return (
    <Box>
      <Navbar />

      {isLoading ? (
        <Center h="50vh">
          <Spinner color="teal" size="xl" />
        </Center>
      ) : (
        <>
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
              <Text color={"gray.600"}>
                Product ID: {productData!.itemId.toUpperCase()}
              </Text>

              <Heading mb={2} as="h2" size="2xl">
                {productData!.itemName}
              </Heading>
              {dayjs(productData!.auctionTimeLeft).fromNow().includes("ago") ? (
                <Alert status="error" borderRadius="md" variant="left-accent">
                  <AlertIcon />
                  <AlertTitle>Timer expired!</AlertTitle>
                  <AlertDescription>
                    Please check other auctions in our platform.
                  </AlertDescription>
                </Alert>
              ) : (
                <HStack spacing="24px">
                  <Box background="gray.200" p={4} borderRadius={"md"}>
                    <Text fontSize="lg">Auction ending in</Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      {dayjs(productData!.auctionTimeLeft).fromNow()}
                    </Text>
                  </Box>
                  <Box>
                    <Text fontSize="lg">
                      Auction Price: ₹
                      <span>{productData!.itemPrice.toLocaleString()}</span>
                    </Text>
                    <InputGroup size="lg">
                      <InputLeftElement
                        pointerEvents="none"
                        color="gray.300"
                        fontSize="1.2em"
                        children="₹"
                      />
                      <Input
                        onChange={(e) =>
                          setNewBidderPrice(e.target.value as string)
                        }
                        size="lg"
                        pr="4.5rem"
                        placeholder="Bid your price"
                      />
                      <InputRightElement width="4.5rem">
                        <Button
                          mr="0.5rem"
                          h="2rem"
                          size="lg"
                          onClick={priceUpdateHandler}
                        >
                          Bid
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </Box>
                </HStack>
              )}

              <Alert
                my="2"
                status="success"
                borderRadius="md"
                variant="left-accent"
              >
                <AlertDescription>
                  <Text fontSize="lg">
                    Last Highest Bidded Price: ₹
                    <span>{highestBiddedPrice}</span>
                  </Text>
                </AlertDescription>
              </Alert>
              <Box>
                <Heading fontSize="md">Product Features</Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.500" />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.500" />
                    Assumenda, quia temporibus eveniet a libero incidunt
                    suscipit
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
        </>
      )}
    </Box>
  );
}

export default ProductPage;
