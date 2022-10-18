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
  Radio,
  RadioGroup,
  Spinner,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  PhoneIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
  ArrowForwardIcon,
  AddIcon,
  AtSignIcon,
} from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../utils/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

function Signup() {
  const toast = useToast();
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [userSignUpInfo, setUserSignUpInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  // color theme
  const bg = useColorModeValue('gray.50', 'gray.900');
  const form = useColorModeValue('gray.50', 'gray.800');
  const handleViewPassword = () => setShowPassword(!showPassword);

  const handleInput = (event: any) => {
    setUserSignUpInfo({
      ...userSignUpInfo,
      [event.target.name]: event.target.value,
    });
  };

  const createNewUserUsingCred = (event: any) => {
    event.preventDefault();
    if (userSignUpInfo.password === userSignUpInfo.confirmPassword) {
      createUserWithEmailAndPassword(
        auth,
        userSignUpInfo.email,
        userSignUpInfo.password
      )
        .then((response) => {
          toast({
            title: 'Account created successfully.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/newUserRegistration');
          // console.log(response);
        })
        .catch((error) => {
          toast({
            title: error.message,
            description: error.code,
            status: 'error',
            duration: 3000,
            isClosable: false,
          });
        });
    } else {
    }
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
          title: 'Account created successfully.',
          description: "We've created your account for you.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        navigate('/newUserRegistration');
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        toast({
          title: error.message,
          description: error.code,
          status: 'error',
          duration: 3000,
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
            <Heading>Create your account</Heading>
            <HStack spacing='1' justify='center'>
              <Text color='muted'>Already have an account?</Text>
              <Link to='/login'>
                <Button variant='link' colorScheme='blue'>
                  Log in
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
                defaultValue={userSignUpInfo.email}
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
                name='password'
                defaultValue={userSignUpInfo.password}
                onChange={handleInput}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleViewPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <InputGroup>
              <InputLeftElement
                pointerEvents='none'
                children={<LockIcon color='gray.300' />}
              />
              <Input
                pr='4.5rem'
                type={showPassword ? 'text' : 'password'}
                placeholder='Confirm password'
                name='confirmPassword'
                defaultValue={userSignUpInfo.confirmPassword}
                onChange={handleInput}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleViewPassword}>
                  {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
              </InputRightElement>
            </InputGroup>

            <Button
              rightIcon={<AddIcon />}
              colorScheme='teal'
              onClick={createNewUserUsingCred}
            >
              Sign Up
            </Button>

            <HStack>
              <Divider />
              <Text fontSize='sm' whiteSpace='nowrap' color='muted'>
                or continue with
              </Text>
              <Divider />
            </HStack>
            <Button width='full' onClick={googleSignin}>
              Sign up with Google
            </Button>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Signup;
