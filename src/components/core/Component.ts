// store
import { useObserverState } from '../atoms/useObserverState';
import { StateType } from '../atoms/Store';
import { store } from '../atoms/Observer';

// components
import Header from '../Header';
import Title from '../Title';
import SeeMore from '../SeeMore';
import MovieListContainer from '../MovieList/MovieListContainer';

type ComponentType = {
  header?: Header;
  movieListContainer?: MovieListContainer;
  title?: Title;
  seeMore?: SeeMore;
};

export default abstract class Component {
  component: ComponentType = {};

  useState() {
    const proxyState = store(this.render.bind(this));
    const stateKey: (keyof StateType)[] = [
      'movies',
      'popularPage',
      'searchPage',
      'isSearched',
      'isEnd',
      'query',
      'isLoading',
    ];
    stateKey.forEach((value) => useObserverState(proxyState).getValue(value));
    return useObserverState(proxyState);
  }

  setComponentInstance<T extends keyof ComponentType>(
    key: T,
    instance: ComponentType[T]
  ) {
    this.component[key] = instance;
  }

  abstract render(): void;
}
