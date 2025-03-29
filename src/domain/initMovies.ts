import getPopularMovies from '../api/getPopularMovies';
import { bannerSkeletons } from '../view/render/skeleton/bannerSkeleton';
import { movieListSkeletons } from '../view/render/skeleton/movieListSkeletons';

export const initMovies = async () => {
  bannerSkeletons();
  movieListSkeletons();

  const params = {
    page: '1',
    language: 'ko-KR'
  };

  const movies = await getPopularMovies(params);

  return movies;
};
