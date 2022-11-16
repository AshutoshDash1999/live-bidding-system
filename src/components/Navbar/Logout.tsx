import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  useDisclosure,
  Toast,
  useToast,
} from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";

function Logout() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  
  const logoutHandler = () => {
    signOut(auth)
    .then(() => {
      // Sign-out successful.
      onClose()
      toast({
          title: "Logout successfull.",
          status: "success",
          duration: 2000,
          isClosable: false,
        });
        navigate("/");
      })
      .catch((error) => {
        toast({
          title: error.message,
          description: error.code,
          status: "error",
          duration: 2000,
          isClosable: false,
        });
      });
  };
  return (
    <>
      <Button colorScheme="red" onClick={onOpen}>
        Log Out
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef.current!}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You have to login again to access our services.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef.current} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={logoutHandler} ml={3}>
                Log out
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default Logout;
