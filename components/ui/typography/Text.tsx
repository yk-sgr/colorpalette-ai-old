import * as React from 'react';
import {cn} from '@/lib/utils';
import {cva, VariantProps} from 'class-variance-authority';

const textVariants = cva("text-foreground/75 transition ease-out duration-100", {
  variants: {
    weight: {
      default: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    size: {
      default: "text-base",
      sm: "text-sm",
      md: "text-md",
      lg: "text-lg",
    },
    hover: {
      default: "",
      enable: "hover:text-foreground/90 hover:transition hover:ease-in hover:duration-75",
    },
    active: {
      default: "",
      enable: "active:text-foreground",
    },
    align: {
      default: "",
      left: "text-left",
      center: "text-center",
      right: "text-right",
    }
  },
  defaultVariants: {
    weight: "default",
    size: "default",
    hover: "default",
    active: "default",
    align: "default",
  }
});

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof textVariants> {}

export default function Text({weight, size, hover, active, align, className, children, ...props}: TextProps) {
  return (
    <p className={cn(textVariants({weight, size, hover, active, align, className}))} {...props}>
      {children}
    </p>
  );
}
