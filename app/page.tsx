import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import Link from "next/link";
import {client} from '@/lib/api/client';

export default function IndexPage() {
  return (
    <>
      <Header/>
    </>
  )
}

function Header() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          Discover Your Perfect Color Palette with AI-Powered ColorPaletteAI
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          Effortlessly convert your product descriptions into visually captivating color schemes with our AI-powered
          tool, perfect for branding, design, and web projects.
        </p>
      </div>
      <Link href={"/app"}>
        <Button className="w-full whitespace-nowrap md:w-fit" variant={"default"} size={"lg"}>Get started for
          free</Button>
      </Link>
    </section>
  );
}

