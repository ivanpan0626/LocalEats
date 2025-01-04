import { Card, CardContent, CardHeader, CardFooter } from "./card.jsx";
import { Badge } from "./badge.jsx";
import { Button } from "./button.jsx";
import { Flame, Plus, Minus } from "lucide-react";
export default function FeaturedItem({ item }) {
  return (
    <>
      <Card key={item.id} className="flex overflow-hidden">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-40 h-40 object-cover"
        />
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.description}</p>
            </div>
            <Button
              size="icon"
              onClick={() => onAddToCart(item)}
              className="shrink-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span className="font-semibold">${item.price.toFixed(2)}</span>
            <Badge variant="secondary" className="bg-yellow-100">
              Featured
            </Badge>
          </div>
        </div>
      </Card>
    </>
  );
}
