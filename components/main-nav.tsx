import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { NavItem } from "@/types/nav";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Text from "@/components/ui/typography/Text";

const items = [
  {
    title: "Home",
    href: "/",
  },
] as NavItem[];

export function MainNav() {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <span className="hidden items-center gap-2 font-bold sm:flex">
        <span className="h-6 w-6">
          <Image
            src={Logo}
            alt={"ColorPaletteAI Logo"}
            height={32}
            width={32}
          />
        </span>
        <span>{siteConfig.name}</span>
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
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  <Text
                    size={"sm"}
                    weight={"semibold"}
                    hover={"enable"}
                    active={"enable"}
                  >
                    {item.title}
                  </Text>
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
