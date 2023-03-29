import {
  MovieDetailType,
  MovieItemType,
  MovieSubscriberType,
} from '../type/movie';

export default class Observable {
  private observer: MovieSubscriberType;

  constructor() {
    this.observer = {
      movies: [],
      loading: [],
      unloading: [],
      detail: [],
      error: [],
      noSearched: [],
    };
  }

  subscribe(key: keyof MovieSubscriberType, method: (value?: any) => void) {
    this.observer[key].push(method);
  }

  notify(key: keyof MovieSubscriberType, newData?: any) {
    this.observer[key].forEach((method) => method(newData));
  }
}
