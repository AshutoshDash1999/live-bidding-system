"use client";

import { Bars2Icon } from "@heroicons/react/24/solid";
import { IconButton, Navbar, Typography } from "@material-tailwind/react";
import ProfileMenu from "./ProfileMenu";

const Appbar = () => {
  return (
    <Navbar className="mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6">
      <div className="relative mx-auto flex items-center text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 ml-2 cursor-pointer py-1.5 font-medium"
        >
          Material Tailwind
        </Typography>
        <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          {/* <NavList /> */}
        </div>
        <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
        <ProfileMenu />
      </div>
      {/* <MobileNav open={isNavOpen} className="overflow-scroll">
      <NavList />
    </MobileNav> */}
    </Navbar>
  );
};
export default Appbar;
