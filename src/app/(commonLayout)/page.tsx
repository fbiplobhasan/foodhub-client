import { AllMeals } from "@/components/modules/home/AllMeals";
import { MealCard } from "@/components/modules/home/MealCard";
import { mealService } from "@/services/meal.service";
import { IMeal } from "@/types";

export default async function Home() {
  const { data } = await mealService.getMeal();
  const allMeals = data?.data || [];
  console.log(data);

  return (
    <div className="px-6">
      <AllMeals allMeals={allMeals} />
    </div>
  );
}
