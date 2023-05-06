"use client";

import React, {useState} from "react";
import {ChevronsUpDown, Loader2} from "lucide-react";

import {api} from "@/lib/api/client";
import {Button} from "@/components/ui/buttons/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {Textarea} from "@/components/ui/textarea";
import Colors from "../colors";
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import Text from '@/components/ui/typography/Text';
import { X } from "lucide-react";
import { DEFAULT_COLORS } from "@/lib/utils";

export default function GenerateSection(props: React.ReactHTMLElement<HTMLElement>) {
  const ctx = api.useContext();
  const {mutate, isLoading, isSuccess, data, error, isError} =
    api.generate.generatePalette.useMutation({
      retry: 0,
      onSuccess: async (data) => {
        await ctx.palettes.list.refetch();
      },
    });

  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [colors, setColors] = useState<string[]>(DEFAULT_COLORS);
  const [addColor, setAddColor] = useState<string>("");
  const [usages, setUsages] = useState<string[]>([]);
  const [palette, setPalette] = useState<string>("");

  function handleGenerate() {
    if (!isLoading) mutate({description, name, colors});
  }

  return (
    <>
      <section className="container flex flex-col gap-2" {...props}>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor={"inputName"}>Palette Name</Label>
            <Input id={"inputName"} className={"w-full md:w-1/2 xl:w-1/3"} placeholder={"Super Cool Palette"}
                   onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div>
            <Label htmlFor={"inputDescription"}>Description</Label>
            <Textarea
              id={"inputDescription"}
              placeholder="Enter product description..."
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>
          <Collapsible>
            <CollapsibleTrigger className="flex items-center text-muted-foreground">
              <ChevronsUpDown/>
              <p className="leading-7">Advanced Options</p>
            </CollapsibleTrigger>
            <CollapsibleContent className={"mb-4 mt-6 grid gap-4"}>
              <div className={"space-y-2"}>
                <Text weight={"semibold"}>Enter the colors you want to generate:</Text>
                <div className={"flex flex-col gap-2"}>
                  {colors.map((color, index) =>
                    <div key={index} className={"flex gap-2"}>
                      <button onClick={() => setColors(colors.filter((c) => c !== color))}>
                        <X className={"h-4 w-4 text-foreground/90"}/>
                      </button>
                      <Text className={"w-1/3"}>{color}</Text>
                    </div>
                  )}
                  <div className={"flex gap-2"}>
                    <Input className={"w-1/3"} placeholder={"Add Color"} value={addColor}
                           onChange={(ev) => setAddColor(ev.target.value)}/>
                    <Button className={"w-fit"} variant={"simple"} size={"xs"} onClick={() => {
                      setColors([...colors, addColor]);
                      setAddColor("");
                    }}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Button
            className={`w-full whitespace-nowrap md:w-fit ${
              isLoading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
            onClick={() => handleGenerate()}
          >
            {isLoading && <Loader2 className={"mr-1 animate-spin"}/>}
            Create Palette
          </Button>
          {isLoading && (
            <p className="animate-pulse leading-7 text-muted-foreground">
              This is going to take some time.
            </p>
          )}
          {isError && (
            <p className="leading-7 text-destructive">{error?.message}</p>
          )}
        </div>
      </section>
      <section className={"container mt-8 flex flex-col justify-center gap-8"}>
        {data && (
          <Colors
            paletteId={data.id}
            colors={data.colors}
            showAddColor={true}
          />
        )}
      </section>
    </>
  );
}
