import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { doc, setDoc } from 'firebase/firestore';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { RootState } from '../../app/store';
import { db } from '../../utils/firebaseConfig';

type FormValues = {
  itemName: string;
  itemPrice: string;
  itemDesc: string;
  auctionTimeLeft: Date;
};

function PublishItem() {
  const cloudinaryRef = useRef<any>();
  const widgetRef = useRef<any>();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [itemInfo, setItemInfo] = useState({
    itemName: '',
    itemPrice: '',
    itemDesc: '',
    auctionTimeLeft: '',
    itemPhotoURL: '',
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: any) => {
    if (!data.itemPhotoURL) {
      toast({
        title: 'Please upload the item image',
        status: 'error',
        duration: 2000,
        isClosable: false,
      });
    } else {
      const itemUniqueId = uuid().substring(0, 19).split('-').join('');
      try {
        const docRef = doc(db, 'itemData', itemUniqueId);

        const itemData = {
          itemId: itemUniqueId,
          itemName: data.itemName,
          itemPrice: data.itemPrice,
          itemDesc: data.itemDesc,
          auctionTimeLeft: data.auctionTimeLeft,
          itemPhotoURL: data.itemPhotoURL,
          itemPublisher: sellerUserName,
        };

        // const docRef = await addDoc(collection(db, "itemData"), {
        //   itemId: uuid(),
        //   itemName: itemInfo.itemName,
        //   itemPrice: itemInfo.itemPrice,
        //   itemDesc: itemInfo.itemDesc,
        //   auctionTimeLeft: itemInfo.auctionTimeLeft,
        //   itemPhotoURL: itemInfo.itemPhotoURL,
        // });
        // console.log("Document written with ID: ", docRef.id);
        setDoc(docRef, itemData)
          .then((docRef) => {
            setIsLoading(false);
            toast({
              title: 'Your item is online now',
              status: 'success',
              duration: 2000,
              isClosable: false,
            });
            setItemInfo({
              itemName: '',
              itemPrice: '',
              itemDesc: '',
              auctionTimeLeft: '',
              itemPhotoURL: '',
            });
          })
          .catch((error) => {
            console.error('Error adding item: ', error);
            setIsLoading(false);
            toast({
              title: 'Error adding item',
              description: `${error}`,
              status: 'error',
              duration: 2000,
              isClosable: false,
            });
          });
      } catch (error) {
        console.error('Error adding item: ', error);
        setIsLoading(false);
        toast({
          title: 'Error adding item',
          description: `${error}`,
          status: 'error',
          duration: 2000,
          isClosable: false,
        });
      }

      onClose();
    }
  };

  const sellerUserName = useSelector(
    (state: RootState) => state.currentUserStore.userName
  );

  // upload image to cloudinary and get upload url
  cloudinaryRef.current = window.cloudinary;
  let cloudinaryWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: import.meta.env.VITE_APP_CLOUDINARY_CLOUDNAME,
      uploadPreset: import.meta.env.VITE_APP_CLOUDINARY_UPLOADPRESET,
    },
    (error: any, result: any) => {
      if (!error && result && result.event === 'success') {
        // console.log("Done! Here is the image info: ", result.info);
        setItemInfo({
          ...itemInfo,
          itemPhotoURL: result.info.secure_url,
        });
      }
    }
  );

  async function itemPublishClickHandler(e: any) {
    e.preventDefault();
    // setIsLoading(true);

    // upload image
  }

  return (
    <div>
      <Box my={2} mt={4} mx={6} borderRadius='md'>
        <Button onClick={onOpen} colorScheme='teal'>
          Publish a new item
        </Button>
      </Box>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Publish a new auction</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl isRequired marginBottom={4}>
                <FormLabel>Add Item Image</FormLabel>
                <Button onClick={() => cloudinaryWidget.open()}>
                  Click to Upload Item Image
                </Button>
              </FormControl>

              {/* item name */}

              <FormControl marginBottom={4} isInvalid={!!errors.itemName}>
                <FormLabel htmlFor='itemName'>First itemName</FormLabel>
                <Input
                  id='itemName'
                  placeholder='itemName'
                  {...register('itemName', {
                    required: 'This is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.itemName && errors.itemName.message}
                </FormErrorMessage>
              </FormControl>

              {/* price */}
              <FormControl isInvalid={!!errors.itemPrice} marginBottom={4}>
                <FormLabel htmlFor='itemPrice'>Item Base Price</FormLabel>
                <Input
                  type='number'
                  id='itemPrice'
                  {...register('itemPrice', {
                    required: 'This is required',
                  })}
                ></Input>
                <FormErrorMessage>
                  {errors.itemPrice && errors.itemPrice.message}
                </FormErrorMessage>
              </FormControl>

              {/* description */}
              <FormControl isInvalid={!!errors.itemDesc} marginBottom={4}>
                <FormLabel htmlFor='itemDesc'>Item Description</FormLabel>
                <Textarea
                  id='itemDesc'
                  placeholder='Enter item description'
                  {...register('itemDesc', {
                    required: 'This is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.itemDesc && errors.itemDesc.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl
                isInvalid={!!errors.auctionTimeLeft}
                marginBottom={4}
              >
                <FormLabel htmlFor='auctionTimeLeft'>
                  Auction Ending date-time
                </FormLabel>
                <Input
                  placeholder='Select Date and Time'
                  size='md'
                  id='auctionTimeLeft'
                  type='datetime-local'
                  {...register('auctionTimeLeft', {
                    required: 'This is required',
                  })}
                />
                <FormErrorMessage>
                  {errors.auctionTimeLeft && errors.auctionTimeLeft.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme='blue'
                mr={3}
                type='submit'
                isLoading={isLoading}
                loadingText='Publishing...'
              >
                Publish
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}
export default PublishItem;
