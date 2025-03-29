import { Component } from '@/components/core';
import { LocalStorageMovieRateValueType } from '../modules';
import { MovieDetailResponse, MoviesResponse, MovieType } from '../types';
import { Obserable } from '@/modules';
import { isEqual } from '@/utils';
import { persisted } from '@/decorators/persisted';

export default class Store<TState> extends Obserable<Component<any, any>, TState> {
  #state = {} as TState;
  #initialState: TState;

  constructor(initialState: TState) {
    super();

    this.#state = initialState;
    this.#initialState = initialState;
  }

  getState() {
    return this.#state;
  }

  setState(nextState: TState) {
    if (isEqual(this.#state, nextState)) return;

    this.#state = nextState;
    this.notify(nextState);
  }

  reset() {
    this.setState(this.#initialState);
  }
}

export const moviesResponseStore = new Store<MoviesResponse | null>(null);
export const movieDetailResponseStore = new Store<MovieDetailResponse | null>(null);

export const moviesStore = new Store<MovieType[] | null>(null);
export const searchStore = new Store<string>('');
export const errorStore = new Store<Error | null>(null);
export const pageStore = new Store<number>(1);
export const movieRateStore = new Store<LocalStorageMovieRateValueType>({});

export const movieRateStorePersisted = persisted('rate', movieRateStore);
