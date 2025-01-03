import React from "react";
import classNames from "classnames"; // Import classNames utility

const Card = React.forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={classNames(
        "rounded-xl border bg-card text-card-foreground shadow",
        className
      )}
      {...props}
    />
  );
});

const CardHeader = React.forwardRef(function CardHeader(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={classNames("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
});

const CardTitle = React.forwardRef(function CardTitle(
  { className, ...props },
  ref
) {
  return (
    <h3
      ref={ref}
      className={classNames(
        "font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
});

const CardDescription = React.forwardRef(function CardDescription(
  { className, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={classNames("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});

const CardContent = React.forwardRef(function CardContent(
  { className, ...props },
  ref
) {
  return (
    <div ref={ref} className={classNames("p-6 pt-0", className)} {...props} />
  );
});

const CardFooter = React.forwardRef(function CardFooter(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={classNames("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
});

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
