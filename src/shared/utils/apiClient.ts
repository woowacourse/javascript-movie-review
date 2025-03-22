type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export const apiClient = async (
  method: HttpMethod,
  endPoint: string,
  headers = {}
) => {
  const url = `https://api.themoviedb.org/3${endPoint}`;
  const options = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      ...headers,
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Failed to fetch movie list");
  }
  return response.json();
};
