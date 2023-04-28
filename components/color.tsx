import {Color} from '@/lib/types';

export default function Color({color}: { color: Color }) {
  return (
    <div key={color.name + color.hex + color.hex} className={"group flex flex-col gap-2"}>
      <div className={"flex items-center gap-2 transition duration-100 ease-out group-hover:translate-y-10 group-hover:transition group-hover:duration-75 group-hover:ease-in"}>
        <div className={`h-6 w-6 rounded-full border border-muted-foreground/20`}
             style={{backgroundColor: color.hex}}/>
        <p
          className={"text-center text-lg font-semibold text-muted-foreground"}>{color.name}</p>
      </div>
      <div className={"flex flex-col gap-2"}>
        <div
          className={`z-10 flex h-60 cursor-pointer items-center justify-center rounded-xl border border-muted-foreground/20 shadow-md transition duration-150 ease-out group-hover:scale-110 group-hover:transition group-hover:duration-100 group-hover:ease-in`}
          style={{backgroundColor: color.hex, boxShadow: `0 6px 8px -6px ${color.hex}`}}>
        </div>
        <p
          className={"z-0 text-center font-semibold text-muted-foreground transition duration-100 ease-out group-hover:-translate-y-10 group-hover:transition group-hover:duration-75 group-hover:ease-in"}>{color.hex}</p>
      </div>
    </div>
  )
}
