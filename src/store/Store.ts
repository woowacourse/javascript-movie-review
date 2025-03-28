import { Component } from '@/components/core';
import { LocalStorageMovieRateValueType } from '../modules';
import { MovieDetailResponse, MoviesResponse, MovieType } from '../types';
import Obserable from './Obserable';

export default class Store<TState> extends Obserable<Component<any, any>> {
  #state = {} as TState;

  constructor(initialState: TState) {
    super();

    this.#state = initialState;
  }

  getState() {
    return this.#state;
  }

  setState(nextState: TState) {
    this.#state = nextState;
    this.notify();
  }
}

export const moviesResponseStore = new Store<MoviesResponse | null>(null);
export const movieDetailResponseStore = new Store<MovieDetailResponse | null>(null);

export const moviesStore = new Store<MovieType[] | null>(null);
export const searchStore = new Store<string>('');
export const errorStore = new Store<Error | null>(null);
export const pageStore = new Store<number>(1);
export const movieRateStore = new Store<LocalStorageMovieRateValueType>({});
