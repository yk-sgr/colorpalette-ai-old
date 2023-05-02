import * as React from "react";

import { cn } from "@/lib/utils";

export interface Heading3Props
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const Heading3 = React.forwardRef<HTMLHeadingElement, Heading3Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        className={cn(className, "text-2xl font-bold text-foreground")}
        {...props}
        ref={ref}
      >
        {children}
      </h2>
    );
  }
);

Heading3.displayName = "Heading3";

export default Heading3;
