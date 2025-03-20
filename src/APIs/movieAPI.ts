import { Movie, MovieResponse } from "../../types/movie";

export const fetchPopularMovies = async (
  page: number = 1
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_TMDB_API_URL
      }/movie/popular?language=ko-KR&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "영화 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요."
      );
    }

    const data = await response.json();
    return data.results;
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message);
    }
    return [];
  }
};

export const fetchSearchedMovies = async (
  query: string,
  page: number = 1
): Promise<MovieResponse | null> => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_TMDB_API_URL
      }/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "영화 정보를 불러오는 데 실패했습니다. 다시 시도해 주세요."
      );
    }

    const data = await response.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      alert(error.message);
    }
    return null;
  }
};
