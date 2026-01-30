export const NAV_ITEMS = [
  { href: "/", label: "Трекінг" },
  { href: "/projects", label: "Проєкти" },
  { href: "/reports", label: "Звіти" },
] as const;

export type NavHref = (typeof NAV_ITEMS)[number]["href"];

/** Breakpoint: below = mobile menu (drawer), from this = desktop nav row */
export const NAV_DESKTOP_BREAKPOINT = "md";
