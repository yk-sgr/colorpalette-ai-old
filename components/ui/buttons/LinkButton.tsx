import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const linkButtonVariants = cva(
  "text-center w-fit rounded-lg transition ease-out duration-100 font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-foreground/60",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/95",
        simple:
          "bg-black text-white dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        sm: "px-3 py-1.5 font-medium",
        default: "px-4 py-2 font-medium",
        md: "px-5 py-3 font-semibold",
        lg: "px-6 py-3.5 font-semibold",
        xl: "px-7 py-4 font-semibold",
      },
      width: {
        default: "w-fit",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "default",
    },
  }
);

export interface LinkButtonProps
  extends React.LinkHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof linkButtonVariants> {}

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, variant, size, width, ...props }, ref) => {
    return (
      <Link
        href={props.href ?? ""}
        className={cn(linkButtonVariants({ variant, size, width, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
LinkButton.displayName = "Button";

export default LinkButton;
