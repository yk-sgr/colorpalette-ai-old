import * as React from 'react';
import {cn} from '@/lib/utils';
import {cva, VariantProps} from 'class-variance-authority';

export interface Heading2Props extends React.HTMLAttributes<HTMLHeadingElement> {}

export default function Heading2({ className, children, ...props}: Heading2Props) {
  return (
    <h2 className={cn(className, "text-2xl font-bold text-foreground/90")} {...props}>
      {children}
    </h2>
  );
}
