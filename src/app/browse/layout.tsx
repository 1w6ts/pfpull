import { Navbar } from "@/components/marketing/navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "mono - Browse",
};

export default function BrowseLayout({
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
