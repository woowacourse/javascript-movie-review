const getAPIUrl = (params: string, page = 1, query = '') =>
  `https://api.themoviedb.org/3${params}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${page}&query=${query}`;

export const fetchMovies = async (params: string, page = 1, query = '') => {
  const API_URL = getAPIUrl(params, page, query);
  const res = await fetch(API_URL);
  try {
    const data = await res.json();
    return { movies: data.results, total_pages: data.total_pages };
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
