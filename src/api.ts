const API_KEY = import.meta.env.VITE_API_KEY;

interface MoviesResponse {
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number,
}

interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: 'en';
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export async function getPopularMovies() {
  const url = 'https://api.themoviedb.org/3/movie/popular';
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`
    }
  };

  const response = await fetch(url, options);
  const data = await response.json() as unknown as MoviesResponse;
  return data;
}
