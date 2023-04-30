import * as React from "react";

import { cn } from "@/lib/utils";

export interface Heading2Props
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const Heading2 = React.forwardRef<HTMLHeadingElement, Heading2Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        className={cn(className, "text-3xl font-bold text-foreground/90")}
        {...props}
        ref={ref}
      >
        {children}
      </h2>
    );
  }
);

Heading2.displayName = "Heading2";

export default Heading2;
