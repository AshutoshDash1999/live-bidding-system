import React from "react";
import { Box, Button, Flex, HStack, Spacer, useColorModeValue } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ThemeSwitcher from "./ThemeSwitcher";

const NavItems = [
  {
    navItem: "Home",
    href: "/home",
    icon: "",
  },
  {
    navItem: "My Biddings",
    href: "/biddings",
    icon: "",
  },
];

function Navbar() {
    const navbarBg = useColorModeValue("gray.200", "whiteAlpha.50")
  return (
    <Box my={2} mx={6} bg={navbarBg} borderRadius="md">
      <Flex py={2} px={4}>
        <HStack spacing="24px">
          {NavItems.map((item) => (
            <Link to={item.href}>
              <Button colorScheme="teal" variant="ghost">
                {item.navItem}
              </Button>
            </Link>
          ))}
        </HStack>
        <Spacer />
        <HStack spacing="24px">
            <ThemeSwitcher/>
          <Button colorScheme="red" variant="solid">
            Log Out
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
}

export default Navbar;
