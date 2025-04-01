import getPopularMovies from '../api/getPopularMovies';
import { MovieType, ResponseType } from '../type';
import { bannerSkeletons } from '../view/render/skeleton/bannerSkeleton';
import { movieListSkeletons } from '../view/render/skeleton/movieListSkeletons';

export const initMovies = async (): Promise<ResponseType<MovieType>> => {
  bannerSkeletons();
  movieListSkeletons();

  const params = {
    page: '1',
    language: 'ko-KR'
  };

  const movies = await getPopularMovies(params);

  return movies;
};
