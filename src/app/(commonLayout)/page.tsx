import { AllMeals } from "@/components/modules/home/AllMeals";
import FoodFilter from "@/components/modules/home/FoodFilter";
import { mealService } from "@/services/meal.service";

export default async function Home() {
  const { data } = await mealService.getMeal();
  const allMeals = data?.data || [];
  console.log(data);

  return (
    <div className="px-6">
      {/* <FoodFilter/> */}
      <AllMeals allMeals={allMeals} />
    </div>
  );
}
