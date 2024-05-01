"use client";

import Button from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");

    if (!!accessToken) {
      router.replace("/home");
    }
  }, []);

  return (
    <main className="p-10">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </main>
  );
}
