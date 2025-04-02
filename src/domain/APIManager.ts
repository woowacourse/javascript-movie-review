import { SYSTEM_CONSTANTS } from '../constants/systemConstants';
import { redirectToPage } from '../route/router';
import APIClient from './APIClient';
import { Movie, MovieDetail } from '../../types/apiMovie';

export async function extractedData(url: string) {
  try {
    const movieList = await APIClient.get(url);
    const movieListData = movieList.results.map((movie: Movie) => convertToMovieData(movie));
    return { movieListData, totalPage: movieList.total_pages };
  } catch (error) {
    redirectToPage('/error');
    throw error;
  }
}

function convertToMovieData(movieitem: Movie) {
  return {
    id: movieitem.id,
    title: movieitem.title,
    imgUrl: `${SYSTEM_CONSTANTS.BASE_IMG_URL}${movieitem.poster_path}`,
    score: Number(movieitem.vote_average.toFixed(1)),
    overview: movieitem.overview,
  };
}

export async function extractedMovieDetails(id: number) {
  try {
    const details = await APIClient.get(SYSTEM_CONSTANTS.DETAIL_URL(id));
    return convertToMovieDetailData(details);
  } catch (error) {
    redirectToPage('/error');
    throw error;
  }
}

export function convertToMovieDetailData(details: MovieDetail) {
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
