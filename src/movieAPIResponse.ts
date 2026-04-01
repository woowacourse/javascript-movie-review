export const fetchMovies = async (moviePageCount: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${moviePageCount}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  return data;
};

export const fetchSearchedMovies = async (
  searchKeyword: string,
  searchPageCount: number,
) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&page=${searchPageCount}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
      },
    },
  );
  const data = await response.json();
  return data;
};
