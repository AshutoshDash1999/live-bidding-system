import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  Stack,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { db } from "../../utils/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  onSnapshot,
} from "firebase/firestore";
import ItemCard from "../../components/ItemCard/ItemCard";

function SellerDashboard() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemInfo, setItemInfo] = useState({
    itemName: "",
    itemPrice: "",
    itemDesc: "",
    auctionTimeLeft: "",
    itemPhoto: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [itemDataCollection, setItemDataCollection] = useState([]);

  const handleInput = (event: any) => {
    setItemInfo({
      ...itemInfo,
      [event.target.name]: event.target.value,
    });
  };

  async function itemPublishClickHandler(e: any) {
    e.preventDefault();
    console.log(itemInfo);
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, "itemData"), {
        itemName: itemInfo.itemName,
        itemBasePrice: itemInfo.itemPrice,
        itemDesc: itemInfo.itemDesc,
        auctionEndTime: itemInfo.auctionTimeLeft,
      });
      // console.log("Document written with ID: ", docRef.id);
      setIsLoading(false);
      toast({
        title: "Your item is online now",
        status: "success",
        duration: 2000,
        isClosable: false,
      });
    } catch (e) {
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
    const unsub = onSnapshot(querySnap, (querySnapshot) => {
      let itemDataArray: any = [];
      querySnapshot.forEach((doc) => {
        itemDataArray.push(doc.data());
      });
      setItemDataCollection(itemDataArray);
    });
    return () => unsub();
  }, []);

  console.log(itemDataCollection);
  

  return (
    <Box>
      <Navbar />
      <Box my={2} mx={6} borderRadius="md">
        <Button onClick={onOpen}>Open Modal</Button>
      </Box>

      <Box my={2} mx={6} borderRadius="md">
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          {itemDataCollection?.map((item) => (
            <ItemCard {...item}/>
          ))}
        </Grid>
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

            <FormControl isRequired marginBottom={4}>
              <FormLabel>Add Image</FormLabel>
              <Input
                pt="1"
                name="itemPhoto"
                type="file"
                accept="image/x-png,image/gif,image/jpeg"
                defaultValue={itemInfo.itemPhoto}
                onChange={handleInput}
              />
            </FormControl>

            <FormControl isRequired marginBottom={4}>
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
