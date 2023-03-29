import { $, $$ } from '../utils/dom';
import { movie, observer, proxy } from '../state/state';
import { getMoreMovieList } from './movieApi';
import { generateMovieListTemplate } from '../components/templates/movieList';
import { isMovieRoot } from '../types/typeGuards';

const options = {
  root: $<HTMLUListElement>('.item-list'),
  rootMargin: '0px',
  threshold: 1,
};

const callback = async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
  if (!entries[0].isIntersecting) return;

  observer.disconnect();
  const root = await getMoreMovieList(movie.query, movie.currentPage + 1);
  if (isMovieRoot(root)) {
    movie.currentPage = root.page;
    proxy.movie.list = generateMovieListTemplate(root.results);
  }
};

export const initObserver = () => {
  observer.viewport = new IntersectionObserver(callback, options);
};

export const updateObserveTarget = () => {
  const movieList = [...$$<HTMLLIElement>('li')];
  const target = movieList.pop();

  if (target instanceof HTMLLIElement && observer.viewport && movie.currentPage != movie.totalPages) {
    observer.viewport.observe(target);
  }
};
