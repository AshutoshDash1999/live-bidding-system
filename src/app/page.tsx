"use client";

import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import heroImage from "../../public/svg/selling-painting.svg";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!!accessToken) {
      router.replace("/home");
    }
  }, []);

  return (
    <main className="p-10 flex justify-center items-center h-screen flex-col md:flex-row gap-16">
      <div className="flex flex-col justify-center items-center md:items-start gap-4">
        <h3 className="text-5xl font-extrabold">The Thrill of the Auction,</h3>
        <h2 className="text-7xl font-extrabold text-purple-600">
          Now Online and Live
        </h2>
        <Button onClick={() => router.push("/login")} size="lg">
          Login
        </Button>
      </div>

      <div className="hidden md:inline">
        <Image
          alt="hero image"
          height={300}
          width={500}
          src={heroImage}
          className="drop-shadow-xl"
        />
      </div>
    </main>
  );
}
