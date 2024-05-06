"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!!accessToken) {
      router.replace("/home");
    }
  }, []);

  return (
    <main className="p-10">
      <Button onClick={() => router.push("/login")}>Login</Button>
    </main>
  );
}
