interface FetchOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const apiRequest = async <T>({
  url,
  method = "GET",
}: FetchOptions): Promise<T> => {
  return await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
