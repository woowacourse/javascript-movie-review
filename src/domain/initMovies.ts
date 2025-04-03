import getPopularMovies from '../api/getPopularMovies';
import { MovieType, ResponseType } from '../type';
import { bannerSkeletons } from '../view/render/skeleton/bannerSkeleton';
import { showMovieListSkeletons } from '../view/render/skeleton/showMovieListSkeletons';

export const initMovies = async (): Promise<ResponseType<MovieType>> => {
  bannerSkeletons();
  showMovieListSkeletons();

  const params = {
    page: '1',
    language: 'ko-KR'
  };

  const movies = await getPopularMovies(params);

  return movies;
};
