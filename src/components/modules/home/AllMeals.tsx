"use client";

import { useState } from "react";
import { IMeal } from "@/types";
import { MealCard } from "./MealCard";
import { FilterSection } from "./FilterSection";

export const AllMeals = ({ allMeals }: { allMeals: IMeal[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dietary, setDietary] = useState("All");
  const [maxPrice, setMaxPrice] = useState(1000);

  const categories = Array.from(
    new Set(allMeals.map((m) => m.category?.name).filter(Boolean)),
  ) as string[];

  const filteredMeals = allMeals.filter((meal) => {
    const matchesSearch = meal.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || meal.category?.name === selectedCategory;
    const matchesPrice = meal.price <= maxPrice;

    const matchesDietary =
      dietary === "All" ||
      (dietary === "Veg"
        ? meal.dietaryType === "VEG"
        : meal.dietaryType === "NON_VEG");

    return matchesSearch && matchesCategory && matchesPrice && matchesDietary;
  });

  return (
    <>
      <FilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        dietary={dietary} 
        setDietary={setDietary} 
        maxPrice={maxPrice} 
        setMaxPrice={setMaxPrice}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredMeals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>

      {filteredMeals.length === 0 && (
        <div className="text-center py-20 text-zinc-400 font-medium">
          No meals found matching your search.
        </div>
      )}
    </>
  );
};
