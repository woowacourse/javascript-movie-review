import { forEach } from '@fxts/core';
import { MovieDetailResponse, MoviesResponse, MovieType } from '../types';

export default class Store<TState> {
  #listeners: (() => void)[] = [];
  #state = {} as TState;

  constructor(initialState: TState) {
    this.#state = initialState;
  }

  getState() {
    return this.#state;
  }

  setState(nextState: TState) {
    this.#state = nextState;
    this.notify();
  }

  subscribe(listener: () => void) {
    this.#listeners = [...this.#listeners, listener];
  }

  notify() {
    forEach((listener) => {
      listener();
    }, this.#listeners);
  }
}

export const moviesResponseStore = new Store<MoviesResponse | null>(null);
export const movieDetailResponseStore = new Store<MovieDetailResponse | null>(null);

export const moviesStore = new Store<MovieType[] | null>(null);
