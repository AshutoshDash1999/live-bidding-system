import Button from "@/components/Button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10">
      <Link href="/login">
        <Button>Login</Button>
      </Link>
    </main>
  );
}
