"use client";

import {
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Typography
} from "@material-tailwind/react";

import { useState } from "react";

import useStore from "@/store/useStore";
import {
    ChevronDownIcon,
    PencilSquareIcon,
    PowerIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSignOut } from "react-firebase-hooks/auth";
import { toast } from "react-hot-toast";
import { auth } from "../../utils/firebaseConfig";

const ProfileMenu = () => {
  const router = useRouter();
  const { setLoggedInEmail, setUserData } = useStore();

  const [signOut, loading, error] = useSignOut(auth);

  if (error) {
    toast.error(error?.message);
  }

  const signOutHandler = async () => {
    const success = await signOut();
    if (success) {
      toast.success("You are sign out!");
      setUserData({});
      setLoggedInEmail("");
      router.push("/");
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
        <MenuItem className={`flex items-center gap-2 rounded`}>
          <Link href="/updateUserDetails" className="flex gap-2 items-center">
            <PencilSquareIcon className="h-4 w-4" />
            <Typography as="span" variant="small" className="font-normal">
              Edit Profile
            </Typography>
          </Link>
        </MenuItem>
        <MenuItem
          className={`flex items-center gap-2 rounded text-red-600`}
          onClick={() => signOutHandler()}
        >
          <PowerIcon className="h-4 w-4" />
          <Typography as="span" variant="small" className="font-normal">
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ProfileMenu;
