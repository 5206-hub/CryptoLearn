import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CRYPTOLEARN Demo",
  description: "Next.js 15 + TypeScript + app directory",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black">
        {children}
      </body>
    </html>
  );
}
