import {api} from '@/lib/api/server';
import Colors from '@/components/colors';
import Text from '@/components/ui/typography/Text';
import Heading2 from '@/components/ui/typography/Heading2';

export default async function PalettePage({params}: { params: { paletteId: string } }) {
  const data = await api.palettes.byId.fetch({id: params.paletteId});

  return (
    <div className={"flex flex-col gap-8"}>
      {data && <Header id={data.id} name={data.name} description={data.description}/>}
      <section className={"container flex flex-col"}>
        <Colors paletteId={data.id} colors={data.colors} showAddColor={true}/>
      </section>
    </div>
  )
}

function Header({id, name, description}: { id: string, name: string, description: string }) {
  return (
    <section className="container flex flex-col gap-2">
      <Heading2>{name}</Heading2>
      <div className={"flex items-end justify-between border-b pb-4"}>
        <Text size={"lg"}>{description}</Text>
      </div>
    </section>
  )
}
