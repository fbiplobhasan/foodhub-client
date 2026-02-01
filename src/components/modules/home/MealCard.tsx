import React from "react";
import { Star, Clock, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IMeal } from "@/types";

interface MealCardProps {
  meal: IMeal;
}

export const MealCard = ({ meal }: MealCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white transition-all hover:shadow-xl dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={meal.image}
          alt={meal.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

        {/* Wishlist Button */}
        <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-zinc-900 backdrop-blur-sm transition-colors hover:bg-white hover:text-red-500">
          <Heart size={18} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-amber-500">
            <Star size={16} fill="currentColor" />
            <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {meal.averageRating} ({meal.totalReviews})
            </span>
          </div>
          <div className="flex items-center gap-1 text-zinc-500 text-xs">
            <Clock size={14} />
            <span>20-30 min</span>
          </div>
        </div>

        <h3 className="mb-1 text-lg font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
          {meal.name}
        </h3>

        <p className="mb-4 text-sm text-zinc-500 line-clamp-2">
          {meal.description}
        </p>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-zinc-400 block">Price</span>
            <span className="text-xl font-extrabold text-orange-600">
              ${meal.price.toFixed(2)}
            </span>
          </div>

          <Button
            size="sm"
            className="bg-zinc-900 hover:bg-orange-600 text-white rounded-xl transition-colors"
            disabled={meal.status === "OUT_OF_STOCK"}
          >
            {meal.status === "AVAILABLE" ? (
              <>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add
              </>
            ) : (
              "Sold Out"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
