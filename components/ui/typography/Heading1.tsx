import * as React from "react";

import { cn } from "@/lib/utils";
import { Heading2Props } from "@/components/ui/typography/Heading2";

export interface Heading1Props
  extends React.HTMLAttributes<HTMLHeadingElement> {}

const Heading1 = React.forwardRef<HTMLHeadingElement, Heading2Props>(
  ({ className, children, ...props }, ref) => {
    return (
      <h1
        className={cn(className, "text-4xl font-bold text-foreground/90")}
        {...props}
        ref={ref}
      >
        {children}
      </h1>
    );
  }
);

Heading1.displayName = "Heading1";

export default Heading1;
