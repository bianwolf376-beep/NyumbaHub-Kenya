import Link from "next/link";
import { Home } from "lucide-react";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 font-bold text-xl text-primary"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Home className="h-5 w-5" />
      </div>

      <span>NyumbaHub</span>
    </Link>
  );
}