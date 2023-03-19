import { MovieItemType, MovieSubscribserType } from '../type/movie';

export default class Observable {
  observer: MovieSubscribserType;

  constructor() {
    this.observer = {
      movies: [],
      loading: [],
    };
  }

  subscribe(
    key: keyof MovieSubscribserType,
    method: (value?: MovieItemType[]) => void
  ) {
    this.observer[key].push(method);
  }

  notify(key: keyof MovieSubscribserType, newData?: MovieItemType[]) {
    this.observer[key].forEach((method) => method(newData));
  }
}
