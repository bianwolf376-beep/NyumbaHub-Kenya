"use client";

import Link from "next/link";

import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import MobileMenu from "./MobileMenu";

import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">

          <Link href="/">Home</Link>

          <Link href="/properties">
            Properties
          </Link>

          <Link
            href="/ai"
            className="font-semibold text-primary"
          >
            ✨ Ask NyumbaAI
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link href="/contact">
            Contact
          </Link>

        </nav>

        <div className="hidden items-center gap-3 lg:flex">

          <ThemeToggle />

          <Button variant="ghost" asChild>
            <Link href="/login">
              Login
            </Link>
          </Button>

          <Button asChild>
            <Link href="/register">
              Register
            </Link>
          </Button>

        </div>

        <div className="lg:hidden">
          <MobileMenu />
        </div>

      </div>
    </header>
  );
}