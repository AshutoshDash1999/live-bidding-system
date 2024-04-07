"use client";

import { auth } from "@/utils/firebaseConfig";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast, Toaster } from "react-hot-toast";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [signInWithEmailAndPassword, user, signInLoading] =
    useSignInWithEmailAndPassword(auth);

  const loginDetailsHandler = (e) => {
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: e.target.value,
    });
  };

  const logInHandler = (e) => {
    e.preventDefault();

    if (loginDetails?.email && loginDetails?.password) {
      try {
        signInWithEmailAndPassword(loginDetails?.email, loginDetails?.password);
      } catch (error) {
        console.log("error", error);
        toast.error("Please enter login details.");
      }
    } else {
      toast.error("Please enter login details.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Toaster />
      <Card className="w-96">
        <CardHeader
          variant="gradient"
          color="blue"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
            Sign In
          </Typography>
        </CardHeader>
        <CardBody>
          <form className="flex flex-col gap-4" onSubmit={logInHandler}>
            <Input
              label="Email"
              name="email"
              size="lg"
              value={loginDetails?.email}
              onChange={loginDetailsHandler}
            />
            <Input
              label="Password"
              size="lg"
              name="password"
              value={loginDetails?.password}
              onChange={loginDetailsHandler}
            />
            <Button
              variant="gradient"
              fullWidth
              type="submit"
              loading={signInLoading}
              color="blue"
              className="flex justify-center"
            >
              Sign In
            </Button>
          </form>
        </CardBody>
        <CardFooter className="pt-0">
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link href="signup" className="ml-1 font-bold text-blue-700">
              Sign up
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
