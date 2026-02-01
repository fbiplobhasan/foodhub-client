"use client";

import { ShoppingCart, Heart, Store, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { IMeal } from "@/types";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import Image from "next/image"; 
import { toast } from "sonner";

interface MealCardProps {
  meal: IMeal;
}

export const MealCard = ({ meal }: MealCardProps) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="group relative overflow-hidden rounded-[2rem] bg-white transition-all hover:shadow-2xl dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-800 flex flex-col h-full">
      
      {/* ইমেজ সেকশন */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        <Image
          src={meal.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c"}
          alt={meal.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <button className="absolute right-3 top-3 rounded-full bg-white/80 p-2 text-zinc-900 backdrop-blur-md transition-all hover:bg-white hover:text-red-500 shadow-sm active:scale-90 z-10">
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
          className="mb-4 flex items-center gap-2 border-b border-zinc-50 dark:border-zinc-800 pb-3 hover:opacity-80 transition-opacity"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            <Store size={14} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[9px] font-black uppercase text-zinc-400 leading-none">Provider</span>
            <h4 className="text-[12px] font-bold text-zinc-700 dark:text-zinc-300 line-clamp-1">
              {meal.provider?.storeName}
            </h4>
          </div>
        </Link>

        <div className="mb-2">
          <Badge variant="secondary" className="mb-1 text-[10px] bg-zinc-100 text-zinc-500 font-bold uppercase tracking-widest">
            {meal.category?.name}
          </Badge>
          <h3 className="text-xl font-black text-zinc-900 dark:text-zinc-50 line-clamp-1 group-hover:text-orange-600 transition-colors">
            {meal.name}
          </h3>
        </div>

        <p className="text-sm text-zinc-500 line-clamp-2 mb-4">
          {meal.description}
        </p>

        <div className="flex items-start gap-1 text-[11px] text-zinc-400 mb-6">
          <MapPin size={12} className="mt-0.5 flex-shrink-0 text-orange-500" />
          <span className="line-clamp-1">{meal.provider?.address}</span>
        </div>

        <div className="mt-auto space-y-3">
          <div className="flex items-center justify-between pt-4 border-t border-zinc-50 dark:border-zinc-800 mb-2">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Price</span>
              <span className="text-2xl font-black text-zinc-900 dark:text-white">৳{meal.price}</span>
            </div>

            <Button
              onClick={() => {addToCart(meal);toast.success(`${meal.name} added to cart! 🍔`)}}
              size="sm"
              className="rounded-2xl bg-zinc-900 hover:bg-orange-600 text-white px-6 font-bold shadow-lg shadow-zinc-200 dark:shadow-none active:scale-95 transition-all"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>

          <Link href={`/meals/${meal.id}`} className="block">
            <Button
              variant="outline"
              className="w-full rounded-2xl border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-zinc-900 hover:text-zinc-900 font-bold uppercase tracking-tighter text-[11px] h-11 gap-2"
            >
              Details <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};