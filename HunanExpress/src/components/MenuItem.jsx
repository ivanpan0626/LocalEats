import { useState } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "./ui/card.jsx";
import { Badge } from "./ui/badge.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.jsx";
//import Button from "./Button/Button.jsx";
import { Button } from "./ui/btn.jsx";
import { Flame, Plus, Minus } from "lucide-react";
import { Checkbox } from "./ui/checkbox.jsx";
import { Label } from "./ui/label.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { RadioRoot, RadioItem } from "./ui/radiobutton.jsx";

export default function MenuItem({ food }) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedModifier, setSelectedModifier] = useState("");
  const [selectedCustomizations, setSelectedCustomizations] = useState("");
  const [instructions, setInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleCardClick = (food) => {
    if (food) {
      setSelectedFood(food);
    }
  };
  const closeDialog = () => {
    setSelectedFood(null);
    setSelectedModifier("");
    setSelectedCustomizations("");
    setInstructions("");
    setQuantity(1);
  };

  const totalPrice =
    (food.price +
      (food.customizations
        ?.filter((c) => selectedCustomizations.includes(c.id))
        ?.reduce((sum, c) => sum + c.price, 0) || 0) +
      (food.required
        ?.filter((m) => selectedModifier === m.id)
        ?.reduce((sum, m) => sum + m.price, 0) || 0)) *
    quantity;

  const handleCustomizationChange = (customizationId) => {
    setSelectedCustomizations((prev) => {
      const newCustomizations = prev.includes(customizationId)
        ? prev.filter((id) => id !== customizationId) //Remove if selected
        : [...prev, customizationId]; //Add if not selected
      return newCustomizations;
    });
  };

  // Handle value change when a radio button is selected
  const handleValueChange = (value) => {
    setSelectedModifier(value);
  };

  const returnCart = () => {
    console.log("Customize", selectedCustomizations);
    console.log("Modify", selectedModifier);
    console.log("Instruction", instructions);
    console.log("Qty", quantity);
    console.log("Price", totalPrice);
    console.log("Food", selectedFood);
  };

  const RenderModifiers = () => (
    <div className="space-y-3">
      {food.required.length === 0 ? (
        <></>
      ) : (
        <h1 className="font-semibold italic">Modifiers</h1>
      )}
      <RadioRoot value={selectedModifier} onValueChange={handleValueChange}>
        {food.required.map((modifier) => (
          <div key={modifier.id} className="flex items-center space-x-2">
            <RadioItem value={modifier.id} id={modifier.id} />
            <Label htmlFor={modifier.id}>
              {modifier.label}
              {modifier.price > 0 && ` (+$${modifier.price.toFixed(2)})`}
            </Label>
          </div>
        ))}
      </RadioRoot>
    </div>
  );

  const RenderCustomizations = () => (
    <div className="space-y-3">
      {food.customizations.length === 0 ? (
        <></>
      ) : (
        <h1 className="font-semibold italic">Customize</h1>
      )}
      {food.customizations.map((customization) => (
        <div key={customization.id} className="flex items-center space-x-2">
          <Checkbox
            id={customization.id}
            checked={selectedCustomizations.includes(customization.id)}
            onCheckedChange={(checked) =>
              handleCustomizationChange(customization.id)
            }
          />
          <Label htmlFor={customization.id}>
            {customization.label}
            {customization.price > 0 &&
              ` (+$${customization.price.toFixed(2)})`}
          </Label>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Card
        //key={food.id}
        className="w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden flex flex-col"
      >
        <CardHeader className="p-0">
          <div className="relative w-full h-[125px]">
            <img
              src={food.imageUrl}
              alt={food.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90 text-black">
                ${food.price.toFixed(2)}
              </Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold">{food.name}</h3>
            <div className="flex">
              {food.spicy ? (
                <Flame className="h-4 w-4 text-red-500" fill="currentColor" />
              ) : null}
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <div className="w-full h-8">
            <button
              onClick={() => handleCardClick(food)}
              className="w-full h-full bg-red-600 hover:bg-red-700 text-white rounded-lg"
            >
              Add to Cart
            </button>
          </div>

          {selectedFood && (
            <Dialog open={Boolean(selectedFood)} onOpenChange={closeDialog}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{selectedFood.name}</DialogTitle>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  {/*Handles setting Quantity*/}
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium w-12 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {/*Handles Food Size/Addons*/}
                  <RenderModifiers />
                  {/*Handles Food Customizations*/}
                  <RenderCustomizations />
                  {/*Handles Specific Instructions*/}
                  <div className="space-y-2">
                    <Label htmlFor="instructions">Special Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Any special requests?"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                    />
                  </div>
                  {/*Handles Adding to Cart*/}
                  <Button
                    className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg"
                    onClick={() => returnCart()}
                  >
                    Add to Cart - ${totalPrice.toFixed(2)}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </>
  );
}
