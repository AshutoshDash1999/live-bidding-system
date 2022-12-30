import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  doc,
  setDoc,
} from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import uuid from "react-uuid";
import { RootState } from "../../app/store";
import { db } from "../../utils/firebaseConfig";

function PublishItem() {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemInfo, setItemInfo] = useState({
    itemName: "",
    itemPrice: "",
    itemDesc: "",
    auctionTimeLeft: "",
    itemPhotoURL: "",
  });

  const sellerFirstName = useSelector(
    (state: RootState) => state.currentUserStore.userFirstName
  );
  const sellerLastName = useSelector(
    (state: RootState) => state.currentUserStore.userLastName
  );
  
  // upload image to cloudinary and get upload url
  cloudinaryRef.current = window.cloudinary;
  let cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: import.meta.env.VITE_APP_CLOUDINARY_CLOUDNAME,
      uploadPreset: import.meta.env.VITE_APP_CLOUDINARY_UPLOADPRESET,
    },
    (error: any, result: any) => {
      if (!error && result && result.event === "success") {
        // console.log("Done! Here is the image info: ", result.info);
        setItemInfo({
          ...itemInfo,
          itemPhotoURL: result.info.secure_url,
        });
      }
    }
  );

  const handleInput = (event: any) => {
    setItemInfo({
      ...itemInfo,
      [event.target.name]: event.target.value,
    });
  };

  async function itemPublishClickHandler(e: any) {
    e.preventDefault();
    // setIsLoading(true);

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
        itemPublisher: sellerFirstName + " "+sellerLastName,
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

  return (
    <div>
      <Box my={2} mx={6} borderRadius="md">
        <Button onClick={onOpen} colorScheme="teal">
          Publish a new item
        </Button>
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publish a new auction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired marginBottom={4}>
              <FormLabel>Add Item Image</FormLabel>
              <Button onClick={() => cloudinaryWidget.open()}>
                Click to Upload Item Image
              </Button>
            </FormControl>

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
    </div>
  );
}
export default PublishItem;
