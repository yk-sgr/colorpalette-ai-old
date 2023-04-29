import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {api} from '@/lib/api/server';
import Colors from '@/components/colors';

export default async function PalettePage({params}: { params: { paletteId: string } }) {
  const data = await api.palettes.byId.fetch({id: params.paletteId});

  return (
    <div className={"flex flex-col gap-8"}>
      {data && <Header id={data.id} name={data.name} input={data.input}/>}
      <section className={"container flex flex-col"}>
        <Colors paletteId={data.id} colors={data.colors} showAddColor={true}/>
      </section>
    </div>
  )
}

function Header({id, name, input}: { id: string, name: string, input: string }) {
  return (
    <section className="container flex flex-col">
      <h2 className={"text-2xl font-bold text-foreground/90"}>{name}</h2>
      <div className={"flex items-end justify-between border-b pb-4"}>
        <p className={"text-muted-foreground"}>{input}</p>
        <Link href={`/app/${id}/edit`}>
          <Button size={"default"} variant={"simple"}>Edit</Button>
        </Link>
      </div>
    </section>
  )
}
