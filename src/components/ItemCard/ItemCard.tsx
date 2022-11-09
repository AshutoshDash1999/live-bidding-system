import { Box, GridItem, Heading, Stack, Text } from "@chakra-ui/react";
interface ItemCardProps {
  itemName:string;
  itemPrice:string;
  auctionTimeLeft:Date;
}


function ItemCard({itemName, itemPrice, auctionTimeLeft}: ItemCardProps) {
  console.log(itemPrice);
  
  return (
    <GridItem w='100%' h='10'>
    <Box borderWidth="1px" borderColor='gray.200' borderRadius="md" my="4" p="4" shadow='md'>
      <Stack spacing={6}>
        <Heading as="h3" size="lg">
          {itemName}
        </Heading>
        <Text fontSize="lg">{itemPrice}</Text>
        <Text fontSize="sm">{auctionTimeLeft.toDateString()}</Text>
      </Stack>
    </Box>
    </GridItem>
  );
}

export default ItemCard;
