const getPopularMovieList = async ({ page }: { page: number }) => {
  const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`;

  const res = await fetch(popularMoviesUrl);
  const popularMovieList = await res.json();

  return popularMovieList;
};

export default getPopularMovieList;
