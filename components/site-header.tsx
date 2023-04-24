"use client";

import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { MainNav } from "./main-nav";
import { Button } from "./ui/button";

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
                  <Button variant={"default"} size={"default"}>My Palettes</Button>
                </Link>
                <StyledSignOutButton />
              </div>
            </SignedIn>
          </nav>
        </div>
      </div>
    </header>
  )
}

function StyledSignInButton() {
  return (
    <Link href={"/sign-in"}>
      <Button>Sign In</Button>
    </Link>
  )
}

function StyledSignOutButton() {
  return (
    <SignOutButton>
      <Button variant={"outline"}>Sign Out</Button>
    </SignOutButton>
  )
}
