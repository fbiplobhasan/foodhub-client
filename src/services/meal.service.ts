import { env } from "@/env";

const API_URL = env.API_URL;

export const mealService = {
  getMeal: async function () {
    try {
      const res = await fetch(`${API_URL}/api/meals`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err) {
      return { data: null, error: { message: "Something went wrong." } };
    }
  },
};
