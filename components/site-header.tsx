"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/nextjs";

import { MainNav } from "./main-nav";
import { Button } from "./ui/buttons/Button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <SignedOut>
              <StyledSignInButton />
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link href={"/app"}>
                  <Button variant={"default"} size={"default"}>
                    My Palettes
                  </Button>
                </Link>
                <StyledSignOutButton />
              </div>
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  );
}

function StyledSignInButton() {
  return (
    <Link href={"https://accounts.colorpalette-ai.com/sign-in"}>
      <Button variant={"default"}>Sign In</Button>
    </Link>
  );
}

function StyledSignOutButton() {
  const router = useRouter();
  return (
    <SignOutButton>
      <Button variant={"outline"} onClick={() => router.push("/")}>
        Sign Out
      </Button>
    </SignOutButton>
  );
}
