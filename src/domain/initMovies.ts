import getPopularMovies from '../api/getPopularMovies';
import { movieListSkeletons } from '../view/render/skeleton/movieListSkeletons';

export const initMovies = async () => {
  movieListSkeletons();

  const params = {
    page: '1',
    language: 'ko-KR'
  };

  const movies = await getPopularMovies(params);

  return movies;
};
