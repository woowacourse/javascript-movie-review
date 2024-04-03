const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TOKEN;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

export async function fetchPopularMovies(pageCount: number) {
  const response = await fetch(`${BASE_URL}/movie/popular?language=ko&page=${pageCount}`, options);

  return response;
}

export async function fetchSearchMovies(query: string, presentPage: number) {
  const response = await fetch(`${BASE_URL}/search/movie?query=${query}&language=ko&page=${presentPage}`, options);

  return response;
}

export async function fetchMovieDetail(movieId: number) {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?language=ko`, options);

  return response;
}
