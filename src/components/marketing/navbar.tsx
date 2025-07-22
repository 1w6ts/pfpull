"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { RiAddCircleFill, RiUpload2Fill } from "@remixicon/react";
import { Plus } from "lucide-react";
import { UserButton } from "../user-button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Profile Pictures",
    href: "/browse?filter=pfps",
    description: "Browse for drippy pfps for discord",
  },
  {
    title: "Banners",
    href: "/browse?filter=banners",
    description: "If ur looking for goated discord banners, you're home here.",
  },
];

export function Navbar() {
  const { data: session, isPending, error, refetch } = authClient.useSession();

  return (
    <div className="w-full flex justify-between items-center p-4 border-b border-muted">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <h1 className="font-bold tracking-tighter mr-4 pl-4">mono</h1>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Home</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium tracking-tighter">
                        mono
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight">
                        The sexiest discord pfp database.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/about/" title="About Service">
                  History and why we built PFPull
                </ListItem>
                <ListItem href="/about/guidelines" title="Guidelines">
                  Image upload guidelines
                </ListItem>
                <ListItem href="/about/donations" title="Donate">
                  Donations to keep the service alive.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-2 md:w-[300px] md:grid-cols-1 lg:w-[400px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        {session?.user ? (
          <div className="flex items-center gap-2">
            <Button variant="secondary" asChild>
              <Link href="/upload">
                <RiAddCircleFill className="h-4 w-4" />
                Upload
              </Link>
            </Button>
            <UserButton user={session?.user} />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
