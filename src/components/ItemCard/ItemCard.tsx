import {
  Badge,
  Box,
  Flex,
  GridItem,
  Heading,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
interface ItemCardProps {
  itemName: string;
  itemPrice: string;
  auctionTimeLeft: Date;
}

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function ItemCard({ itemName, itemPrice, auctionTimeLeft }: ItemCardProps) {
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
          <Flex alignItems='center'>
            <Heading as="h3" size="lg">
              {itemName}
            </Heading>
            <Spacer />
            {dayjs(auctionTimeLeft).fromNow().includes("ago") ? (
              <Badge  size="" variant="subtle" colorScheme="red">
                Expired
              </Badge>
            ) : (
              <Badge  size="" variant="subtle" colorScheme="teal">
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
        </Stack>
      </Box>
    </GridItem>
  );
}

export default ItemCard;
