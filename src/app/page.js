"use client";

import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center md:justify-around h-screen flex-wrap p-2">
      <div className="flex flex-col gap-1 p-2">
        <h1 className="text-5xl font-bold text-center">
          Making bidding easier
        </h1>
        <Link href="/login">
          <Button className="p-2 my-4 text-xl">Get Started</Button>
        </Link>
      </div>
      <div>
        <Image src="./hero-img.svg" alt="Hero Image" height={200} width={400} />
      </div>
    </main>
  );
}
