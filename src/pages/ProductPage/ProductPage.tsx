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
import { CheckIcon, StarIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db, rtdb } from "../../utils/firebaseConfig";
import { child, get, ref, set } from "firebase/database";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import { useAuthState } from "react-firebase-hooks/auth";
import Confetti from "react-confetti";

interface ProductDataType {
  itemId: string;
  itemPrice: string;
  itemName: string;
  itemPhotoURL:string,
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
  const [windowSize, setWindowSize] = useState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth,
  });

  // get data from frirebase realtime
  const highestBiddedPriceHandler = () => {
    get(child(ref(rtdb), "product/" + `product_id_${productData!.itemId}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setHighestBidderName(snapshot.val()["accountHolderName"]);
          setHighestBiddedPrice(snapshot.val()["highestBiddedPrice"]);
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
          if (user) {
            await set(itemReferenceInRTDB, {
              accountHolderName: user.displayName,
              accountHolderEmail: user.email,
              highestBiddedPrice: newBidderPrice,
            });
          }
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
          console.log(docSnap.data());
          
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

  useEffect(() => {
    const fetchBidData = async () => {
      try {
        const snapshot = await get(
          child(ref(rtdb), "product/" + `product_id_${productData!.itemId}`)
        );
        // console.log(snapshot);
        
        if (snapshot.exists()) {
          setHighestBidderName(snapshot.val()["accountHolderName"]);
          setHighestBiddedPrice(snapshot.val()["highestBiddedPrice"]);
          setHighestBidderEmail(snapshot.val()["accountHolderEmail"]);

          console.table({
            "currentUser": currentUserEmail,
            "highestBidder":highestBidderEmail
          });
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBidData();
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize({
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

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
          <Flex py={2} px={4} m={4}>
            <Spacer />
            <Box boxSize="lg">
              <Image
                src={productData!.itemPhotoURL}
                fallbackSrc="https://via.placeholder.com/450?text=Loading+Image..."
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

              {highestBidderEmail === currentUserEmail &&
              dayjs(productData!.auctionTimeLeft).fromNow().includes("ago") ? (
                <>
                  <Confetti
                    width={windowSize.windowWidth}
                    height={windowSize.windowHeight}
                    recycle={false}
                  />
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
                        <Button colorScheme="blue">Confirm Purchase</Button>
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
                      <Text fontWeight="bold" color="green.800">
                        ₹ {highestBiddedPrice}
                      </Text>
                      <span>by</span>
                      <Text fontWeight="bold" color="green.800">
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
