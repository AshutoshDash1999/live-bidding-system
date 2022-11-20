import { DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Flex,
  GridItem,
  Heading,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
interface ItemCardProps {
  itemName: string;
  itemPrice: string;
  auctionTimeLeft: Date;
  itemId: string;
}

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { deleteDoc, doc } from "firebase/firestore";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { db } from "../../utils/firebaseConfig";
dayjs.extend(relativeTime);

function ItemCard({
  itemName,
  itemPrice,
  auctionTimeLeft,
  itemId,
}: ItemCardProps) {
  const toast = useToast();
  const initialFocusRef = useRef();
  const [userRole, setUserRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getUserRoleFromStore = async () => {
    const fetchCurrentUserRole = await useSelector(
      (state: RootState) => state.currentUserStore.userRole
    );
    setUserRole(fetchCurrentUserRole);
  };
  getUserRoleFromStore();

  // delete item by seller 
  const deleteItem = (e: any) => {
    e.preventDefault()
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
        borderColor="gray.200"
        borderRadius="md"
        my="4"
        p="4"
        shadow="md"
      >
        <Stack spacing={6}>
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
            <Button colorScheme="red" variant="ghost" leftIcon={<DeleteIcon/>} onClick={deleteItem} isLoading={isLoading} loadingText="Deleting item...">
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
