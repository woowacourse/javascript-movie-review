import { SYSTEM_CONSTANTS } from '../constants/systemConstants';

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

export async function extractedMovieData(page: number = 1) {
  const movieJSON = await fetchMovieList(page);
  const movieListData = movieJSON.map((movieItem: MovieListJSON) => ({
    title: movieItem.title,
    imgUrl: `${SYSTEM_CONSTANTS.BASE_IMG_URL}${movieItem.poster_path}`,
    score: Number(movieItem.vote_average.toFixed(1)),
  }));

  return movieListData;
}

async function fetchMovieList(page: number) {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
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
    return json.results;
  } catch (err) {
    console.error(err);
    return null;
  }
}
