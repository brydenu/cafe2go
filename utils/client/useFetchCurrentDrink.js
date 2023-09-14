import { useQuery } from "react-query";
import axios from "axios";

export function useFetchCurrentDrink(token) {
  const {
    data: currentDrink,
    isLoading,
    isError,
  } = useQuery("currentDrink", async () => {
    if (!token) {
      return { currentDrink: null, isLoading: "token", isError: false };
    }
    const response = await axios.get("/api/users/currentDrink", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  });

  return { currentDrink, isLoading, isError };
}
