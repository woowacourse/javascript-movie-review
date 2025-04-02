import { SYSTEM_CONSTANTS } from '../../constants/systemConstants';
import { Movie, MovieDetail } from '../../../types/apiMovie';

export function convertToMovieData(movieitem: Movie) {
  return {
    id: movieitem.id,
    title: movieitem.title,
    imgUrl: `${SYSTEM_CONSTANTS.BASE_IMG_URL}${movieitem.poster_path}`,
    score: Number(movieitem.vote_average.toFixed(1)),
    overview: movieitem.overview,
  };
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
