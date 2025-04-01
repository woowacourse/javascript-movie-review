import getPopularMovies from '../api/getPopularMovies';
import { errorUi } from '../view/errorUi';
import { bannerSkeletons } from '../view/render/skeleton/bannerSkeleton';
import { movieListSkeletons } from '../view/render/skeleton/movieListSkeletons';

export const initMovies = async () => {
  try {
    bannerSkeletons();
    movieListSkeletons();

    const params = {
      page: '1',
      language: 'ko-KR'
    };

    const movies = await getPopularMovies(params);

    return movies;
  } catch (error) {
    if (error instanceof Error) {
      errorUi(error.message);
    }
  }
};
