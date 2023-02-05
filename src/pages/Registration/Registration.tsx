import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { auth, db } from '../../utils/firebaseConfig';

function Registration() {
  const toast = useToast();
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('bidder');
  const [isLoading, setIsLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [user, loading, error] = useAuthState(auth);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm({
    defaultValues: {
      fname: '',
      lname: '',
      mobile: '',
      email: userEmail ? userEmail : '',
      bank: '',
      address: '',
    },
  });

  useEffect(() => {
    if (user) {
      setUserEmail(user.email as string);
    }
  }, [user]);

  // set user email dynamically
  useEffect(() => {
    if (userEmail) {
      setValue('email', userEmail);
    }
  }, [userEmail]);

  async function onSubmit(values: any) {
    // console.log(values);

    // console.log('submitted!');

    setIsLoading(true);
    const userUniqueId = uuid().substring(0, 19).split('-').join('');
    try {
      const docRef = doc(db, 'userData', userEmail);

      const itemData = {
        userId: userUniqueId,
        displayName: values.fname,
        role: userRole,
        firstName: values.fname,
        mobileNumber: values.mobile,
        mailID: userEmail,
        bankAccountNo: values.bank,
        address: values.address,
      };

      setDoc(docRef, itemData)
        .then((result: any) => {
          // console.log(result);

          // console.log("Document written with ID: ", docRef.id);
          setIsLoading(false);
          toast({
            title: 'Your information is saved',
            status: 'success',
            duration: 2000,
            isClosable: false,
          });
          navigate('/home');
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (e) {
      console.error('Error adding document: ', e);
      setIsLoading(false);
      toast({
        title: 'Error adding document',
        description: `${e}`,
        status: 'error',
        duration: 2000,
        isClosable: false,
      });
    }
  }

  return (
    <Box>
      <Flex alignItems='center' justifyContent='center' height='100vh'>
        <Box width='100%' maxW={'md'} mx='4'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <FormControl isRequired>
                <RadioGroup
                  name='role'
                  value={userRole}
                  onChange={(value) => setUserRole(value)}
                >
                  <Stack direction={'row'}>
                    <FormLabel>Choose your role:</FormLabel>
                    <Radio name='role' id='bidder' value='bidder'>
                      Bidder
                    </Radio>
                    <Radio name='role' id='seller' value='seller'>
                      Seller
                    </Radio>
                  </Stack>
                </RadioGroup>
              </FormControl>

              {/* first name */}
              <FormControl isInvalid={!!errors.fname} isRequired>
                <FormLabel htmlFor='fname'>Full Name</FormLabel>
                <Input
                  id='fname'
                  placeholder='John Doe'
                  {...register('fname', {
                    required: 'This is required',
                    pattern: {
                      value: /^[a-zA-Z ]{2,30}$/,
                      message: 'Numbers in name field... Seriously??!!',
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "That's way too long to be a real name, try again",
                    },
                    minLength: {
                      value: 4,
                      message: 'Name too short. Try to add full name.',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.fname && errors.fname.message}
                </FormErrorMessage>
              </FormControl>

              {/* last name */}
              {/* <FormControl isInvalid={!!errors.lname}>
                <FormLabel htmlFor='lname'>Last name</FormLabel>
                <Input
                  id='lname'
                  placeholder='Doe'
                  {...register('lname', {
                    required: 'This is required',
                    minLength: {
                      value: 4,
                      message: 'Minimum length should be 4',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.lname && errors.lname.message}
                </FormErrorMessage>
              </FormControl> */}

              {/* mobile number */}

              <FormControl isInvalid={!!errors.mobile} isRequired>
                <FormLabel htmlFor='mobile'>Mobile Number</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<PhoneIcon color='gray.300' />}
                  />
                  <Input
                    type='number'
                    id='mobile'
                    placeholder='9876543210'
                    {...register('mobile', {
                      required: 'This is required',
                      pattern: {
                        value: /^(\+\d{1,3}[- ]?)?\d{10}$/,
                        message:
                          'This is not a valid mobile phone to me, try again!',
                      },
                      minLength: {
                        value: 10,
                        message: 'Minimum length should be 10',
                      },
                      maxLength: {
                        value: 12,
                        message: 'Maximum length should be 12',
                      },
                      valueAsNumber: true,
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.mobile && errors.mobile.message}
                </FormErrorMessage>
              </FormControl>

              {/* email */}
              <FormControl isRequired>
                <FormLabel htmlFor='email'>Mail Id</FormLabel>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents='none'
                    children={<AtSignIcon color='gray.300' />}
                  />
                  <Input
                    id='email'
                    {...register('email', {
                      disabled: true,
                      value: userEmail,
                    })}
                  />
                </InputGroup>
              </FormControl>

              {/* bank */}
              <FormControl isInvalid={!!errors.bank} isRequired>
                <FormLabel htmlFor='bank'>Bank Account Number</FormLabel>
                <Input
                  placeholder='xxx-xxx-xxx-xxx'
                  id='bank'
                  {...register('bank', {
                    required: 'This is required',
                    minLength: {
                      value: 10,
                      message: 'Minimum length should be 10',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.bank && errors.bank.message}
                </FormErrorMessage>
              </FormControl>

              {/* address */}
              <FormControl isInvalid={!!errors.address} isRequired>
                <FormLabel htmlFor='address'>Full Address</FormLabel>
                <Textarea
                  placeholder='Ex. Pećinci, Kolubara, Serbia - 15906'
                  id='address'
                  {...register('address', {
                    required: 'This is required',
                    minLength: {
                      value: 5,
                      message: 'Please write complete address',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.address && errors.address.message}
                </FormErrorMessage>
              </FormControl>

              <Flex alignItems='center' justifyContent='space-between'>
                <Button
                  width='100%'
                  colorScheme='blue'
                  type='submit'
                  isLoading={isLoading}
                  loadingText='Saving'
                >
                  Save
                </Button>
              </Flex>
            </Stack>
          </form>
        </Box>
      </Flex>
    </Box>
  );
}

export default Registration;
