import React from 'react';
import Heading3 from '@/components/ui/typography/Heading3';

export default function SectionHeader({title, children}: {title: string, children?: React.ReactNode}) {
  return (
    <div className={"flex justify-between border-b pb-3"}>
      <Heading3>{title}</Heading3>
      <div className={"flex gap-2"}>
        {children}
      </div>
    </div>
  )
}
