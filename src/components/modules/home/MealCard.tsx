import React from "react";
import { ShoppingCart, Heart, Store, MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IMeal } from "@/types";
import Link from "next/link";

interface MealCardProps {
  meal: IMeal;
}

export const MealCard = ({ meal }: MealCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white transition-all hover:shadow-2xl dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <img
          src={
            meal.image ||
            "https://via.placeholder.com/400x300?text=No+Food+Image"
          }
          alt={meal.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-zinc-900 backdrop-blur-md transition-all hover:bg-white hover:text-red-500 shadow-sm active:scale-90">
          <Heart size={18} />
        </button>

        <Badge
          className={`absolute left-3 top-3 border-none text-white ${
            meal.dietaryType === "VEG" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {meal.dietaryType === "NON_VEG" ? "Non-Veg" : "Veg"}
        </Badge>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <Link
          href={`/providers/${meal.providerId}`}
          className="mb-3 flex items-center gap-2 border-b border-zinc-50 dark:border-zinc-800 pb-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Store size={14} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[9px] font-bold uppercase text-zinc-400 leading-none">
              Provider
            </span>
            <h4 className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 line-clamp-1 group-hover:text-orange-600">
              {meal.provider?.storeName}
            </h4>
          </div>
        </Link>

        <div className="mb-2">
          <Badge
            variant="secondary"
            className="mb-1 text-[10px] bg-zinc-100 text-zinc-600 dark:bg-zinc-800"
          >
            {meal.category?.name}
          </Badge>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {meal.name}
          </h3>
        </div>

        <p className="text-sm text-zinc-500 line-clamp-2 mb-4 h-10">
          {meal.description}
        </p>

        <div className="flex items-start gap-1 text-[11px] text-zinc-400 mb-4">
          <MapPin size={12} className="mt-0.5 flex-shrink-0 text-orange-500" />
          <span className="line-clamp-1">{meal.provider?.address}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-zinc-400">Price</span>
            <span className="text-2xl font-black text-zinc-900 dark:text-white">
              ৳{meal.price}
            </span>
          </div>

          <Button
            size="sm"
            className="rounded-2xl bg-zinc-900 hover:bg-orange-600 text-white px-5 font-bold transition-all active:scale-95"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};
