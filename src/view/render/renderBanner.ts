import Banner from '../Banner';
import Skeleton from '../../component/Skeleton';
import { MoveType } from '../../type';
import { $ } from '../../util/selector';

export const renderBanner = async (movies: MoveType[]) => {
  const wrap = $('#wrap');

  const bannerSkeleton = Skeleton({ height: 500 });
  wrap?.prepend(bannerSkeleton);

  const hasBackdropMovies = movies.filter((movie) => movie.backdropPath !== null);
  const bannerMovie = hasBackdropMovies.length ? hasBackdropMovies[0] : movies[0];

  bannerSkeleton?.replaceWith(Banner({ movie: bannerMovie }));
};

export const removeBanner = () => {
  const banner = document.querySelector('header');
  banner?.remove();

  const main = document.querySelector('main');
  if (!main) return;
  main.classList.add('search-movie-main');
};
