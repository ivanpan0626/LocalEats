import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import classNames from "classnames";

const labelVariants = {
  default:
    "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
};

const Label = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={classNames(labelVariants[variant], className)}
      {...props}
    />
  )
);

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
