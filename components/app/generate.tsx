"use client";

import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {ChevronsUpDown, Loader2} from 'lucide-react';
import {api} from '@/lib/api/client';
import {useState} from 'react';
import Color from '@/components/app/color';

export default function GenerateSection() {
  const {mutate, isLoading, isSuccess, data, error, isError} = api.palettes.generate.useMutation({
    retry: 0,
  });
  const [description, setDescription] = useState<string>("");

  function handleGenerate() {
    if (!isLoading)
      mutate({description: description})
  }

  return (
    <>
      <section className="container flex flex-col gap-2">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Your Palettes
        </h2>
      </section>
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
            <p className="leading-7 text-destructive-foreground">
              There was an error. Please try again.
            </p>
          )}
        </div>
      </section>
      <section className={"container mt-8 flex items-center justify-center"}>
        <div className={"grid grid-cols-3 gap-4"}>
          {data && data.palette.colors.map(color => {
            return (
              <Color color={color}/>
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

