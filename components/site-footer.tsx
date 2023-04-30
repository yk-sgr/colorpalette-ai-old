import Link from "next/link";

import { Button } from "@/components/ui/buttons/Button";

export default function SiteFooter() {
  return (
    <footer className="container mb-4 mt-12 rounded-lg">
      <div className="mx-auto flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between">
        <a className="text-sm font-semibold sm:text-center">
          © 2023 ColorPaletteAI.
        </a>
        <ul className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm font-medium sm:mt-0">
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
