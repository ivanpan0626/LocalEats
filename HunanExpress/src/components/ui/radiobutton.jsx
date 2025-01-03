import * as React from "react";
import * as RadioPrimitive from "@radix-ui/react-radio-group";
import classNames from "classnames";

const RadioRoot = React.forwardRef(({ className, ...props }, ref) => (
  <RadioPrimitive.Root
    ref={ref}
    className={classNames(
      "space-y-3", // Adds spacing between radio items
      className
    )}
    {...props}
  ></RadioPrimitive.Root>
));

const RadioItem = React.forwardRef(({ className, ...props }, ref) => (
  <RadioPrimitive.Item
    ref={ref}
    className={classNames(
      "relative w-5 h-5 cursor-pointer rounded-full border border-gray-400 hover:border-black focus:outline-none",
      className
    )}
    {...props}
  >
    <RadioPrimitive.Indicator className="absolute inset-0 flex items-center justify-center">
      <div className="w-2.5 h-2.5 rounded-full bg-black" />
    </RadioPrimitive.Indicator>
  </RadioPrimitive.Item>
));
RadioRoot.displayName = RadioPrimitive.Root.displayName;
RadioItem.displayName = RadioPrimitive.Item.displayName;

export { RadioRoot, RadioItem };
