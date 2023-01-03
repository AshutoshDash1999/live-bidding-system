import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import { signOut } from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Logout from './Logout';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const NavItems = [
  {
    navItem: 'Home',
    href: '/home',
    icon: '',
  },
];

function Navbar() {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, loading, error] = useAuthState(auth);
  const showUserName = useSelector(
    (state: RootState) => state.currentUserStore.userName
  );
  const [showUserPhoto, setUserPhoto] = useState<string>('');

  useEffect(() => {
    if (user) {
      user.photoURL && setUserPhoto(user.photoURL as string);
    }
  }, [user]);

  const navbarBg = useColorModeValue('gray.200', 'whiteAlpha.50');

  return (
    <Box my={2} mx={6} bg={navbarBg} borderRadius='md'>
      <Flex py={2} px={4}>
        <HStack spacing='24px'>
          <Link to='/home'>
            <Button colorScheme='teal' variant='ghost'>
              Home
            </Button>
          </Link>
        </HStack>
        <Spacer />
        <HStack spacing='24px'>
          <Button colorScheme='teal' variant='ghost'>
            Welcome, {showUserName}{' '}
            {showUserPhoto && (
              <Avatar
                name={showUserName}
                ml='3'
                size='sm'
                src={showUserPhoto}
              />
            )}
          </Button>
          <ThemeSwitcher />
          <Logout />
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
