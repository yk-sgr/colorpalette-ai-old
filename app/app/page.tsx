import Link from "next/link";
import { api } from "@/lib/api/server";
import { Palette } from "@/lib/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LinkButton from '@/components/ui/buttons/LinkButton';
import SectionHeader from '@/components/section-header';
import { Heart } from "lucide-react";
import Favorite from "@/components/app/Favorite";
import PalettesList from "@/components/palettes/PalettesList";

export default function IndexPage() {
  return (
    <div className={"flex flex-col gap-8"}>
      <section className="container flex flex-col gap-2">
        <SectionHeader title={"Your palettes"}>
          <LinkButton href={"/app/new"} variant={"simple"} size={"sm"}>Create new</LinkButton>
        </SectionHeader>
      </section>
      {/* @ts-ignore */}
      <Palettes />
    </div>
  );
}

async function Palettes() {
  const data = await api.palettes.list.fetch();

  return (
    <section className={"container mx-auto"}>
      <PalettesList palettes={data} />
    </section>
  );
}

function PaletteCard({ palette }: { palette: Palette }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <Link href={`/app/${palette.id}`} className={"h-max"}>
            <CardTitle>{palette.name}</CardTitle>
          </Link>
          <Favorite id={palette.id} isFavorite={palette.isFavorite} />
        </div>
        <CardDescription>{palette.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}

