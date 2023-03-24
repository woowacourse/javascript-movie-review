import { generateMovieListTemplate } from '../components/templates/movieList';
import { movie, observer, proxy } from '../state/state';
import { $, $$ } from '../utils/dom';
import { getMoreMovieList } from './movieApi';

const options = {
  root: $('.item-list'),
  rootMargin: '0px',
  threshold: 1,
};

const callback = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  if (!entries[0].isIntersecting) return;

  observer.disconnect();
  const root = await getMoreMovieList(movie.query, movie.currentPage + 1);
  movie.currentPage = root.page;
  proxy.movie.list = [generateMovieListTemplate(root.results)];
};

export const initObserver = () => {
  observer.viewport = new IntersectionObserver(callback, options);
};

export const updateObserveTarget = () => {
  const movieList = [...$$<HTMLLIElement>('li')];
  const target = movieList.pop();

  if (target instanceof HTMLLIElement && observer.viewport) {
    observer.viewport.observe(target);
  }
};
