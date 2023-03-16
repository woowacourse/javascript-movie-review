type OberserverType = {
  movies: ((value?: Object) => void)[];
  loading: (() => void)[];
};

export default class Observable {
  observer: OberserverType;

  constructor() {
    this.observer = {
      movies: [],
      loading: [],
    };
  }

  subscribe(key: keyof OberserverType, method: (value?: Object) => void) {
    this.observer[key].push(method);
  }

  notify(key: keyof OberserverType, newData?: Object) {
    this.observer[key].forEach((method) => method(newData));
  }
}
