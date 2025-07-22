import { Navbar } from "@/components/marketing/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "mono - Upload",
};

export default function UploadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
