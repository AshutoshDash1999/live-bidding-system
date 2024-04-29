"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { firebaseAuth } from "@/config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const isSignupScreen = pathname === "/signup";

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

  const onChangeInputFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  const createAccountHandler = () => {
    if (
      !!userDetails?.email &&
      !!userDetails?.password &&
      !!userDetails?.confirmPassword &&
      userDetails?.password === userDetails?.confirmPassword
    ) {
      try {
        setIsButtonLoading(true);
        createUserWithEmailAndPassword(
          firebaseAuth,
          userDetails?.email,
          userDetails?.password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success(`Account successfully created for ${user?.email}.`);
          })
          .catch((error) => {
            toast.error(`Error while creating account ${error.message}.`);
          })
          .finally(() => {
            setIsButtonLoading(false);
          });
      } catch (error) {
        toast.error(`Error while creating account ${error}.`);
      }
    } else {
      if (userDetails?.password !== userDetails?.confirmPassword) {
        toast.error("Passwords don't match");
      } else {
        toast.error("Please fill all details");
      }
    }
  };

  const loginHandler = () => {
    if (!!userDetails?.email && !!userDetails?.password) {
      try {
        setIsButtonLoading(true);

        signInWithEmailAndPassword(
          firebaseAuth,
          userDetails?.email,
          userDetails?.password
        )
          .then((userCredential) => {
            const user = userCredential.user;
            toast.success(`Login successfull for ${user?.email}.`);
          })
          .catch((error) => {
            toast.error(`Error while creating account ${error.message}.`);
          })
          .finally(() => {
            setIsButtonLoading(false);
          });
      } catch (error) {
        toast.error(`Error while creating account ${error}.`);
      }
    } else {
      toast.error("Please fill all details");
    }
  };

  return (
    <>
      <Toaster />

      <section className="p-4 md:p-10 h-screen flex justify-center items-center">
        <div className="shadow-lg p-4 md:p-8 rounded-lg md:w-1/4">
          <div className="bg-purple-600 p-8 rounded-lg shadow-lg relative -top-16">
            <h1 className="text-white text-3xl font-semibold text-center">
              {isSignupScreen ? "Create Account" : "Login"}
            </h1>
          </div>

          <div className="">
            <Input
              label="Email"
              name="email"
              value={userDetails.email}
              onChange={onChangeInputFieldHandler}
            />
            <Input
              label="Password"
              name="password"
              value={userDetails.password}
              onChange={onChangeInputFieldHandler}
            />
            {isSignupScreen ? (
              <Input
                label="Confirm Password"
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={onChangeInputFieldHandler}
              />
            ) : null}

            <Button
              onClick={() =>
                isSignupScreen ? createAccountHandler() : loginHandler()
              }
              fullWidth
              className="mt-4"
              loading={isButtonLoading}
            >
              {isSignupScreen ? "Sign up" : "Login"}
            </Button>
          </div>

          {isSignupScreen ? (
            <p className="text-center">
              Already have an account?{" "}
              <Link href={"/login"} className="text-purple-600">
                Login here
              </Link>
            </p>
          ) : (
            <p className="text-center">
              New User?{" "}
              <Link href={"/signup"} className="text-purple-600">
                Signup here
              </Link>
            </p>
          )}
        </div>
      </section>
    </>
  );
};
export default AuthLayout;
