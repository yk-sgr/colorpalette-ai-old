import {api} from '@/lib/api/server';
import {ArrowRight} from 'lucide-react';
import ClickCopy from '@/components/click-copy';

export default async function ColorDetailPage(props: { params: { colorId: string } }) {
  const color = await api.colors.byId.fetch({id: props.params.colorId});

  return (
    <div className={"flex flex-col gap-8"}>
      <section className={"container mx-auto flex justify-between"}>
        <div
          className={"flex items-center gap-4 transition duration-100 ease-out group-hover:translate-y-10 group-hover:transition group-hover:duration-75 group-hover:ease-in"}>
          <div className={`h-8 w-8 rounded-full border border-muted-foreground/20`}
               style={{backgroundColor: color.hex}}/>
          <p
            className={"text-center text-xl font-semibold text-muted-foreground"}>{color.name}</p>
        </div>
        <ClickCopy>
          <p
            className={"text-center text-xl font-semibold text-muted-foreground transition duration-100 ease-out hover:text-foreground/70 hover:transition hover:duration-75 hover:ease-in active:text-foreground/90"}>{color.hex}</p>
        </ClickCopy>
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
