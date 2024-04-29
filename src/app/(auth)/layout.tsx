"use client";

import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChangeEvent, useState } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChangeInputFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setUserDetails({ ...userDetails, [e.target.name]: e.target.value });
  };

  return (
    <section className="p-4 md:p-10 h-screen flex justify-center items-center">
      <div className="shadow-lg p-4 md:p-8 rounded-lg md:w-1/4">
        <div className="bg-purple-600 p-8 rounded-lg shadow-lg relative -top-16">
          <h1 className="text-white text-3xl font-semibold text-center">
            {pathname === "/signup" ? "Signup" : "Login"}
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
          {pathname === "/signup" ? (
            <Input
              label="Confirm Password"
              name="confirmPassword"
              value={userDetails.confirmPassword}
              onChange={onChangeInputFieldHandler}
            />
          ) : null}

          <Button onClick={() => {}} fullWidth className="mt-4">
            Login
          </Button>
        </div>

        {pathname === "/signup" ? (
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
  );
};
export default AuthLayout;
