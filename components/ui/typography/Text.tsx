import * as React from "react";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textVariants = cva(
  "text-foreground/80 transition ease-out duration-100",
  {
    variants: {
      weight: {
        default: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      size: {
        default: "text-base",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
      },
      hover: {
        default: "",
        enable:
          "hover:text-foreground/90 hover:transition hover:ease-in hover:duration-75",
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
      },
    },
    defaultVariants: {
      weight: "default",
      size: "default",
      hover: "default",
      active: "default",
      align: "default",
    },
  }
);

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { weight, size, hover, active, align, className, children, ...props },
    ref
  ) => {
    return (
      <p
        className={cn(
          textVariants({ weight, size, hover, active, align, className })
        )}
        {...props}
        ref={ref}
      >
        {children}
      </p>
    );
  }
);

Text.displayName = "Text";

export default Text;
