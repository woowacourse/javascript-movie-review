const getPopularMovieList = async ({ page }: { page: number }) => {
  const url = "https://api.themoviedb.org/3/movie/popular";
  const queryParams = `language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`;
  const popularMoviesUrl = `${url}?${queryParams}`;

  const res = await fetch(popularMoviesUrl);
  const popularMovieList = await res.json();

  return popularMovieList;
};

export default getPopularMovieList;
