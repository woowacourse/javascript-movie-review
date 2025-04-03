import { ERROR_MESSAGES } from "../constants/config";
import store from "../store/store";

type FetchAPIOptions = {
  url: string;
  params?: Record<string, string | number>;
};

export const fetchAPI = async <T>({
  url,
  params,
}: FetchAPIOptions): Promise<T | null> => {
  const query = params
    ? `?${new URLSearchParams(
        Object.entries(params).reduce((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {} as Record<string, string>)
      ).toString()}`
    : "";

  try {
    const response = await fetch(
      `${import.meta.env.VITE_TMDB_API_URL}${url}${query}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) throw new Error(ERROR_MESSAGES.MOVIE_FETCH_FAILED);

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      store.setErrorMessage(error.message);
    }
    return null;
  }
};
