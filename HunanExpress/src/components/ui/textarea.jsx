import React from "react";
import classNames from "classnames";

const Textarea = React.forwardRef(function Textarea(
  { className, ...props },
  ref
) {
  return (
    <textarea
      className={classNames(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
