"use client";

import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Checkbox,
    Input,
    Typography
} from "@material-tailwind/react";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
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
          <Input label="Email" size="lg" />
          <Input label="Password" size="lg" />
          <div className="-ml-2.5">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth>
            Sign In
          </Button>
          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Link href="signup">
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}
