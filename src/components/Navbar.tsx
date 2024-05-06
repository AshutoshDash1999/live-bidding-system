"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  ListBulletIcon,
  SquaresPlusIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "./Button";

const navItems = [
  {
    name: "Home",
    icon: <HomeIcon className="h-6" />,
    href: "/home",
  },
  {
    name: "Bidding History",
    icon: <ListBulletIcon className="h-6" />,
    href: "/biddingHistory",
  },
];

const Navbar = () => {
  const router = useRouter();

  const logOutHandler = () => {
    localStorage.setItem("accessToken", "");
    router.push("/");
    toast.success("Log out successfully");
  };

  const sellItemButtonHandler = () => {
    router.push("/publishNewItem");
  };

  return (
    <div className="bg-purple-600 py-4 px-8 text-white font-bold text-xl flex justify-between items-center">
      <div className="flex gap-8">
        {navItems.map((navItem) => {
          return (
            <Link
              href={navItem?.href}
              className="flex flex-row gap-2 items-center cursor-pointer"
              key={navItem?.name}
            >
              {navItem?.icon}
              {navItem?.name}
            </Link>
          );
        })}

        <Button
          onClick={sellItemButtonHandler}
          variant="outline"
          className="my-0"
          leftIcon={<SquaresPlusIcon className="h-6" />}
        >
          Sell an Item
        </Button>
      </div>

      <span
        className="flex flex-row gap-2 items-center cursor-pointer"
        onClick={logOutHandler}
      >
        <ArrowLeftStartOnRectangleIcon className="h-6" />
        Logout
      </span>
    </div>
  );
};
export default Navbar;
