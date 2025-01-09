import { Button } from "./ui/button.jsx";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import RegularItem from "./ui/regularitem.jsx";
import FeaturedItem from "./ui/featureditem.jsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.jsx";
import { Label } from "./ui/label.jsx";
import { Textarea } from "./ui/textarea.jsx";
import { RadioRoot, RadioItem } from "./ui/radiobutton.jsx";
import { Checkbox } from "./ui/checkbox.jsx";
import { useCart } from "../hooks/useCart.jsx";

export default function MenuItem({ item, featured}) {
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedModifier, setSelectedModifier] = useState("");
  const [selectedCustomizations, setSelectedCustomizations] = useState("");
  const [instructions, setInstructions] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(""); // Error state

  const handleItem = (item) => {
    if (item) {
      setSelectedFood(item);
    }
  };

  const handleCustomizationChange = (customizationId) => {
    setSelectedCustomizations((prev) => {
      let newCustomizations = prev.includes(customizationId)
        ? prev.filter((id) => id !== customizationId) //Remove if selected
        : [...prev, customizationId]; //Add if not selected
      newCustomizations = newCustomizations.sort();
      return newCustomizations;
    });
  };

  // Handle value change when a radio button is selected
  const handleValueChange = (value) => {
    setSelectedModifier(value);
  };

  const { addToCart, cart } = useCart();
  const returnCart = () => {
    if (item.required.length > 0 && selectedModifier === "") {
      setError("Please select a modifier!"); // Set error message
      return;
    }
    setError(""); // Clear error message if valid

    let food = {
      id: `${item.id}${selectedModifier}`,
      name: selectedModifier
        ? `${item.id} - (${selectedModifier})`
        : `${item.id}`,
      selectedCustomizations: selectedCustomizations
        ? selectedCustomizations
        : [],
      instructions: instructions,
      price: totalPrice / quantity,
      imageUrl: item.imageUrl,
    };
    addToCart(food, quantity);
    closeDialog();
  };

  const totalPrice =
    (item.price +
      (item.customizations
        ?.filter((c) => selectedCustomizations.includes(c.id))
        ?.reduce((sum, c) => sum + c.price, 0) || 0) +
      (item.required
        ?.filter((m) => selectedModifier === m.id)
        ?.reduce((sum, m) => sum + m.price, 0) || 0)) *
    quantity;

  const closeDialog = () => {
    setSelectedFood(null);
    setSelectedModifier("");
    setSelectedCustomizations("");
    setInstructions("");
    setQuantity(1);
    setSelectedFood(null);
    setError(""); // Reset error when closing the dialog
  };

  const RenderPlusMinus = () => {
    return (
      <div className="flex items-center justify-center gap-4 mb-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-lg font-medium w-12 text-center">{quantity}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setQuantity(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const RenderModifiers = () => (
    <div className="space-y-3">
      {item.required.length === 0 ? (
        <></>
      ) : (
        <h1 className="font-semibold italic">Modifiers</h1>
      )}
      <RadioRoot value={selectedModifier} onValueChange={handleValueChange}>
        {item.required.map((modifier) => (
          <div key={modifier.id} className="flex items-center space-x-2">
            <RadioItem value={modifier.id} id={modifier.id} />
            <Label htmlFor={modifier.id}>
              {modifier.label}
              {modifier.price > 0 && ` (+$${modifier.price.toFixed(2)})`}
            </Label>
          </div>
        ))}
      </RadioRoot>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p> // Display error message
      )}
    </div>
  );

  const RenderCustomizations = () => (
    <div className="space-y-3">
      {item.customizations.length === 0 ? (
        <></>
      ) : (
        <h1 className="font-semibold italic">Customize</h1>
      )}
      {item.customizations.map((customization) => (
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
      {featured ? <FeaturedItem item={item} handleItem={handleItem}/> : <RegularItem item={item} handleItem={handleItem} />}
      {selectedFood && (
        <Dialog open={Boolean(selectedFood)} onOpenChange={closeDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{selectedFood.name}</DialogTitle>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <RenderPlusMinus />
              <RenderModifiers />
              <RenderCustomizations />
              {/* Handles Special Instructions*/}
              <div className="space-y-2">
                <Label htmlFor="instructions">Special Instructions</Label>
                <Textarea
                  id="instructions"
                  placeholder="Any special requests, allergies..."
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
    </>
  );
}
