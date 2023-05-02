import Link from "next/link";

import DiscordIcon from '@/components/icons/DiscordIcon';
import TwitterIcon from '@/components/icons/TwitterIcon';

export default function SiteFooter() {
  return (
    <footer className="container mb-4 mt-12 rounded-lg">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
        <a className="hidden text-sm font-semibold sm:block sm:w-1/3">
          © 2023 ColorPaletteAI.
        </a>
        <ul className="flex justify-center gap-4 sm:w-1/3">
          <li>
            <Link href={"https://discord.gg/dRcAfjPhub"} target={"_blank"}>
              <DiscordIcon className={"h-6 w-6 fill-foreground/80 hover:fill-foreground/90 active:fill-foreground"}/>
            </Link>
          </li>
          <li>
            <Link href={"https://twitter.com/ColorPaletteAI"} target={"_blank"}>
              <TwitterIcon className={"h-6 w-6 fill-foreground/80 hover:fill-foreground/90 active:fill-foreground"}/>
            </Link>
          </li>
        </ul>
        <a className="block text-sm font-semibold sm:hidden">
          © 2023 ColorPaletteAI.
        </a>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm font-medium sm:mt-0 sm:w-1/3">
          <li>
            <Link
              href={"/privacy-policy"}
              className={
                "font-semibold hover:underline active:text-foreground/80"
              }
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href={"/tos"}
              className={
                "font-semibold hover:underline active:text-foreground/80"
              }
            >
              Terms & Condition
            </Link>
          </li>
          <li>
            <Link
              href={"/imprint"}
              className={
                "font-semibold hover:underline active:text-foreground/80"
              }
            >
              Imprint
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
