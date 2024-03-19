const getMovieListByQuery = async ({
  page,
  query,
}: {
  page: number;
  query: string;
}) => {
  const url = "https://api.themoviedb.org/3/search/movie";
  const queryParams = `language=ko-KR&page=${page}&query=${query}&api_key=${process.env.API_KEY}`;
  const moviesUrl = `${url}?${queryParams}`;

  const res = await fetch(moviesUrl);
  const movieList = await res.json();

  return movieList;
};

export default getMovieListByQuery;
