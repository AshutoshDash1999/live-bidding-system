import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { db } from "../../utils/firebaseConfig";
import { collection, query, onSnapshot, doc, setDoc } from "firebase/firestore";
import ItemCard from "../../components/ItemCard/ItemCard";
import uuid from "react-uuid";
import { Link } from "react-router-dom";

function SellerDashboard() {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemInfo, setItemInfo] = useState({
    itemName: "",
    itemPrice: "",
    itemDesc: "",
    auctionTimeLeft: "",
    itemPhotoURL: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [itemDataCollection, setItemDataCollection] = useState([]);

  const photoInputHandler = (event: any) => {
    // setItemInfo({
    //   ...itemInfo,
    //   [event.target.name]: event.target.files[0],
    // });
  };

  const handleInput = (event: any) => {
    setItemInfo({
      ...itemInfo,
      [event.target.name]: event.target.value,
    });
  };


  useEffect(() => {
    try {
      cloudinaryRef.current = window.cloudinary;
      if (cloudinaryRef.current) {
        widgetRef.current = cloudinaryRef.current.createUploadWidget(
          {
            cloudName: import.meta.env.VITE_APP_CLOUDINARY_CLOUDNAME,
            uploadPreset: import.meta.env.VITE_APP_CLOUDINARY_UPLOADPRESET,
          },
          (error: any, result: any) => {
            if (result.info.url){
              console.info(result.info.url);
              itemInfo.itemPhotoURL = result.info.url
            }
            console.error(error);
          }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  async function itemPublishClickHandler(e: any) {
    e.preventDefault();
    // setIsLoading(true);

    // upload image
    const itemUniqueId = uuid().substring(0, 19).split("-").join("");
    try {
      const docRef = doc(db, "itemData", itemUniqueId);

      const itemData = {
        itemId: itemUniqueId,
        itemName: itemInfo.itemName,
        itemPrice: itemInfo.itemPrice,
        itemDesc: itemInfo.itemDesc,
        auctionTimeLeft: itemInfo.auctionTimeLeft,
        itemPhotoURL: itemInfo.itemPhotoURL,
      };

      // const docRef = await addDoc(collection(db, "itemData"), {
      //   itemId: uuid(),
      //   itemName: itemInfo.itemName,
      //   itemPrice: itemInfo.itemPrice,
      //   itemDesc: itemInfo.itemDesc,
      //   auctionTimeLeft: itemInfo.auctionTimeLeft,
      //   itemPhotoURL: itemInfo.itemPhotoURL,
      // });
      // console.log("Document written with ID: ", docRef.id);
      setDoc(docRef, itemData)
        .then((docRef) => {
          setIsLoading(false);
          toast({
            title: "Your item is online now",
            status: "success",
            duration: 2000,
            isClosable: false,
          });
        })
        .catch((error) => {
          console.log(error);
          console.error("Error adding item: ", e);
          setIsLoading(false);
          toast({
            title: "Error adding item",
            description: `${e}`,
            status: "error",
            duration: 2000,
            isClosable: false,
          });
        });
    } catch (error) {
      console.log(error);
      console.error("Error adding item: ", e);
      setIsLoading(false);
      toast({
        title: "Error adding item",
        description: `${e}`,
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }

    onClose();
  }

  useEffect(() => {
    const querySnap = query(collection(db, "itemData"));
    const getData = onSnapshot(querySnap, (querySnapshot) => {
      let itemDataArray: any = [];
      querySnapshot.forEach((doc) => {
        itemDataArray.push(doc.data());
      });
      setItemDataCollection(itemDataArray);
    });
    return () => getData();
  }, []);

  return (
    <Box>
      <Navbar />
      <Box my={2} mx={6} borderRadius="md">
        <Button onClick={onOpen} colorScheme="teal">
          Publish a new item
        </Button>
      </Box>

      <Box my={2} mx={6} borderRadius="md">
        {itemDataCollection.length ? (
          <Grid templateColumns="repeat(5, 1fr)" gap={5}>
            {itemDataCollection?.map((item: any) => (
              <Link to={`/product/${item.itemId}`} key={item.itemId}>
                <ItemCard {...item} />
              </Link>
            ))}
          </Grid>
        ) : (
          <Center h="20vh" color="teal">
            <VStack spacing="10">
              <Text fontSize="2xl">No items to show</Text>
              <Spinner size="xl" />
            </VStack>
          </Center>
        )}
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publish a new auction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired marginBottom={4}>
              <FormLabel>Item Name</FormLabel>
              <Input
                type="text"
                name="itemName"
                defaultValue={itemInfo.itemName}
                onChange={handleInput}
              />
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel>Item Base Price</FormLabel>
              <Input
                name="itemPrice"
                defaultValue={itemInfo.itemPrice}
                onChange={handleInput}
              ></Input>
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel>Item Description</FormLabel>
              <Textarea
                placeholder=""
                name="itemDesc"
                defaultValue={itemInfo.itemDesc}
                onChange={handleInput}
              />
            </FormControl>

            {/* <FormControl isRequired marginBottom={4}>
              <FormLabel>Add Image</FormLabel>
              <Input
                pt="1"
                name="itemPhoto"
                type="file"
                accept="image/x-png,image/jpeg,image/jpg"
                // defaultValue={itemInfo.itemPhoto}
                onChange={photoInputHandler}
              />
            </FormControl> */}

            <FormControl isRequired marginBottom={4}>
              <FormLabel>Add Image</FormLabel>
              <Button onClick={() => widgetRef.current.open()}>Click to Upload Item Image</Button>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Auction Ending date-time</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
                name="auctionTimeLeft"
                defaultValue={itemInfo.auctionTimeLeft}
                onChange={handleInput}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={itemPublishClickHandler}
              isLoading={isLoading}
              loadingText="Publishing..."
            >
              Publish
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default SellerDashboard;
