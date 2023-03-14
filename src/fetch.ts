const getAPIUrl = (params: string) =>
  `https://api.themoviedb.org/3${params}?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR`;

export const fetchPopularMovies = async () => {
  const API_URL = getAPIUrl('/movie/popular');
  const res = await fetch(API_URL);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
  }
};
