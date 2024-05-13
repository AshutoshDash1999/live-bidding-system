"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import { firebaseAuth, firestoreDB } from "@/config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  // if access token is present then redirect user to home
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!!accessToken) {
      router.replace("/home");
    }
  }, []);

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

  const createAccountHandler = async () => {
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

        await setDoc(doc(firestoreDB, "userData", userDetails?.email), {
          email: userDetails?.email,
          biddingHistory: [],
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
          .then(async (response) => {
            const accessToken = await response.user.getIdToken();
            localStorage.setItem("accessToken", accessToken);
            toast.success(`Login successfull for ${response?.user?.email}.`);
            router.replace("/home");
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
        <div className="shadow-lg p-4 md:p-8 rounded-lg w-10/12 sm:w-1/3 relative">
          <div className="absolute w-full left-0 px-4 -top-12">
            <div className="bg-purple-600 rounded-lg shadow-lg px-4 py-8">
              <h1 className="text-white text-3xl font-semibold text-center">
                {isSignupScreen ? "Create Account" : "Login"}
              </h1>
            </div>
          </div>

          <div className="pt-12">
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
              showPasswordAction
              inputType="password"
            />
            {isSignupScreen ? (
              <Input
                label="Confirm Password"
                name="confirmPassword"
                value={userDetails.confirmPassword}
                onChange={onChangeInputFieldHandler}
                showPasswordAction
                inputType="password"
              />
            ) : null}

            <Button
              onClick={() =>
                isSignupScreen ? createAccountHandler() : loginHandler()
              }
              fullWidth
              className="mt-4"
              loading={isButtonLoading}
              size="lg"
            >
              {isSignupScreen ? "Sign up" : "Login"}
            </Button>
          </div>

          {children}
        </div>
      </section>
    </>
  );
};
export default AuthLayout;
