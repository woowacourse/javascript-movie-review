import Banner from '../Banner';
import { MovieType } from '../../type';
import { $ } from '../../util/selector';

export const renderBanner = async (movies: MovieType[]) => {
  const wrap = $('#wrap');

  const hasBackdropMovies = movies.filter((movie) => movie.backdropPath !== null);
  const bannerMovie = hasBackdropMovies.length ? hasBackdropMovies[0] : movies[0];

  wrap?.prepend(Banner({ movie: bannerMovie }));
};

export const removeBanner = () => {
  const banner = document.querySelector('header');
  banner?.remove();

  const main = document.querySelector('main');
  if (!main) return;
  main.classList.add('search-movie-main');
};
