import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Live Bidding",
  description: "Publish, Browse and Bid",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={nunito.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
