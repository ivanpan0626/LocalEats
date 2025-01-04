import { Flame, Plus, Minus } from "lucide-react";
import { Card } from "./card.jsx";
import { Badge } from "./badge.jsx";
import { Button } from "./button.jsx";

export default function RegularItem({ item, handleItem }) {
  if (!item) return null;
  return (
    <>
      <Card key={item.id} className="flex overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-32 h-32 object-cover"
        />
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
            <Button
              size="icon"
              onClick={() => handleItem(item)}
              className="shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="font-semibold">${item.price.toFixed(2)}</span>
            {item.isVegetarian && (
              <Badge variant="secondary" className="bg-green-100">
                Veg
              </Badge>
            )}
            {item.isSpicy && (
              <Flame className="h-4 w-4 text-red-500" fill="currentColor" />
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
