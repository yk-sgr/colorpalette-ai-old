"use client";

import {Color} from '@/lib/types';
import {useState} from 'react';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';
import Colors from '@/components/colors';

export default function SwitchableColors({lightColors, darkColors, showAddColor}: { lightColors: Color[], darkColors: Color[], showAddColor?: boolean }) {
  const [useDark, setUseDark] = useState<boolean>(false);

  return (
    <div className={"flex flex-col gap-8"}>
      <div className="flex items-center space-x-2">
        <Switch id="dark-mode" onClick={() => setUseDark(!useDark)}/>
        <Label htmlFor="dark-mode" className={"font-semibold text-muted-foreground"}>Dark Mode</Label>
      </div>

      {useDark && (
        <Colors colors={darkColors} showAddColor={showAddColor}/>
      )}
      {!useDark && (
        <Colors colors={lightColors} showAddColor={showAddColor}/>
      )}
    </div>
  )
}
