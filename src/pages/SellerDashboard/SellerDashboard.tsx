import { Box, Center, Grid, Spinner, Text, VStack } from '@chakra-ui/react';
import Navbar from '../../components/Navbar/Navbar';
import { db } from '../../utils/firebaseConfig';
import { collection, query, onSnapshot, doc, setDoc } from 'firebase/firestore';
import ItemCard from '../../components/ItemCard/ItemCard';
import { Link } from 'react-router-dom';
import PublishItem from '../../components/PublishItem/PublishItem';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

function SellerDashboard() {
  const userName = useSelector(
    (state: RootState) => state.currentUserStore.userName
  );
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
          <Text fontSize='2xl'>Loading...</Text>
          <Spinner size='xl' />
        </VStack>
      </Center>
    );
  }

  return (
    <Box>
      <Navbar />
      <PublishItem />
      <Box my={2} mx={6} borderRadius='md'>
        {value?.docs.length && value ? (
          <Grid
            templateColumns={{
              base: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)',
              xl: 'repeat(4, 1fr)',
            }}
            gap={8}
          >
            {value?.docs
              .filter((doc) => doc.data().itemPublisher === userName)
              .map((doc: any) => (
                <Link to={`/product/${doc.id}`} key={doc.id}>
                  <ItemCard {...doc.data()} />
                </Link>
              ))}
          </Grid>
        ) : (
          ''
        )}
      </Box>
    </Box>
  );
}

export default SellerDashboard;
