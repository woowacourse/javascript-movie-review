import MovieContainer from '../components/MovieContainer';
import { movie, proxy } from '../state/state';
import { MovieProxy } from '../types/proxy';

const handleList = (target: MovieProxy, props: string, value: string[]) => {
  target[props] = value;
  const movieListTemplate = value.join('');
  MovieContainer.renderContents(movieListTemplate);

  return true;
};

const movieProxyHandler = {
  set: (target: MovieProxy, props: string, value: string[]) => {
    if (typeof value === typeof ['']) {
      return handleList(target, props, value);
    }

    return false;
  },
};

export const initProxy = () => {
  proxy.movie = new Proxy(movie, movieProxyHandler);
};
