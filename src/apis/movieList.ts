const BASE_URL = "https://api.themoviedb.org/3/movie";

const POPULAR_MOVIE_LIST_PATH = "/popular";

export const getPopularMovieList = async (page: number) => {
  const response = await fetch(
    `${BASE_URL}${POPULAR_MOVIE_LIST_PATH}?language=ko-KR&page=${page}`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_ACCESS_KEY}`,
      },
    }
  );
  const movieList = await response.json();

  return movieList;
};
