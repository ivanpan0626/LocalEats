import React from "react";
import { Slot } from "@radix-ui/react-slot"; // Radix Slot for custom components
import { cva } from "class-variance-authority"; // Importing cva for variant-based styles
import classNames from "classnames"; // Importing classnames utility for conditional classes

// Define button variants using cva
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", // Base styles
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default", // Default variant
      size: "default", // Default size
    },
  }
);

const Button = React.forwardRef(
  (
    {
      className,
      variant = "default", // Default variant
      size = "default", // Default size
      asChild = false, // If true, render as a custom element
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button"; // If 'asChild' is true, use Slot for dynamic components

    return (
      <Comp
        className={classNames(
          // Combine dynamic classes with additional custom className
          buttonVariants({ variant, size }), // Apply styles based on variant and size
          className // Add any additional custom class names
        )}
        ref={ref} // Forward the ref to the underlying element
        {...props} // Spread the other props like onClick, etc.
      />
    );
  }
);

Button.displayName = "Button"; // For easier debugging

export { Button };
