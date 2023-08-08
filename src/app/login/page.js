"use client";

import { auth } from "@/utils/firebaseConfig";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Input,
    Typography
} from "@material-tailwind/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast, Toaster } from "react-hot-toast";
import useStore from "../../store/useStore";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const { setLoggedInEmail } = useStore();

    if (user?.user?.email) {
        toast.success(`Signing in as: ${user?.user?.email}`);
        setLoggedInEmail(user?.user?.email);
        redirect("/retrieveData");
    }

  if (error) {
    toast.error(`${error.name}: ${error.message}`);
  }

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
        <CardBody className="flex flex-col gap-4">
          <Input
            label="Email"
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            size="lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="gradient"
            fullWidth
            onClick={() => signInWithEmailAndPassword(email, password)}
          >
            Sign In
          </Button>
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
