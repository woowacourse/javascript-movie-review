import { IMovie } from '../api/api.js';
import { observable } from '../core/observer.js';

export type stateType = {
  [key: string]: string | number | boolean | IMovie[];
};

export const publisher = {
  state: observable({
    page: 1,
    keyword: '검색 결과',
    isPopular: true,
    movies: [],
  }),

  setState(newState: stateType) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};

/*
export class publisher {
  [x: string]: any;
  #state: stateType = {};
  // #observers = new Set();

  constructor(state: stateType) {
    this.#state = state;
    Object.keys(state).forEach((key: string) =>
      Object.defineProperty(this, key, {
        get: () => this.#state[key],
      })
    );
  }

  change(newState: stateType) {
    this.#state = { ...this.#state, ...newState };
    // this.subscriber_notify();
  }

  getState() {
    return this.#state;
  }

}
*/
