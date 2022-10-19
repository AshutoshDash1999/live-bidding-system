import { AtSignIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { db } from '../../utils/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function Registration() {
  const toast = useToast();
  const [registerUserInfo, setRegisterUserInfo] = useState({
    role: 'bidder',
    fname: '',
    lname: '',
    mobileNumber: '',
    mailId: '',
    bankAccountNo: '',
    yearlyIncome: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  async function saveRegistrationInfo(e: any) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const docRef = await addDoc(collection(db, 'userData'), {
        role: registerUserInfo.role,
        firstName: registerUserInfo.fname,
        lastName: registerUserInfo.lname,
        mobileNumber: registerUserInfo.mobileNumber,
        mailID: registerUserInfo.mailId,
        bankAccountNo: registerUserInfo.bankAccountNo,
        yearlyIncome: registerUserInfo.yearlyIncome,
      });
      // console.log("Document written with ID: ", docRef.id);
      setIsLoading(false);
      toast({
        title: 'Your information is saved',
        status: 'success',
        duration: 2000,
        isClosable: false,
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

  const handleInput = (event: any) => {
    console.log(event.target);
    setRegisterUserInfo({
      ...registerUserInfo,
      [event.target.name]: event.target.value,
    });
  };

  // const resetFormHandler = () => {
  //   setRegisterUserInfo({
  //     role: "",
  //     fname: "",
  //     lname: "",
  //     mobileNumber: "",
  //     mailId: "",
  //     bankAccountNo: "",
  //     yearlyIncome: "",
  //   });
  // };
  return (
    <Box>
      <Flex alignItems='center' justifyContent='center' height='100vh'>
        <Box width='30%'>
          <Stack spacing={3}>
            <FormControl isRequired>
              <RadioGroup
                name='role'
                value={registerUserInfo.role}
                onChange={(value) =>
                  setRegisterUserInfo({
                    ...registerUserInfo,
                    role: value,
                  })
                }
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
            <FormControl isRequired>
              <FormLabel>First name</FormLabel>
              <Input
                placeholder='Jane'
                name='fname'
                defaultValue={registerUserInfo.fname}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Last name</FormLabel>
              <Input
                placeholder='Doe'
                name='lname'
                defaultValue={registerUserInfo.lname}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mobile Number</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<PhoneIcon color='gray.300' />}
                />
                <Input
                  type='tel'
                  placeholder='Phone number'
                  name='mobileNumber'
                  defaultValue={registerUserInfo.mobileNumber}
                  onChange={handleInput}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Mail Id</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents='none'
                  children={<AtSignIcon color='gray.300' />}
                />
                <Input
                  type='email'
                  name='mailId'
                  placeholder='example@mail.com'
                  defaultValue={registerUserInfo.mailId}
                  onChange={handleInput}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Bank Account Number</FormLabel>
              <Input
                placeholder='xxx-xxx-xxx-xxx'
                name='bankAccountNo'
                defaultValue={registerUserInfo.bankAccountNo}
                onChange={handleInput}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Yearly Income</FormLabel>
              <Input
                placeholder=''
                name='yearlyIncome'
                defaultValue={registerUserInfo.yearlyIncome}
                onChange={handleInput}
              />
            </FormControl>
            <Flex alignItems='center' justifyContent='space-between'>
              {/* <Button width="10rem" onClick={resetFormHandler}>Reset</Button> */}
              <Button
                width='100%'
                colorScheme='blue'
                onClick={saveRegistrationInfo}
                isLoading={isLoading}
                loadingText='Saving'
              >
                Save
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Registration;
