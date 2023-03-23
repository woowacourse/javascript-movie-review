import MovieContainer from '../components/MovieContainer';
import { generateMovieListTemplate } from '../components/templates/movieList';
import { CustomProxy, MovieProxy } from '../types/proxy';
import { getMoreMovieList, searchMovieList } from './movieApi';

export const proxy: CustomProxy = {
  movie: { list: '', currentPage: 1, query: '' },
};

const handleList = (target: MovieProxy, props: string, value: string) => {
  target[props] = value;
  MovieContainer.renderContents(value);

  return true;
};

const handleQuery = (target: MovieProxy, props: string, value: string) => {
  target[props] = value;

  searchMovieList(proxy.movie.query, proxy.movie.currentPage).then(result => {
    proxy.movie.currentPage = 1;
    const movieResults = result.results;
    proxy.movie.list = generateMovieListTemplate(movieResults);
  });

  return true;
};

const handleCurrentPage = (target: MovieProxy, props: string, value: number) => {
  target[props] = value;

  getMoreMovieList(proxy.movie.query, proxy.movie.currentPage).then(result => {
    const movieResults = result.results;
    proxy.movie.list += generateMovieListTemplate(movieResults);
  });

  return true;
};

const movieProxyHandler = {
  set: (target: MovieProxy, props: string, value: string | number) => {
    if (props === 'list' && typeof value === 'string') {
      return handleList(target, props, value);
    }

    if (props === 'query' && typeof value === 'string') {
      return handleQuery(target, props, value);
    }

    if (props === 'currentPage' && typeof value === 'number') {
      return handleCurrentPage(target, props, value);
    }

    return false;
  },
};

export const initProxy = (props: CustomProxy) => {
  proxy.movie = new Proxy(props.movie, movieProxyHandler);
};
