"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-80">
        <div className="mt-10 flex flex-col gap-6 text-lg">

          <Link href="/">Home</Link>

          <Link href="/properties">
            Properties
          </Link>

          <Link href="/ai">
            ✨ Ask NyumbaAI
          </Link>

          <Link href="/about">
            About
          </Link>

          <Link href="/contact">
            Contact
          </Link>

          <div className="border-t pt-6">

            <Link href="/login">
              Login
            </Link>

            <br />

            <Link href="/register">
              Register
            </Link>

          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}