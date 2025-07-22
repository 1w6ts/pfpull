import Link from "next/link";
import { Button } from "../ui/button";

import { RiAddCircleFill, RiSearchLine } from "@remixicon/react";

export default function Hero() {
  return (
    <div className="flex flex-col gap-8 h-[calc(100vh-80px)] items-center justify-center">
      <div>
        <h1 className="font-medium tracking-tight text-4xl">
          Scrolling for fire pfps? You&apos;re home.
        </h1>
        <p className="tracking-tight text-center text-muted-foreground">
          Save the good ones. Upload your own. Build your collection.
        </p>
      </div>
      <div className="flex gap-4">
        <Link href="/browse">
          <Button variant="outline" className="cursor-pointer">
            <RiSearchLine className="h-4 w-4" /> Browse
          </Button>
        </Link>
        <Link href="/upload">
          <Button variant="secondary" className="cursor-pointer">
            <RiAddCircleFill className="h-4 w-4" /> Upload
          </Button>
        </Link>
      </div>
    </div>
  );
}
