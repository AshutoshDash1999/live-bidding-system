import { Box, Center, Grid, Spinner, Text, VStack } from "@chakra-ui/react";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ItemCard from "../../components/ItemCard/ItemCard";
import Navbar from "../../components/Navbar/Navbar";
import { db } from "../../utils/firebaseConfig";

function BidderHome() {
  const [itemDataCollection, setItemDataCollection] = useState([]);
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
    <div>
      <Navbar />
      
      <Box my={2} mx={6} borderRadius="md">
        {itemDataCollection.length ? (
          <Grid templateColumns="repeat(5, 1fr)" gap={5}>
            {itemDataCollection?.map((item:any) => (
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
    </div>
  );
}

export default BidderHome;
