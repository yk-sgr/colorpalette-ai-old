import type {Color as ColorType} from '@/lib/types';
import Color from '@/components/color';
import {PlusCircle} from 'lucide-react';

export default function Colors({colors, showAddColor}: { colors: ColorType[], showAddColor?: boolean }) {
  return (
    <div className={"grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"}>
      {colors.map(color => <Color color={color} key={color.id}/>)}
      {showAddColor && (
        <div className={"group flex flex-col gap-2"}>
          <div className={"flex items-center gap-2"}>
            <div className={`h-6 w-6 rounded-full border border-muted-foreground/20`}/>
            <p
              className={"text-center text-lg font-semibold text-muted-foreground"}>Generate more</p>
          </div>
          <div
            className={`flex h-60 cursor-pointer items-center justify-center rounded-xl border-2 border-foreground/20 transition duration-100 ease-out group-hover:border-foreground/50 group-hover:transition group-hover:duration-75 group-hover:ease-in group-active:border-foreground/80 group-active:duration-0`}>
            <PlusCircle strokeWidth={1} size={48}
                        className={"text-muted-foreground/40 transition duration-100 ease-out group-hover:text-muted-foreground/70 group-hover:transition group-hover:duration-75 group-hover:ease-in group-active:text-muted-foreground group-active:duration-0"}/>
          </div>
          <p
            className={"text-center font-semibold text-muted-foreground"}>#??????</p>
        </div>
      )}
    </div>
  )
}
