import { api } from "@/lib/api/server";
import Colors from "@/components/colors";
import Text from "@/components/ui/typography/Text";
import Heading3 from '@/components/ui/typography/Heading3';
import { Button } from "@/components/ui/buttons/Button";
import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import DeleteDialog from "@/components/palette/DeleteDialog";

export default async function PalettePage({
  params,
}: {
  params: { paletteId: string };
}) {
  const data = await api.palettes.byId.fetch({ id: params.paletteId });

  return (
    <div className={"flex flex-col gap-8"}>
      {data && (
        <Header id={data.id} name={data.name} description={data.description} />
      )}
      <section className={"container flex flex-col"}>
        <Colors paletteId={data.id} colors={data.colors} showAddColor={true} />
      </section>
    </div>
  );
}

function Header({
  id,
  name,
  description,
}: {
  id: string;
  name: string;
  description: string;
}) {
  return (
    <section className="container flex items-end justify-between border-b pb-4">
      <div className="flex flex-col gap-2">
        <Heading3>{name}</Heading3>
        <div className={"flex items-end justify-between"}>
          <Text size={"default"}>{description}</Text>
        </div>
      </div>
      <div className="flex gap-4">
        <DeleteDialog paletteId={id} />
      </div>
    </section>
  );
}
