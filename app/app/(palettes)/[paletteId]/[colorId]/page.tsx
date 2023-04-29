import {api} from '@/lib/api/server';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import ClickCopy from '@/components/click-copy';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import Text from '@/components/ui/typography/Text';

export default async function ColorDetailPage(props: { params: { colorId: string, paletteId: string } }) {
  const color = await api.colors.byId.fetch({id: props.params.colorId});

  return (
    <div className={"flex flex-col gap-8"}>
      <section className={"container mx-auto flex flex-col gap-8"}>
        <Link href={`/app/${props.params.paletteId}`} className={"group flex gap-2"}>
          <ArrowLeft className={"h-6 w-6 text-foreground/60 transition duration-100 ease-out group-hover:text-foreground/80 group-hover:transition group-hover:duration-75 group-hover:ease-in group-active:text-foreground/90"} strokeWidth={3}/>
          <span className={"font-semibold text-foreground/60 transition duration-100 ease-out group-hover:text-foreground/80 group-hover:transition group-hover:duration-75 group-hover:ease-in group-active:text-foreground/90"}>Back</span>
        </Link>
        <div className={"flex w-full justify-between"}>
          <div
            className={"flex items-center gap-4 transition duration-100 ease-out group-hover:translate-y-10 group-hover:transition group-hover:duration-75 group-hover:ease-in"}>
            <div className={`h-8 w-8 rounded-full border border-muted-foreground/20`}
                 style={{backgroundColor: color.hex}}/>
            <p
              className={"text-center text-xl font-semibold text-foreground/90"}>{color.name}</p>
          </div>
          <ClickCopy>
            <Text size={"lg"} weight={"semibold"} hover={"enable"} active={"enable"}>{color.hex}</Text>
          </ClickCopy>
        </div>
      </section>
      <section className={"container mx-auto mt-4 flex flex-col gap-2"}>
        <h2 className={"text-xl font-semibold text-foreground/80"}>Description</h2>
        <p>{color.description}</p>
      </section>
      <section className={"container mx-auto flex flex-col gap-2"}>
        <h2 className={"text-xl font-semibold text-foreground/80"}>Usage</h2>
        <ul>
          {color.usages.map(usage =>
            <li key={usage.id} className={"flex items-center gap-2"}><ArrowRight className={"h-4 w-4"}/> {usage.usage}
            </li>
          )}
        </ul>
      </section>
    </div>
  )
}
