import { STATUS_CODE_MESSAGE } from '../constants/errorMessage';
import { SYSTEM_CONSTANTS } from '../constants/systemConstants';
import { redirectToPage } from '../route/router';

export async function extractedData(url: string) {
  const movieList = await fetchMovieList(url);
  const movieListData = movieList.results.map((movieItem: MovieItem) => ({
    id: movieItem.id,
    title: movieItem.title,
    imgUrl: `${SYSTEM_CONSTANTS.BASE_IMG_URL}${movieItem.poster_path}`,
    score: Number(movieItem.vote_average.toFixed(1)),
    overview: movieItem.overview,
  }));

  const totalPage = movieList.total_pages;

  return { movieListData, totalPage };
}

export async function extractedMovieDetails(id: number) {
  const details = await fetchMovieDetail(SYSTEM_CONSTANTS.DETAIL_URL(id));
  return {
    id: details.id,
    title: details.title,
    imgUrl: `${SYSTEM_CONSTANTS.BASE_IMG_URL}${details.poster_path}`,
    score: Number(details.vote_average.toFixed(1)),
    overview: details.overview,
    genres: details.genres.map((genre: { name: string }) => genre.name).join(', '),
    release_date: details.release_date.split('-')[0],
  };
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

async function fetchMovieDetail(url: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNDFlZjU1NDhlYjJhMzcxNGVlZGU4ZDlhOTc5OTM4YiIsIm5iZiI6MTc0MjI3ODcxOC43OTIsInN1YiI6IjY3ZDkxMDNlYzUzMzllYWJjNjM2NTUxNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MWyqHYcKklHJtdt77FdqeixOePsLny3siiYW-VRDsIk',
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
