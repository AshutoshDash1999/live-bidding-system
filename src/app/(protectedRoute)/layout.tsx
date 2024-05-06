import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";

export default function ProtectedRouteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toaster />
      <Navbar />
      <div className="p-8">{children}</div>
    </>
  );
}
