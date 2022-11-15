import { Box, GridItem, Heading, Stack, Text } from "@chakra-ui/react";
interface ItemCardProps {
  itemName:string;
  itemPrice:string;
  auctionTimeLeft:Date;
}
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

function ItemCard({itemName, itemPrice, auctionTimeLeft}: ItemCardProps) {
  
  return (
    <GridItem w='100%'>
    <Box borderWidth="1px" borderColor='gray.200' borderRadius="md" my="4" p="4" shadow='md'>
      <Stack spacing={6}>
        <Heading as="h3" size="lg">
          {itemName}
        </Heading>
        <Text fontSize="lg">{itemPrice}</Text>
        <Text fontSize="sm">{dayjs(auctionTimeLeft).fromNow()}</Text>
      </Stack>
    </Box>
    </GridItem>
  );
}

export default ItemCard;
