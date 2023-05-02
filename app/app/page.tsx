import Link from "next/link";

import { api } from "@/lib/api/server";
import { Palette } from "@/lib/types";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Heading2 from '@/components/ui/typography/Heading2';
import LinkButton from '@/components/ui/buttons/LinkButton';
import SectionHeader from '@/components/section-header';

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
      <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
        {data &&
          data.map((palette) => {
            return <PaletteCard key={palette.id} palette={palette} />;
          })}
      </div>
    </section>
  );
}

function PaletteCard({ palette }: { palette: Palette }) {
  return (
    <Link href={`/app/${palette.id}`} className={"h-max"}>
      <Card>
        <CardHeader>
          <CardTitle>{palette.name}</CardTitle>
          <CardDescription>{palette.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
