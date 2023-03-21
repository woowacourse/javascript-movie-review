import { MovieItemType, MovieSubscriberType } from '../type/movie';

export default class Observable {
  observer: MovieSubscriberType;

  constructor() {
    this.observer = {
      movies: [],
      loading: [],
    };
  }

  subscribe(
    key: keyof MovieSubscriberType,
    method: (value?: MovieItemType[]) => void
  ) {
    this.observer[key].push(method);
  }

  notify(key: keyof MovieSubscriberType, newData?: MovieItemType[]) {
    this.observer[key].forEach((method) => method(newData));
  }
}
