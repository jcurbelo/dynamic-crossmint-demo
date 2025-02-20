"use client";

import { DynamicWidget } from "@repo/dynamic";

export function Header() {
  return (
    <header className="w-full p-4 flex justify-end items-center">
      <DynamicWidget />
    </header>
  );
}
