import {Color} from '@/lib/types';
import Link from 'next/link';
import ClickCopy from '@/components/click-copy';

export default function Color({paletteId, color}: { paletteId: string, color: Color }) {
  return (
    <div key={color.name + color.hex + color.hex} className={"flex flex-col gap-2"}>
      <div className={"group flex flex-col gap-2"}>
        <div
          className={"flex items-center gap-2 transition duration-100 ease-out group-hover:translate-y-10 group-hover:transition group-hover:duration-75 group-hover:ease-in"}>
          <div className={`h-6 w-6 rounded-full border border-muted-foreground/20`}
               style={{backgroundColor: color.hex}}/>
          <p
            className={"text-center text-lg font-semibold text-muted-foreground"}>{color.name}</p>
        </div>
        <div className={"flex flex-col gap-2"}>
          <Link href={`/app/${paletteId}/${color.id}`}>
            <div
              className={`z-10 flex h-60 cursor-pointer items-center justify-center rounded-xl border border-muted-foreground/20 shadow-md transition duration-150 ease-out active:border-foreground/80 group-hover:-translate-y-3 group-hover:scale-110 group-hover:transition group-hover:duration-100 group-hover:ease-in`}
              style={{backgroundColor: color.hex, boxShadow: `0 6px 8px -6px ${color.hex}`}}>
            </div>
          </Link>
        </div>
      </div>
      <ClickCopy>
        <p className={"z-0 text-center font-semibold text-muted-foreground transition duration-100 ease-out hover:text-foreground/70 hover:transition hover:duration-75 hover:ease-in active:text-foreground/90"}>
          {color.hex}
        </p>
      </ClickCopy>
    </div>
  )
}
