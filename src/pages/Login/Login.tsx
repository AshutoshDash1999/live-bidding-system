import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import {
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowForwardIcon,
  AtSignIcon,
} from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

function Login() {
  const toast = useToast();
  const [user, loading, error] = useAuthState(auth);
  const [userSignInInfo, setUserSignInInfo] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // theme
  const bg = useColorModeValue('gray.50', 'gray.900');
  const form = useColorModeValue('gray.50', 'gray.800');

  const handleViewPassword = () => setShowPassword(!showPassword);

  const handleInput = (event: any) => {
    setUserSignInInfo({
      ...userSignInInfo,
      [event.target.name]: event.target.value,
    });
  };

  const loginUserUsingCred = (event: any) => {
    event.preventDefault();
    signInWithEmailAndPassword(
      auth,
      userSignInInfo.email,
      userSignInInfo.password
    )
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        toast({
          title: 'Login successfull.',
          status: 'success',
          duration: 3000,
          isClosable: false,
        });
        navigate('/home');

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  const gProvider = new GoogleAuthProvider();

  const googleSignin = (event: any) => {
    event.preventDefault();
    signInWithPopup(auth, gProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential !== null) {
          const token = credential.accessToken;
        }
        toast({
          title: `Login for ${result.user.email} is successfull.`,
          // description: "We've created your account for you.",
          status: 'success',
          duration: 2000,
          isClosable: false,
        });
        navigate('/home');
        // The signed-in user info.
        // const user = result.user;
        // ...
      })
      .catch((error) => {
        toast({
          title: error.message,
          description: error.code,
          status: 'error',
          duration: 2000,
          isClosable: false,
        });
      });
  };

  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <Center height='100vh'>
        <Spinner color='green.200' />
      </Center>
    );
  }

  return (
    <Box bg={bg}>
      <Flex alignItems='center' justifyContent='space-evenly' height='100vh'>
        <Box boxShadow='lg' p='6' rounded='md' bg={form}>
          <Stack direction='column' spacing={3}>
            <Heading>Log in to your account</Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>Don't have an account?</Text>
              <Link to='/signup'>
                <Button variant='link' colorScheme='blue'>
                  Sign up
                </Button>
              </Link>
            </HStack>

            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<AtSignIcon color='gray.300' />}
              />
              <Input
                type='email'
                placeholder='Email'
                name='email'
                defaultValue={userSignInInfo.email}
                onChange={handleInput}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<LockIcon color='gray.300' />}
              />
              <Input
                pr='4.5rem'
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter password'
                defaultValue={userSignInInfo.password}
                onChange={handleInput}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleViewPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme='teal'
              onClick={loginUserUsingCred}
            >
              Log In
            </Button>

            <HStack>
              <Divider />
              <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                or continue with
              </Text>
              <Divider />
            </HStack>
            <Button width='full' onClick={googleSignin}>
              Sign in with Google
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Login;
