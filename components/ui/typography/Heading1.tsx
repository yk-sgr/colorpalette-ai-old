import * as React from 'react';
import {cn} from '@/lib/utils';
import {cva, VariantProps} from 'class-variance-authority';

export interface Heading1Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function Heading1({ className, children, ...props}: Heading1Props) {
  return (
    <h1 className={cn(className, "text-3xl font-bold text-foreground/90")} {...props}>
      {children}
    </h1>
  );
}
