import { TMDB_API_KEY } from "./apiKey";

export const mostPopular = async () => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=ko-KR&page=1`,
    { method: "GET" }
  );
  const result = await response.json();
  console.log(result);

  return result;
};

export const search = async (query: String) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&language=ko-KR&query=${query}page=1&include_adult=false`,
    { method: "GET" }
  );
  const result = await response.json();

  return result;
};
