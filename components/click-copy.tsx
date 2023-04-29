"use client";

import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from '@/components/ui/tooltip';
import React, {useState} from 'react';

export default function ClickCopy({children}: { children: React.ReactElement }) {
  const [clickOpen, setClickOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const onClick = async () => {
    await navigator.clipboard.writeText(children.props.children);
    setOpen(true);
    setClickOpen(true);

    setTimeout(() => {
      setOpen(false);
      setClickOpen(false);
    }, 1000);
  }

  const onOpenChange = (value: boolean) => {
    if (!clickOpen) {
      setOpen(value);
    }
  }

  return (
    <TooltipProvider>
      <Tooltip onOpenChange={(value) => onOpenChange(value)} open={open || clickOpen}>
        <TooltipContent side={"top"}>
          {clickOpen ? "Copied!" : "Click to copy"}
        </TooltipContent>
        <TooltipTrigger onClick={() => onClick()}>{children}</TooltipTrigger>
      </Tooltip>
    </TooltipProvider>
  )
}
