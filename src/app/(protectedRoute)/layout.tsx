"use client";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function ProtectedRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  // if access token is not present then redirect user to login
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      router.replace("/login");
    }
  }, []);
  return (
    <>
      <Toaster />
      <Navbar />
      <div className="p-8">{children}</div>
    </>
  );
}
