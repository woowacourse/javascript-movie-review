import { Movie } from "../components/movie/types";

export interface MovieData {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const getSearchedMovies = async (
  searchKeyword: string,
  pageNumber = 1
) => {
  const query = encodeURIComponent(searchKeyword);

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${pageNumber}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("성공적으로 받아오지 못했습니다.");
    }

    const response = await res.json();

    return (
      response ?? {
        results: [],
        page: 1,
        total_pages: 1,
        total_results: 0,
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
