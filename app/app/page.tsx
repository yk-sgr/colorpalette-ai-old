import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {api} from '@/lib/api/server';
import {Palette} from '@/lib/types';
import {Card, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

export default function IndexPage() {
  return (
    <div className={"flex flex-col gap-8"}>
      <section className="container flex flex-col gap-2">
        <div className={"flex justify-between border-b"}>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            Your Palettes
          </h2>
          <Link href={"/app/new"}>
            <Button size={"sm"}>Create New</Button>
          </Link>
        </div>
      </section>
      { /* @ts-ignore */ }
      <Palettes />
    </div>
  )
}

async function Palettes() {
  const data = await api.palettes.list.fetch();

  return (
    <section className={"container mx-auto"}>
      <div className={"grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"}>
        {data && data.map(palette => {
          return (
            <PaletteCard key={palette.id} palette={palette}/>
          )
        })}
      </div>
    </section>
  )
}

function PaletteCard({palette}: { palette: Palette }) {
  return (
    <Link href={`/app/${palette.id}`}>
      <Card>
        <CardHeader>
          <CardTitle>{palette.name}</CardTitle>
          <CardDescription>{palette.input}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}
