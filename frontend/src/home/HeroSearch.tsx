"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HeroSearch() {
  return (
    <div className="mt-10 rounded-3xl border bg-background p-3 shadow-xl">
      <div className="flex flex-col gap-3 md:flex-row">
        <Input
          placeholder="✨ Ask NyumbaAI... e.g. Find me a 2-bedroom in Kilimani under KSh 50,000"
          className="h-14 border-0 shadow-none"
        />

        <Button
          size="lg"
          className="h-14 rounded-2xl px-8"
        >
          <Sparkles className="mr-2 h-5 w-5" />
          Ask NyumbaAI
        </Button>
      </div>
    </div>
  );
}