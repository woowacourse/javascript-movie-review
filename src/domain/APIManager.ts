import { STATUS_CODE_MESSAGE } from '../constants/errorMessage';
import { SYSTEM_CONSTANTS } from '../constants/systemConstants';
import { redirectToPage } from '../route/router';

interface MovieItem {
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
  const movieList = await fetchMovieList(url);
  const movieListData = movieList.results.map((movieItem: MovieItem) => ({
    title: movieItem.title,
    imgUrl: `${SYSTEM_CONSTANTS.BASE_IMG_URL}${movieItem.poster_path}`,
    score: Number(movieItem.vote_average.toFixed(1)),
  }));

  const totalPage = movieList.total_pages;

  return { movieListData, totalPage };
}

function fetchErrorHandler(error: Error) {
  redirectToPage('/error');
  throw new Error(`${error.message} 에러가 발생했습니다.`);
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
    const response = await fetch(url, options);
    if (!response.ok) errorHandlerByStatusCode(response.status);

    const responsedData = await response.json();
    return responsedData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      fetchErrorHandler(error);
    }
  }
}

function errorHandlerByStatusCode(statusCode: number) {
  const errorMessage = STATUS_CODE_MESSAGE[statusCode] ?? `${statusCode} 에러가 발생했습니다.`;
  redirectToPage('/error');
  throw new Error(errorMessage);
}
