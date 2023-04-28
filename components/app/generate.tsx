"use client";

import {Textarea} from '@/components/ui/textarea';
import {Button} from '@/components/ui/button';
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from '@/components/ui/collapsible';
import {ChevronsUpDown, Loader2} from 'lucide-react';
import {api} from '@/lib/api/client';
import {useState} from 'react';
import Colors from '../colors';

export default function GenerateSection() {
  const ctx = api.useContext();
  const {mutate, isLoading, isSuccess, data, error, isError} = api.palettes.generate.useMutation({
    retry: 0,
    onSuccess: async (data) => {
      await ctx.palettes.invalidate();
    }
  });
  const [description, setDescription] = useState<string>("");

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
      <section className={"container mt-8 flex flex-col justify-center gap-8"}>
        {data && <Colors colors={data.colors} showAddColor={true} />}
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

