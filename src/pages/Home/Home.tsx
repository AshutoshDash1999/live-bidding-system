import BidderHome from '../BidderHome/BidderHome';
import SellerDashboard from '../SellerDashboard/SellerDashboard';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../utils/firebaseConfig';
import { auth } from '../../utils/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateUserName,
  updateUserEmail,
  updateUserRole,
} from '../../features/user/userSlice';
import { RootState } from '../../app/store';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
function Home() {
  const [user, loading, error] = useAuthState(auth);

  const state = useSelector((state: RootState) => state.currentUserStore);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const getUserRoleQuery = async () => {
      try {
        setIsLoading(true);
        const usersDataRef = collection(db, 'userData');
        const userMailQuery = await query(
          usersDataRef,
          where('mailID', '==', user?.email)
        );
        const users = await getDocs(userMailQuery);
        users.forEach((doc) => {
          dispatch(updateUserName(doc.data().firstName));
          dispatch(updateUserEmail(doc.data().mailID));
          dispatch(updateUserRole(doc.data().role));
        });
        setIsLoading(false);
      } catch (error) {
        console.warn('Error in getUserRoleQuery in Home.tsx file: ', error);
        setIsLoading(false);
      }
    };

    if (user) getUserRoleQuery();
  }, []);

  if (isLoading) {
    return (
      <Center h='100vh' color='teal'>
        <VStack spacing='10'>
          <Text fontSize='2xl'>Loading...</Text>
          <Spinner size='xl' />
        </VStack>
      </Center>
    );
  }

  if (state.userRole === 'seller') {
    return <SellerDashboard />;
  }

  if (state.userRole === 'bidder') {
    return <BidderHome />;
  }
}

export default Home;
