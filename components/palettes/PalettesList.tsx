import PaletteCard from "./PaletteCard";

type Props = {
  palettes: [
    {
      id: string;
      name: string;
      description: string;
      isFavorite: boolean;
    }
  ]
}

export default function PalettesList(props: Props) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {props.palettes.map((palette) => (
        <PaletteCard key={palette.id} {...palette} />
      ))}
    </div>
  )
}
