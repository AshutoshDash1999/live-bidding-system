import { useEffect, useState } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  GridItem,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { deleteDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { db } from "../../utils/firebaseConfig";
dayjs.extend(relativeTime);

interface ItemCardProps {
  itemName: string;
  itemPrice: string;
  auctionTimeLeft: Date;
  itemId: string;
  itemPhotoURL: string;
}

function ItemCard({
  itemName,
  itemPrice,
  auctionTimeLeft,
  itemId,
  itemPhotoURL,
}: ItemCardProps) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const userRole = useSelector(
    (state: RootState) => state.currentUserStore.userRole
  );

  // delete item by seller
  const deleteItem = (e: any) => {
    e.preventDefault();
    const docRef = doc(db, "itemData", itemId);
    try {
      // setIsLoading(true);
      deleteDoc(docRef)
        .then(() => {
          console.log("Entire Document has been deleted successfully.");
          toast({
            title: "Item Deleted!",
            description: "Item has been deleted successfully.",
            status: "success",
            duration: 2000,
            isClosable: false,
          });
        })
        .catch((error) => {
          toast({
            title: "Error deleting the document!",
            description: `${error}`,
            status: "error",
            duration: 2000,
            isClosable: false,
          });
        });
    } catch (error) {
      toast({
        title: "Error deleting the document!",
        description: `${error}`,
        status: "error",
        duration: 2000,
        isClosable: false,
      });
    }
  };

  return (
    <GridItem w="100%">
      <Box
        borderWidth="1px"
        borderColor={useColorModeValue("gray.200", "whiteAlpha.50")}
        borderRadius="lg"
        my="4"
        p="4"
        shadow="md"
        _hover={{
          shadow: "lg",
        }}
        height="100%"
        bg={useColorModeValue("gray.200", "whiteAlpha.50")}
      >
        <Stack spacing={6}>
          <Center>
            <Image
              objectFit="cover"
              src={itemPhotoURL}
              alt={itemName}
              boxSize="250px"
              rounded="lg"
            />
          </Center>
          <Flex alignItems="center">
            <Heading as="h3" size="lg">
              {itemName}
            </Heading>
            <Spacer />
            {dayjs(auctionTimeLeft).fromNow().includes("ago") ? (
              <Badge size="" variant="subtle" colorScheme="red">
                Expired
              </Badge>
            ) : (
              <Badge size="" variant="subtle" colorScheme="teal">
                Live
              </Badge>
            )}
          </Flex>
          <Text fontSize="lg">₹{itemPrice}</Text>
          {dayjs(auctionTimeLeft).fromNow().includes("ago") ? (
            <Text fontSize="sm">
              Auction ended {dayjs(auctionTimeLeft).fromNow()}
            </Text>
          ) : (
            <Text fontSize="sm">
              Auction ending in {dayjs(auctionTimeLeft).fromNow()}
            </Text>
          )}

          {userRole === "seller" ? (
            <Button
              colorScheme="red"
              variant="ghost"
              leftIcon={<DeleteIcon />}
              onClick={deleteItem}
              isLoading={isLoading}
              loadingText="Deleting item..."
            >
              Delete Item
            </Button>
          ) : (
            ""
          )}
        </Stack>
      </Box>
    </GridItem>
  );
}

export default ItemCard;
