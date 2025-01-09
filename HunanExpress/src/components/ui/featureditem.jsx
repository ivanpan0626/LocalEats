import { Card } from "./card.jsx";
import { Badge } from "./badge.jsx";
import { Button } from "./button.jsx";
import { Flame, Plus } from "lucide-react";

export default function FeaturedItem({ item, handleItem }) {
  return (
    <div key={item.id} className="shrink-0 w-[185px]">
    <Card className="flex flex-col items-center p-2 relative">
      {/* Image Section */}
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-[165px] object-cover rounded-md"
      />

      {/* Price Badge */}
      <Badge
        variant="secondary"
        className="absolute top-2 right-2 text-xs bg-white text-black"
      >
        ${item.price.toFixed(2)}
      </Badge>
       {/* Item Details */}
      <Button
            size="icon"
            onClick={() => handleItem(item)}
            className="absolute bottom-2 bg-white right-2"
          >
            <Plus className="h-4 w-4 text-black" />
          </Button>
    </Card>
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
            </div>
            </div>
  );
}
