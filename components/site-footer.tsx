import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function SiteFooter() {
  return (
    <footer className="container mb-4 mt-8 rounded-lg">
      <div className="mx-auto md:flex md:items-center md:justify-between">
        <a className="text-sm sm:text-center">© 2023 ColorPaletteAI.</a>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium sm:mt-0">
          <li>
            <Link href={"/pricing"}>
              <Button variant={"ghost"}>Pricing</Button>
            </Link>
            <Link href={"/support"}>
              <Button variant={"ghost"}>Support</Button>
            </Link>
            <Link href={"/privacy-policy"}>
              <Button variant={"ghost"}>Privacy Policy</Button>
            </Link>
            <Link href={"/imprint"}>
              <Button variant={"ghost"}>Imprint</Button>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
