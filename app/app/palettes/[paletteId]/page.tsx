import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {api} from '@/lib/api/server';
import SwitchableColors from '@/components/switchable-colors';

export default async function PalettePage({params}: { params: { paletteId: string } }) {
  const data = await api.palettes.byId.fetch({id: params.paletteId});

  return (
    <div className={"flex flex-col gap-8"}>
      <section className="container flex flex-col gap-2">
        <div className={"flex justify-between border-b"}>
          <h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
            {data.name}
          </h2>
          <Link href={`/app/palettes/${data.id}/edit`}>
            <Button size={"sm"}>Edit</Button>
          </Link>
        </div>
        <p className={"text-muted-foreground"}>{data.input}</p>
      </section>
      <section className={"container mt-8 flex flex-col"}>
        <SwitchableColors lightColors={data.light} darkColors={data.dark} showAddColor={true} />
      </section>
    </div>
  )
}
