"use client";

import Button from "@/components/Button";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <div>
      Home
      <Button onClick={() => router.push("/publishNewItem")}>
        Publish Item
      </Button>
    </div>
  );
};
export default Home;
