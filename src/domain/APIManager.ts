import { SYSTEM_CONSTANTS } from '../constants/systemConstants';
import { redirectToPage } from '../route/router';
import APIClient from './APIClient';

export async function extractedData(url: string) {
  try {
    const movieList = await APIClient.get(url);
    const movieListData = movieList.results.map((movieItem: MovieItem) => ({
      id: movieItem.id,
      title: movieItem.title,
      imgUrl: `${SYSTEM_CONSTANTS.BASE_IMG_URL}${movieItem.poster_path}`,
      score: Number(movieItem.vote_average.toFixed(1)),
      overview: movieItem.overview,
    }));

    return { movieListData, totalPage: movieList.total_pages };
  } catch (error) {
    redirectToPage('/error');
    throw error;
  }
}

export async function extractedMovieDetails(id: number) {
  try {
    const details = await APIClient.get(SYSTEM_CONSTANTS.DETAIL_URL(id));
    return {
      id: details.id,
      title: details.title,
      imgUrl: `${SYSTEM_CONSTANTS.BASE_IMG_URL}${details.poster_path}`,
      score: Number(details.vote_average.toFixed(1)),
      overview: details.overview,
      genres: details.genres.map((genre: { name: string }) => genre.name).join(', '),
      release_date: details.release_date.split('-')[0],
    };
  } catch (error) {
    redirectToPage('/error');
    throw error;
  }
}
