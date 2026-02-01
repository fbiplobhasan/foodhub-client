import { MealCard } from "@/components/modules/home/MealCard";
import { mealService } from "@/services/meal.service";
import { IMeal } from "@/types";

export default async function Home() {
  const { data } = await mealService.getMeal();
  console.log(data);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
      {data?.data?.map((item: IMeal) => (
        <MealCard key={item.id} meal={item} />
      ))}
    </div>
  );
}
