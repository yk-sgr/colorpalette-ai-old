"use client";

import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {ChevronsUpDown, Loader2} from 'lucide-react';
import {api} from '@/lib/api/client';
import {useState} from 'react';
import Color from '@/components/app/color';
import {Switch} from '@/components/ui/switch';
import {Label} from '@/components/ui/label';

export default function GenerateSection() {
  const {mutate, isLoading, isSuccess, data, error, isError} = api.palettes.generate.useMutation({
    retry: 0,
  });
  const [description, setDescription] = useState<string>("");
  const [useDarkMode, setUseDarkMode] = useState<boolean>(false);

  function handleGenerate() {
    if (!isLoading)
      mutate({description: description})
  }

  return (
    <>
      <section className="container mt-8 flex flex-col gap-2">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Generate new color palette.
        </h3>
        <div className="flex flex-col gap-4">
          <Textarea placeholder="Enter product description..."
                    onChange={(event) => setDescription(event.target.value)}/>
          <AdvancedOptions/>
          <Button className={`w-full whitespace-nowrap md:w-fit ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                  onClick={() => handleGenerate()}>
            {isLoading && <Loader2 className={"mr-1 animate-spin"}/>}
            Create Palette
          </Button>
          {isLoading && (
            <p className="animate-pulse leading-7 text-muted-foreground">
              This is going to take some time.
            </p>
          )}
          {isError && (
            <p className="leading-7 text-destructive">
              {error?.message}
            </p>
          )}
        </div>
      </section>
      <section className={"container mt-8 flex flex-col items-center justify-center"}>
        <div className={"w-full"}>
          {data && (
            <div className="flex items-center space-x-2">
              <Switch id="dark-mode" onClick={() => setUseDarkMode(!useDarkMode)}/>
              <Label htmlFor="dark-mode">Dark Mode</Label>
            </div>
          )}
        </div>
        <div className={"mt-4 grid grid-cols-3 gap-4"}>
          {data && useDarkMode && data.palette.dark.map(color => {
            return (
              <Color key={color.name + color.background + color.foreground} color={color}/>
            )
          })}
          {data && !useDarkMode && data.palette.light.map(color => {
            return (
              <Color key={color.name + color.background + color.foreground} color={color}/>
            )
          })}
        </div>
      </section>
    </>
  )
}

function AdvancedOptions() {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex items-center text-muted-foreground">
        <ChevronsUpDown/>
        <p className="leading-7">Advanced Options</p>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <p>Coming soon...</p>
      </CollapsibleContent>
    </Collapsible>
  )
}

