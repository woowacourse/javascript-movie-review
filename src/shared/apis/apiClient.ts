type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiOptions {
  headers?: Record<string, string>;
  body?: any;
}

const request = async (method: HttpMethod, endPoint: string, headers = {}) => {
  const API_URL = `https://api.themoviedb.org/3${endPoint}`;
  const options = {
    method,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
      ...headers,
    },
  };

  const response = await fetch(API_URL, options);
  if (!response.ok) {
    throw new Error("Failed to fetch movie list");
  }
  return response.json();
};

export const apiClient = {
  get: (url: string, options?: ApiOptions) => request("GET", url, options),
  post: (url: string, options?: ApiOptions) => request("POST", url, options),
  put: (url: string, options?: ApiOptions) => request("PUT", url, options),
  delete: (url: string, options?: ApiOptions) =>
    request("DELETE", url, options),
};
