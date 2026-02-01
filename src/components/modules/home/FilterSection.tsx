"use client";

import { Search, SlidersHorizontal, UtensilsCrossed, Leaf } from "lucide-react";
import { Input } from "@/components/ui/input";

export const FilterSection = ({ 
  searchTerm, setSearchTerm, 
  selectedCategory, setSelectedCategory, categories,
  dietary, setDietary,
  maxPrice, setMaxPrice 
}: any) => {
  return (
    <div className="w-full space-y-10 mb-16 bg-zinc-50/50 p-8 rounded-[2.5rem] border border-zinc-100">
      
      <div className="flex flex-col lg:flex-row gap-6 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
          <Input 
            className="h-14 pl-12 rounded-2xl border-none shadow-sm"
            placeholder="Search by meal name or cuisine..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-zinc-100">
          {["All", "Veg", "Non-Veg"].map((opt) => (
            <button
              key={opt}
              onClick={() => setDietary(opt)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${
                dietary === opt ? "bg-zinc-900 text-white shadow-md" : "text-zinc-500 hover:text-zinc-800"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
        
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
            <UtensilsCrossed size={12} /> Select Cuisine
          </label>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-[11px] font-bold border transition-all ${
                  selectedCategory === cat 
                  ? "bg-orange-600 border-orange-600 text-white shadow-lg shadow-orange-100" 
                  : "bg-white border-zinc-200 text-zinc-500 hover:border-zinc-400"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6 bg-white p-6 rounded-3xl border border-zinc-100">
          <div className="flex justify-between items-center">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Price Range</label>
            <span className="text-sm font-black text-orange-600">Up to ৳{maxPrice}</span>
          </div>
          <input 
            type="range"
            min="50"
            max="2000"
            step="50"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-100 rounded-lg appearance-none cursor-pointer accent-orange-600"
          />
          <div className="flex justify-between text-[10px] font-bold text-zinc-300">
            <span>৳50</span>
            <span>৳2000</span>
          </div>
        </div>

      </div>
    </div>
  );
};