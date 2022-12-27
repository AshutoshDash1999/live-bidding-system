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
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, rtdb } from "../../utils/firebaseConfig";
import { child, get, ref, set } from "firebase/database";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useAuthState } from "react-firebase-hooks/auth";

interface ProductDataType {
  itemId: string;
  itemPrice: string;
  itemName: string;
  itemPhotoURL: string;
  itemDesc: string;
  auctionTimeLeft: string;
}

function ProductPage() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [newBidderPrice, setNewBidderPrice] = useState("");
  const [productData, setProductData] = useState({} as ProductDataType);
  const [highestBiddedPrice, setHighestBiddedPrice] = useState("0");
  const { productID } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const [highestBidderName, setHighestBidderName] = useState("no one");
  const [highestBidderEmail, setHighestBidderEmail] = useState<string>("");
  const [currentUserEmail, setCurrentUserEmail] = useState<string>("");

  const priceUpdateHandler = async () => {
    if (parseInt(newBidderPrice) > parseInt(productData?.itemPrice)) {
      if (parseInt(newBidderPrice) > parseInt(highestBiddedPrice)) {
        // add data to realtime database
        try {
          const itemReferenceInRTDB = ref(
            rtdb,
            "product/" + `product_id_${productData!.itemId}`
          );
          if (user) {
            await set(itemReferenceInRTDB, {
              accountHolderName: user.displayName,
              accountHolderEmail: user.email,
              highestBiddedPrice: newBidderPrice,
            });
          }
          get(
            child(ref(rtdb), "product/" + `product_id_${productData!.itemId}`)
          )
            .then((snapshot) => {
              if (snapshot.exists()) {
                setHighestBidderName(snapshot.val()["accountHolderName"]);
                setHighestBiddedPrice(snapshot.val()["highestBiddedPrice"]);
                console.log(snapshot.val());
              } else {
                console.log("No data available");
              }
            })
            .catch((error) => {
              console.error(error);
            });
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

  useEffect(() => {
    if (user) {
      setCurrentUserEmail(user.email as string);
    }
  }, [user]);

  //get realtime data from fb
  useEffect(() => {
    try {
      const dbRef = ref(rtdb);
      get(child(dbRef, "product/" + `product_id_${productData!.itemId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            setHighestBidderName(snapshot.val()["accountHolderName"]);
            setHighestBiddedPrice(snapshot.val()["highestBiddedPrice"]);
            setHighestBidderEmail(snapshot.val()["accountHolderEmail"]);
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
      console.error(error);
    }
  }, [productData!.itemId]);

  // console.table({
  //   "currentUser": currentUserEmail,
  //   "highestBidder":highestBidderEmail
  // });

  return (
    <Box>
      <Navbar />

      {isLoading ? (
        <Center h="50vh">
          <Spinner color="teal" size="xl" />
        </Center>
      ) : (
        <>
          <Flex
            alignItems={"center"}
            justifyContent="center"
            gap={{ base: "8", md: "10" }}
            direction={{ base: "column", md: "row" }}
          >
            <Spacer />
            <Box boxSize="lg" rounded="lg" p="4">
              <Image
                rounded="lg"
                boxSize={{ base: "xs", md: "md" }}
                src={productData!.itemPhotoURL}
                objectFit="cover"
                height={"100%"}
                fallbackSrc="https://via.placeholder.com/450?text=Loading+Image..."
              />
            </Box>
            <Spacer />

            <Box  p="4">
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
                  <Box
                    background={useColorModeValue("gray.200", "whiteAlpha.100")}
                    p={4}
                    borderRadius={"md"}
                  >
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

              {highestBidderEmail === currentUserEmail &&
              dayjs(productData!.auctionTimeLeft).fromNow().includes("ago") ? (
                <>
                  <Alert
                    my="2"
                    status="info"
                    borderRadius="md"
                    variant="left-accent"
                  >
                    <AlertDescription>
                      <HStack>
                        <Text fontSize="lg">
                          Congrats!!! You have won the bid. 🥳🎉🎊
                        </Text>
                        {/* <Button colorScheme="blue">Confirm Purchase</Button> */}
                      </HStack>
                    </AlertDescription>
                  </Alert>
                </>
              ) : (
                <Alert
                  my="2"
                  status="success"
                  borderRadius="md"
                  variant="left-accent"
                >
                  <AlertDescription>
                    <HStack>
                      <Text fontSize="lg">Last highest bidded price is</Text>
                      <Text
                        fontWeight="bold"
                        color={useColorModeValue("green.800", "green.500")}
                      >
                        ₹ {highestBiddedPrice}
                      </Text>
                      <span>by</span>
                      <Text
                        fontWeight="bold"
                        color={useColorModeValue("green.800", "green.500")}
                      >
                        {highestBidderName}
                      </Text>
                    </HStack>
                  </AlertDescription>
                </Alert>
              )}
              <Box>
                <Heading fontSize="md">Product Features</Heading>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon as={CheckIcon} color="green.500" />
                    {productData!.itemDesc}
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
