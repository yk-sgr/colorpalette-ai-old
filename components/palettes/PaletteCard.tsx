import Favorite from "../app/Favorite";
import LinkButton from "../ui/buttons/LinkButton";
import Heading3 from "../ui/typography/Heading3";
import Text from "../ui/typography/Text";

type Props = {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
}

export default function PaletteCard(props: Props) {
  return (
    <div className="rounded-lg border border-foreground/10 p-6 shadow-sm">
      <div className="flex h-full items-start justify-between">
        <div className="flex h-full w-full flex-col">
          <Heading3>{props.name}</Heading3>
          <Text>{props.description}</Text>
          <div className="flex-1"></div>
          <div className="flex">
            <LinkButton href={`/app/${props.id}`} variant={"simple"} size={"sm"} className="mt-6 px-14">View</LinkButton>
          </div>
        </div>
        <Favorite id={props.id} isFavorite={props.isFavorite} />
      </div>
    </div>
  )
}
