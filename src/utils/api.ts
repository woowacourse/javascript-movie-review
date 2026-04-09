interface FetchOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
}

export const apiRequest = async <T>({
  url,
  method = "GET",
}: FetchOptions): Promise<T> => {
  return await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
    method,
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
