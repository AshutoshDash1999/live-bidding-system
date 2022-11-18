import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Spacer,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";
import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Logout from "./Logout";

const NavItems = [
  {
    navItem: "Home",
    href: "/home",
    icon: "",
  },
];

function Navbar() {
  const navigate = useNavigate();
  const toast = useToast();
  const [user, loading, error] = useAuthState(auth);
  const [showUserName, setUserName] = useState<string>("")
  const [showUserPhoto, setUserPhoto] = useState<string>("")

  useEffect(()=>{
    if (user){
      setUserName(user.displayName as string)
      setUserPhoto(user.photoURL as string)
    } else if (loading){
      setUserName("Loading Name...")
    }
  }, [user, loading])

  const navbarBg = useColorModeValue("gray.200", "whiteAlpha.50");

  const logoutHandler = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
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
    <Box my={2} mx={6} bg={navbarBg} borderRadius="md">
      <Flex py={2} px={4}>
        <HStack spacing="24px">
          {NavItems.map((item) => (
            <Link to={item.href} key={item.navItem}>
              <Button colorScheme="teal" variant="ghost">
                {item.navItem}
              </Button>
            </Link>
          ))}
        </HStack>
        <Spacer />
        <HStack spacing="24px">
          <Button colorScheme="teal" variant="ghost">
            Welcome, {showUserName} <Avatar name={showUserName} ml="2" size='sm' src={showUserPhoto} />
          </Button>
          <ThemeSwitcher />
          <Logout/>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
