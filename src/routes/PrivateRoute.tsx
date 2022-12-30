import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebaseConfig';

const PrivateRoute = () => {
  const [user, loading, error] = useAuthState(auth);

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

  return user ? <Outlet /> : <Navigate to='/login' />;
};
export default PrivateRoute;
