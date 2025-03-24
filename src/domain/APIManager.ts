import { ASSET_PATHS } from '../constants/systemConstants';
import { redirectToPage } from '../route/router';

interface MovieListJSON {
  id: number;
  title: string;
  original_title: string;
  release_date: string;
  overview: string;
  popularity: number;
  poster_path: string;
  backdrop_path: string | null;
  genres: number[];
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
  }));

  const totalPage = movieJSON.total_pages;

  return { movieListData, totalPage };
}

async function fetchMovieList(url: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (err: unknown) {
    if (err instanceof Error) {
      redirectToPage('/error');
    }
  }
}
