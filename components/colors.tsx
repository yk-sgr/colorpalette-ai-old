import { PlusCircle } from "lucide-react";

import type { Color as ColorType } from "@/lib/types";
import Color from "@/components/color";
import Text from "@/components/ui/typography/Text";

export default function Colors({
  paletteId,
  colors,
  showAddColor,
}: {
  paletteId: string;
  colors: ColorType[];
  showAddColor?: boolean;
}) {
  return (
    <div
      className={
        "grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      }
    >
      {colors.map((color) => (
        <Color paletteId={paletteId} color={color} key={color.id} />
      ))}
      {showAddColor && (
        <div className={"flex flex-col gap-2"}>
          <div className={"flex items-center gap-2"}>
            <div
              className={`h-6 w-6 rounded-full border border-muted-foreground/20`}
            />
            <Text size={"lg"} weight={"semibold"}>
              Generate more
            </Text>
          </div>
          <div
            className={`group flex h-60 cursor-pointer items-center justify-center rounded-xl border-2 border-foreground/20 transition duration-100 ease-out hover:border-foreground/50 hover:transition hover:duration-75 hover:ease-in active:border-foreground/80 active:duration-0`}
          >
            <PlusCircle
              strokeWidth={1}
              size={48}
              className={
                "text-foreground/20 transition duration-100 ease-out group-hover:text-foreground/50 group-hover:transition group-hover:duration-75 group-hover:ease-in group-active:border-foreground/80 group-active:text-muted-foreground group-active:duration-0"
              }
            />
          </div>
          <Text weight={"semibold"} align={"center"}>
            #??????
          </Text>
        </div>
      )}
    </div>
  );
}
