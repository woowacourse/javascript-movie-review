import MovieContainer from '../components/MovieContainer';
import { movie, proxy } from '../state/state';
import { MovieProxy } from '../types/proxy';

const handleList = (target: MovieProxy, props: string, value: string) => {
  target[props] = value;
  MovieContainer.renderContents(value);

  return true;
};

const movieProxyHandler = {
  set: (target: MovieProxy, props: string, value: string | number) => {
    if (props === 'list' && typeof value === 'string') {
      return handleList(target, props, value);
    }

    return false;
  },
};

export const initProxy = () => {
  proxy.movie = new Proxy(movie, movieProxyHandler);
};
