import MovieContainer from '../components/MovieContainer';
import { CustomProxy, MovieProxy } from '../types/proxy';

export const proxy: CustomProxy = {
  movie: { list: '', currentPage: 1, query: '' },
};

const updateMovieList = (target: MovieProxy, props: string, value: string) => {
  target[props] = value;
  MovieContainer.renderContents(value);

  return true;
};

const searchMovieList = (target: MovieProxy, props: string, value: string) => {
  target[props] = value;
  proxy.movie.currentPage = 1;

  return true;
};

const updateCurrentPage = (target: MovieProxy, props: string, value: number) => {
  target[props] = value;

  return true;
};

const movieProxyHandler = {
  set: (target: MovieProxy, props: string, value: string | number) => {
    if (props === 'list' && typeof value === 'string') {
      return updateMovieList(target, props, value);
    }

    if (props === 'query' && typeof value === 'string') {
      return searchMovieList(target, props, value);
    }

    if (props === 'currentPage' && typeof value === 'number') {
      return updateCurrentPage(target, props, value);
    }

    return false;
  },
};

export const initProxy = (props: CustomProxy) => {
  proxy.movie = new Proxy(props.movie, movieProxyHandler);
};
