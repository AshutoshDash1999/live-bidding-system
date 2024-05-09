"use client";

import { firebaseAuth } from "@/config/firebaseConfig";
import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  HomeIcon,
  ListBulletIcon,
  SquaresPlusIcon,
} from "@heroicons/react/20/solid";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // if access token is not present then change navbar view
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!!accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const logOutHandler = () => {
    signOut(firebaseAuth)
      .then(() => {
        localStorage.setItem("accessToken", "");
        router.push("/");
        toast.success("Log out successfully");
      })
      .catch((error) => {
        console.log("Error while logout:", error);
        toast.error(`${error?.message}`);
      });
  };

  const sellItemButtonHandler = () => {
    router.push("/publishNewItem");
  };

  const loginButtonHandler = () => {
    router.push("/login");
  };

  return (
    <>
      {isLoggedIn ? (
        <div className=" text-white font-bold text-xl flex justify-between items-center">
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
      ) : (
        <div className="bg-purple-600 py-4 px-8 flex justify-end">
          <Button
            variant="outline"
            className="my-0"
            leftIcon={<ArrowRightEndOnRectangleIcon className="h-6" />}
            onClick={loginButtonHandler}
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
};
export default Navbar;
