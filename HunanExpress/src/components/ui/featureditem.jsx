import { Card } from "./card.jsx";
import { Badge } from "./badge.jsx";
import { Button } from "./button.jsx";
import { Flame, Plus } from "lucide-react";

export default function FeaturedItem({ item, handleItem }) {
  return (
    <Card key={item.id} className="flex flex-col items-center p-2 relative">
      {/* Image Section */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-32 object-cover rounded-md"
      />

      {/* Price Badge */}
      <Badge
        variant="secondary"
        className="absolute top-2 right-2 text-xs bg-yellow-100 text-black"
      >
        ${item.price.toFixed(2)}
      </Badge>

      {/* Item Details */}
      <div className="flex-1 text-center mt-2">
        <h3 className="font-semibold text-sm">
          {item.name}
          {item.isSpicy && (
            <Flame
              className="h-4 w-4 text-red-500 inline ml-1"
              fill="currentColor"
            />
          )}
        </h3>
        <div className="mt-2 flex justify-center items-center">
          <Button
            size="icon"
            onClick={() => handleItem(item)}
            className="shrink-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
