import { Button } from "@/components/ui/button";
import { mealService } from "@/services/meal.service";
import { IMeal } from "@/types";
import {
  ArrowLeft,
  Badge,
  Heart,
  ShieldCheck,
  ShoppingCart,
  Store,
} from "lucide-react";
import Link from "next/link";

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await mealService.getMeal();
  const meal: IMeal = data?.data?.find((item: IMeal) => item.id === id);

  if (!meal) {
    return <div className="text-center py-20">Meal not found!</div>;
  }
  return (
    <div className=" bg-white dark:bg-zinc-950 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center py-6">
          <Link
            href="/"
            className="p-2 rounded-full bg-zinc-50 hover:bg-zinc-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-zinc-600" />
          </Link>
          <button className="p-2 rounded-full bg-zinc-50 text-zinc-300 hover:text-red-500">
            <Heart size={20} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-zinc-50/50 dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800">
          <div className="aspect-square rounded-3xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-zinc-800 dark:to-zinc-900 flex flex-col items-center justify-center p-8 text-center border-2 border-white dark:border-zinc-700 shadow-inner">
            <span className="text-orange-500/20 font-black text-8xl absolute select-none italic">
              {meal.name.charAt(0)}
            </span>
            <Badge className="mb-4 bg-orange-500 border-none uppercase text-[10px] tracking-widest">
              {meal.category?.name}
            </Badge>
            <h2 className="text-2xl font-black text-zinc-800 dark:text-zinc-200 z-10">
              {meal.name}
            </h2>
            <p className="text-[10px] text-zinc-400 mt-2 uppercase tracking-tighter">
              No Image Provided
            </p>
          </div>

          <div className="flex flex-col space-y-5">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 leading-tight">
                {meal.name}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Store size={14} className="text-orange-500" />
                <span className="text-xs font-bold text-zinc-500">
                  {meal.provider?.storeName}
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed italic line-clamp-3">
              "
              {meal.description ||
                "A delicious culinary experience prepared with fresh ingredients and traditional spices."}
              "
            </p>

            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-zinc-900 dark:text-white">
                ৳{meal.price}
              </span>
              <span className="text-sm text-zinc-300 line-through mb-1">
                ৳{meal.price + 50}
              </span>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-900 hover:text-white font-bold uppercase tracking-widest text-xs transition-all active:scale-95"
              >
                <ShoppingCart className="mr-2" size={18} /> Buy This Item
              </Button>

              <div className="flex justify-between items-center px-2">
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase">
                  <ShieldCheck size={12} className="text-green-500" /> Hygiene
                  First
                </div>
                <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-bold uppercase">
                  <ShieldCheck size={12} className="text-green-500" /> Freshness
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
