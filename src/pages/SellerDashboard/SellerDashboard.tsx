import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";

function SellerDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Navbar />
      <Box my={2} mx={6} borderRadius="md">
        <Button onClick={onOpen}>Open Modal</Button>
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publish a new auction</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired marginBottom={4}>
              <FormLabel>Item Name</FormLabel>
              <Input type="email" />
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel>Item Base Price</FormLabel>
              <NumberInput>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            
            <FormControl isRequired marginBottom={4}>
              <FormLabel>Item Description</FormLabel>
              <Textarea placeholder='' />
            </FormControl>

            <FormControl isRequired marginBottom={4}>
              <FormLabel>Auction Ending date-time</FormLabel>
              <Input
                placeholder="Select Date and Time"
                size="md"
                type="datetime-local"
              />
            </FormControl>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Publish
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default SellerDashboard;
