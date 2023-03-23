import MovieContainer from '../components/MovieContainer';
import { generateMovieListTemplate } from '../components/templates/movieList';
import { CustomProxy, MovieProxy } from '../types/proxy';
import { searchMovieList } from './movieApi';

export const proxy: CustomProxy = {
  movie: { list: '', query: '', currentPage: 1, totalPages: 1 },
};

const handleList = (target: MovieProxy, props: string, value: string) => {
  target[props] = value;
  MovieContainer.renderContents(value);

  return true;
};

const handleQuery = (target: MovieProxy, props: string, value: string) => {
  if (proxy.movie.query === value) {
    return true;
  }

  target[props] = value;

  proxy.movie.currentPage = 1;
  searchMovieList(proxy.movie.query, proxy.movie.currentPage).then(movieRoot => {
    const movieResults = movieRoot.results;
    proxy.movie.totalPages = movieRoot.total_pages;
    proxy.movie.list = generateMovieListTemplate(movieResults);
  });

  return true;
};

const handleCurrentPage = (target: MovieProxy, props: string, value: number) => {
  target[props] = value;

  return true;
};

const handleTotalPages = (target: MovieProxy, props: string, value: number) => {
  target[props] = value;

  return true;
};

const movieProxyHandler = {
  set: (target: MovieProxy, props: string, value: string | number) => {
    if (props === 'list' && typeof value === 'string') {
      return handleList(target, props, value);
    }

    if (props === 'currentPage' && typeof value === 'number') {
      return handleCurrentPage(target, props, value);
    }

    if (props === 'query' && typeof value === 'string') {
      return handleQuery(target, props, value);
    }

    if (props === 'totalPages' && typeof value === 'number') {
      return handleTotalPages(target, props, value);
    }

    return false;
  },
};

export const initProxy = (props: CustomProxy) => {
  proxy.movie = new Proxy(props.movie, movieProxyHandler);
};
