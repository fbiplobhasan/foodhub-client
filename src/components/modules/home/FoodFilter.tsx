"use client";

import { useState } from "react";
import { Search, Utensils, Pizza, Coffee, Cake, Hamburger } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const categories = [
  { name: "All", icon: <Utensils size={18} /> },
  { name: "Pizza", icon: <Pizza size={18} /> },
  { name: "Burger", icon: <Hamburger size={18} /> },
  { name: "Coffee", icon: <Coffee size={18} /> },
  { name: "Dessert", icon: <Cake size={18} /> },
];

export default function FoodFilter() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="space-y-8 mb-12">
      {/* Search Bar Section */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-zinc-400 size-5" />
        </div>
        <Input 
          type="text" 
          placeholder="Search for delicious food..." 
          className="h-16 pl-12 pr-4 rounded-[2rem] border-zinc-100 shadow-xl shadow-orange-100/50 text-lg focus-visible:ring-orange-500 transition-all"
        />
        <Button className="absolute right-2 top-2 h-12 px-8 rounded-2xl bg-orange-600 hover:bg-zinc-900 transition-all font-bold uppercase tracking-widest text-xs">
          Search
        </Button>
      </div>

      {/* Categories Filter */}
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={cn(
              "flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all border",
              activeCategory === cat.name
                ? "bg-zinc-900 text-white border-zinc-900 shadow-lg scale-105"
                : "bg-white text-zinc-500 border-zinc-100 hover:border-orange-200 hover:text-orange-600"
            )}
          >
            {cat.icon}
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}