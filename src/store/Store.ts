import { forEach } from '@fxts/core';
import { MovieDetailResponse, MoviesResponse, MovieType } from '../types';
import { LocalStorageMovieRateValueType } from '../modules';
import { Component } from '@/components/core';

type ObserverType = Component<any, any>;

export default class Store<TState> {
  #observers: ObserverType[] = [];
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

  subscribe(observer: ObserverType) {
    this.#observers = [...this.#observers, observer];
  }

  notify() {
    forEach((observer) => {
      observer.update();
    }, this.#observers);
  }
}

export const moviesResponseStore = new Store<MoviesResponse | null>(null);
export const movieDetailResponseStore = new Store<MovieDetailResponse | null>(null);

export const moviesStore = new Store<MovieType[] | null>(null);
export const searchStore = new Store<string>('');
export const errorStore = new Store<Error | null>(null);
export const pageStore = new Store<number>(1);
export const movieRateStore = new Store<LocalStorageMovieRateValueType>({});
