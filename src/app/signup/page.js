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
import { useRouter } from "next/navigation";
import { useEffect, useReducer, useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast, { Toaster } from "react-hot-toast";
import CustomButton from "../../components/CustomButton/CustomButton";

export default function Register() {
  function reducer(state, action) {
    switch (action.type) {
      case "update__email": {
        return {
          email: action.updateEmail,
          password: state.password,
          confirmPassword: state.confirmPassword,
        };
      }

      case "update__password": {
        return {
          email: state.email,
          password: action.updatePassword,
          confirmPassword: state.confirmPassword,
        };
      }

      case "update__confirm__password": {
        return {
          email: state.email,
          password: state.password,
          confirmPassword: action.updateConfirmPassword,
        };
      }
    }
    throw Error("Unknown action: " + action.type);
  }

  const initialState = { email: "", password: "", confirmPassword: "" };

  const [state, dispatch] = useReducer(reducer, initialState);

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const router = useRouter();

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (state?.password === state?.confirmPassword) {
      createUserWithEmailAndPassword(state?.email, state?.password);
    } else {
      toast.error("Mismatched Password");
    }
  };

  useEffect(() => {
    if (user) {
      toast.success("Account created successfully");
      router.push("/registration");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error?.message);
    }
  }, [error]);

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
            Sign Up
          </Typography>
        </CardHeader>
        <form onSubmit={handleCreateUser}>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              value={state?.email}
              onChange={(e) =>
                dispatch({
                  type: "update__email",
                  updateEmail: e.target.value,
                })
              }
            />

            <Input
              label="Password"
              type="password"
              size="lg"
              value={state?.password}
              onChange={(e) =>
                dispatch({
                  type: "update__password",
                  updatePassword: e.target.value,
                })
              }
            />

            <Input
              label="Confirm Password"
              type="password"
              size="lg"
              value={state?.confirmPassword}
              onChange={(e) =>
                dispatch({
                  type: "update__confirm__password",
                  updateConfirmPassword: e.target.value,
                })
              }
            />
            {/* <Input label="Confirm Password" size="lg" /> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button color="blue" type="submit" loading={loading} fullWidth>
              Create Account
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              Already a user?
              <Link
                href="login"
                className="ml-1 font-bold underline text-blue-700"
              >
                Sign in
              </Link>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
