import { mealService } from "@/services/meal.service";
import { IMeal } from "@/types";
import { Store, MapPin, Star, Phone, ArrowLeft, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MealCard } from "@/components/modules/home/MealCard";

export default async function ProviderProfilePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  const { data } = await mealService.getMeal();

  console.log(data)

  const providerMeals =
    data?.data?.filter((meal: IMeal) => meal.providerId === id) || [];
  const provider = providerMeals[0]?.provider;

  if (!provider) {
    return (
      <div className="py-20 text-center font-medium">
        Provider details not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
      <div className="bg-zinc-50 dark:bg-zinc-900/50 border-b border-zinc-100 dark:border-zinc-800 pt-12 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <Link
            href="/"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 mb-8 transition-all w-fit"
          >
            <ArrowLeft size={18} />{" "}
            <span className="text-sm font-semibold">Back to Explore</span>
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-3xl bg-orange-600 flex items-center justify-center text-white shadow-xl shadow-orange-100 dark:shadow-none">
                <Store size={36} />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
                    {provider.storeName}
                  </h1>
                  <Badge className="bg-green-500/10 text-green-600 border-none text-[10px] font-bold">
                    VERIFIED
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin size={14} className="text-orange-500" />{" "}
                    {provider.address}
                  </span>
                  <span className="flex items-center gap-1 font-bold text-zinc-700 dark:text-zinc-300">
                    <Star size={14} className="text-amber-500 fill-amber-500" />{" "}
                    4.8 (50+ Ratings)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-xl border-zinc-200 gap-2 font-bold text-xs uppercase tracking-widest"
              >
                <Phone size={14} /> Contact
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl mt-12">
        <div className="flex items-center justify-between mb-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
              <Utensils size={20} className="text-orange-500" /> Available Menu
            </h2>
            <p className="text-sm text-zinc-400">
              Order fresh meals directly from this provider
            </p>
          </div>
          <Badge
            variant="secondary"
            className="px-4 py-1 rounded-full text-xs font-bold"
          >
            {providerMeals.length} Items
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {providerMeals.map((meal: IMeal) => (
            <MealCard key={meal.id} meal={meal} />
          ))}
        </div>

        {providerMeals.length === 0 && (
          <div className="text-center py-20 bg-zinc-50 rounded-[2rem] border-2 border-dashed border-zinc-100">
            <p className="text-zinc-400 font-medium">
              No meals found for this provider.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
