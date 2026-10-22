import { useQuery } from "@tanstack/react-query";
import { fetchMeals } from "../api/meals";

export function useMeals() {
  return useQuery({
    queryKey: ["meals"],
    queryFn: fetchMeals,
  });
}
