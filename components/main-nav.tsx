import Link from "next/link"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site";

const items = [
  {
    title: "Home",
    href: "/",
  }
] as NavItem[];

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <span className="hidden font-bold sm:inline-block">
        <span className="h-6 w-6">
          🎨
        </span>
        <span>
          {siteConfig.name}
        </span>
      </span>
      {items?.length ? (
        <nav className="gap-6 md:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-lg font-semibold text-muted-foreground sm:text-sm",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
