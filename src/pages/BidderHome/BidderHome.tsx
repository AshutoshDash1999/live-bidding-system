import { Box, Center, Grid, Spinner, Text, VStack } from '@chakra-ui/react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import ItemCard from '../../components/ItemCard/ItemCard';
import Navbar from '../../components/Navbar/Navbar';
import { db } from '../../utils/firebaseConfig';
import { useCollection } from 'react-firebase-hooks/firestore';

function BidderHome() {
  const [value, loading, error] = useCollection(collection(db, 'itemData'));

  if (error) {
    return (
      <Box my={2} mx={6} borderRadius='md'>
        <strong>Error: {JSON.stringify(error)}</strong>
      </Box>
    );
  }

  if (loading) {
    return (
      <Center h='100vh' color='teal'>
        <VStack spacing='10'>
          <Text fontSize='2xl'>Loading items</Text>
          <Spinner size='xl' />
        </VStack>
      </Center>
    );
  }

  return (
    <div>
      <Navbar />
      
      <Box my={2} mx={6} borderRadius="md">
        {itemDataCollection.length ? (
          <Grid  templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          gap={8}>
            {itemDataCollection?.map((item:any) => (
              <Link to={`/product/${item.itemId}`} key={item.itemId}>
              <ItemCard {...item} />
              </Link>
            ))}
        </Grid>: ''
        )}
      </Box>
    </div>
  );
}

export default BidderHome;
