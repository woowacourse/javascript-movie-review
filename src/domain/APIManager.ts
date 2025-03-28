import { ASSET_PATHS, GENRE_MAP } from '../constants/systemConstants';
import { apiClient } from '../util/web/apiClient';

interface MovieListResponse {
  results: MovieListJSON[];
  total_pages: number;
  page: number;
  total_results: number;
}

interface MovieListJSON {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  vote_average: number;
  vote_count: number;
  video: boolean;
  adult: boolean;
}

export async function extractedData(url: string) {
  const movieJSON = await fetchMovieList(url);
  const movieListData = movieJSON.results.map((movieItem: MovieListJSON) => ({
    title: movieItem.title,
    imgUrl: `${ASSET_PATHS.IMAGE_BASE}${movieItem.poster_path}`,
    score: Number(movieItem.vote_average.toFixed(1)),
    category: movieItem.genre_ids.map((genre) => GENRE_MAP[genre]),
    description: movieItem.overview,
  }));

  const totalPage = movieJSON.total_pages;
  console.log(movieListData);
  return { movieListData, totalPage };
}

async function fetchMovieList(url: string) {
  return await apiClient<MovieListResponse>(url, { method: 'GET' });
}
