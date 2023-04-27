import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {api} from '@/lib/api/server';
import Color from '@/components/app/color';

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
      </section>
      <section className={"container mt-8 flex flex-col items-center justify-center"}>
        <div>
          <p className="text-lg font-semibold">Light mode colors</p>
          <div className={"mt-4 grid grid-cols-3 gap-4"}>
            {data && data.light.map(color => {
              return (
                <Color key={color.name + color.background + color.foreground} color={color}/>
              )
            })}
          </div>
          <div className={"mt-8"}>
            <p className="text-lg font-semibold">Dark mode colors</p>
            <div className={"mt-4 grid grid-cols-3 gap-4"}>
              {data && data.dark.map(color => {
                return (
                  <Color key={color.name + color.background + color.foreground} color={color}/>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
