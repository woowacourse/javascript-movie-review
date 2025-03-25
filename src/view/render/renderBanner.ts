import Banner from '../../component/Banner';
import Skeleton from '../../component/Skeleton';
import { IMovie } from '../../type';
import { $ } from '../../util/selector';

export const renderBanner = async (movies: IMovie[]) => {
  const wrap = $('#wrap');

  const bannerSkeleton = Skeleton({ height: 500 });
  wrap?.prepend(bannerSkeleton);

  const hasBackdropMovies = movies.filter((movie) => movie.backdrop_path !== null);
  const bannerMovie = hasBackdropMovies.length ? hasBackdropMovies[0] : movies[0];

  bannerSkeleton?.replaceWith(Banner({ movie: bannerMovie }));
};
