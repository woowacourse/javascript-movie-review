import { HttpClient } from "./HttpClient";
import { TMDBApi } from "./TMDBApi";

export const createApi = (errorRenderer: () => void) => {
  const headers = {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
  };
  const client = new HttpClient("", headers, errorRenderer);
  return new TMDBApi(client);
};
