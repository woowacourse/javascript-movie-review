import { MOVIE_POPULAR_API, MOVIE_SEARCH_API } from "./api/movie";

export const mostPopular = async (pageNumber: number) => {
  const response = await fetch(MOVIE_POPULAR_API(pageNumber), {
    method: "GET",
  });

  if (response.ok) {
    const result = await response.json();

    return result;
  }
  return null;
};

export const search = async (query: string, pageNumber: number) => {
  const response = await fetch(MOVIE_SEARCH_API(query, pageNumber), {
    method: "GET",
  });

  if (response.ok) {
    const result = await response.json();

    return result;
  }
  return null;
};
