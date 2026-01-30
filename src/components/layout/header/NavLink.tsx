"use client";

import Link from "next/link";

interface NavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  variant?: "inline" | "stacked";
}

const baseClasses =
  "flex items-center justify-center font-medium no-underline transition-colors focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-background rounded-lg";

const variants = {
  inline:
    "min-h-[44px] min-w-[44px] px-3 py-2 text-sm sm:px-4",
  stacked:
    "min-h-[48px] w-full justify-start px-4 text-base",
};

const activeClasses = "bg-border text-foreground";
const inactiveClasses = "text-foreground-muted hover:text-foreground";

export function NavLink({
  href,
  label,
  isActive,
  onClick,
  variant = "inline",
}: NavLinkProps) {
  const variantClass = variants[variant];
  const stateClass = isActive ? activeClasses : inactiveClasses;

  return (
    <Link
      href={href}
      className={`${baseClasses} ${variantClass} ${stateClass}`}
      aria-current={isActive ? "page" : undefined}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}
