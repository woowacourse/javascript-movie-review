import TMDBResponse from "../types/TMDBResponse";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  },
};

const isValidPage = (page: number) =>
  Number.isInteger(page) && 1 <= page && page <= 500;

export const fetchFavoriteMovie = async (
  page: number
): Promise<TMDBResponse | null> => {
  if (!isValidPage(page)) return null;

  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;

  const res = await fetch(url, options);
  const tmdbResponse: TMDBResponse = await res.json();

  return tmdbResponse;
};

export const fetchTargetMovie = async (
  movieName: string,
  page: number
): Promise<TMDBResponse | null> => {
  if (!isValidPage(page)) return null;

  const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=ko-KR&page=${page}`;

  const res = await fetch(url, options);
  const tmdbResponse: TMDBResponse = await res.json();

  return tmdbResponse;
};
