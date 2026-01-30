"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { NAV_ITEMS } from "./nav-config";
import { NavLink } from "./NavLink";

function MenuIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function NavMenu() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, close]);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  useEffect(() => {
    queueMicrotask(close);
  }, [pathname, close]);

  return (
    <>
      <nav
        className="hidden md:flex md:min-h-[44px] md:shrink-0 md:items-center md:gap-1"
        aria-label="Головне меню"
      >
        {NAV_ITEMS.map(({ href, label }) => (
          <NavLink
            key={href}
            href={href}
            label={label}
            isActive={pathname === href}
            variant="inline"
          />
        ))}
      </nav>

      <div className="flex min-h-[44px] min-w-[44px] items-center justify-center md:hidden">
        <button
          type="button"
          onClick={toggle}
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-background"
          aria-expanded={isOpen}
          aria-controls="nav-drawer"
          aria-label={isOpen ? "Закрити меню" : "Відкрити меню"}
        >
          <MenuIcon />
        </button>
      </div>

      {isOpen && (
        <div
          id="nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Меню навігації"
          className="fixed inset-0 z-50 md:hidden"
        >
          <div
            className="absolute inset-0 bg-foreground/20"
            aria-hidden
            onClick={close}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[280px] border-l border-border bg-surface shadow-lg flex flex-col">
            <div className="flex min-h-14 shrink-0 items-center justify-between border-b border-border px-4">
              <span className="text-sm font-medium text-foreground-muted">
                Меню
              </span>
              <button
                type="button"
                onClick={close}
                className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring"
                aria-label="Закрити меню"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex flex-col gap-0.5 p-2 overflow-y-auto">
              {NAV_ITEMS.map(({ href, label }) => (
                <NavLink
                  key={href}
                  href={href}
                  label={label}
                  isActive={pathname === href}
                  variant="stacked"
                  onClick={close}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
