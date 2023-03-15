const getAPIUrl = (params: string, page = 1) =>
  `https://api.themoviedb.org/3${params}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${page}`;

export const fetchPopularMovies = async (page: number) => {
  const API_URL = getAPIUrl('/movie/popular', page);
  const res = await fetch(API_URL);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};

export const fetchSearchMovie = async (query: string) => {
  const API_URL = `${getAPIUrl('/search/movie')}&query=${query}`;
  const res = await fetch(API_URL);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
