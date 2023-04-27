import Link from 'next/link';
import {Button} from '@/components/ui/button';

export default function SiteFooter() {
  return (
    <footer className="container mb-4 mt-8 rounded-lg">
      <div className="mx-auto flex flex-col-reverse items-center justify-center sm:flex-row sm:justify-between">
        <a className="text-sm sm:text-center">© 2023 ColorPaletteAI.</a>
        <ul className="mt-3 flex flex-wrap items-center text-sm font-medium sm:mt-0 justify-center">
          <li>
            <Link href={"/privacy-policy"}>
              <Button variant={"ghost"}>Privacy Policy</Button>
            </Link>
            <Link href={"/tos"}>
              <Button variant={"ghost"}>Terms & Conditions</Button>
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
