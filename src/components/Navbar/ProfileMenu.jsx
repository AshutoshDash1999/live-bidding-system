"use client";

import {
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography
} from "@material-tailwind/react";

import React, { useState } from "react";

import {
    ChevronDownIcon,
    PencilSquareIcon,
    PowerIcon
} from "@heroicons/react/24/outline";
import { useSignOut } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { auth } from "../../utils/firebaseConfig";

const ProfileMenu = () => {
  const profileMenuItems = [
    {
      label: "Edit Profile",
      icon: PencilSquareIcon,
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
    },
  ];

  const [signOut, loading, error] = useSignOut(auth);

  if (error) {
    toast.error(error?.message);
  }

  const signOutHandler = async () => {
    const success = await signOut();
    if (success) {
      toast.success("You are sign out!");
    }
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <div className="flex flex-col justify-start py-2 px-8 items-start">
            <Typography variant="h6" color="blue" textGradient>
              Tania Andrew
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Bidder
            </Typography>
          </div>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={label === "Sign Out" ? signOutHandler : null}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
export default ProfileMenu;
