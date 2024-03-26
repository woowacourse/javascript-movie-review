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

export const fetchPopularMovie = async (
  page: number
): Promise<TMDBResponse> => {
  if (!isValidPage(page)) throw new Error();
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;

  const res = await fetch(url, options);

  return (await res.json()) as TMDBResponse;
};

export const fetchTargetMovie = async (
  page: number,
  movieName: string
): Promise<TMDBResponse> => {
  if (!isValidPage(page)) throw new Error();
  const url = `https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=ko-KR&page=${page}`;

  const res = await fetch(url, options);

  return (await res.json()) as TMDBResponse;
};
