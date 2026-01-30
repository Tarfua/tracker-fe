"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavMenu } from "./NavMenu";

export function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-10 border-b border-border bg-surface"
      role="banner"
    >
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-base font-semibold text-foreground no-underline focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-background rounded"
          aria-current={pathname === "/" ? "page" : undefined}
        >
          Time Tracker
        </Link>
        <NavMenu />
      </div>
    </header>
  );
}
