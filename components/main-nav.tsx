import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.svg";
import { NavItem } from "@/types/nav";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import Text from "@/components/ui/typography/Text";


export function MainNav() {
  return (
    <nav className="flex items-center gap-6 md:gap-10">
      <Link href="/">
        <span className="flex items-center gap-2 font-bold">
          <span className="h-6 w-6">
            <Image
              src={Logo}
              alt={"ColorPaletteAI Logo"}
              height={32}
              width={32}
            />
          </span>
          <span>{siteConfig.name} <span className={"text-xs"}>BETA</span></span>
        </span>
      </Link>
    </nav>
  );
}
