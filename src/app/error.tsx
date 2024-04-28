"use client";

import Button from "@/components/Button";
import { useEffect } from "react";

const Error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col items-center justify-center h-3/4 p-10 gap-4">
      <h1 className="text-3xl font-semibold">
        Something went wrong. Please try again after some time.
      </h1>
      <Button size="lg" onClick={() => reset()}>
        Reset
      </Button>
    </main>
  );
};
export default Error;
