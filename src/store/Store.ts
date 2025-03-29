import { Obserable } from '@/modules';
import { isEqual } from '@/utils';
import { LocalStorageMovieRateValueType } from '../modules';
import { MovieDetailResponse, MoviesResponse, MovieType } from '../types';
import { persisted } from '@/decorators/persisted';

export default class Store<TState> extends Obserable<TState> {
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
    this.notify(this.#state);
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
const movieRateStore1 = new Store<LocalStorageMovieRateValueType>({});

export const movieRateStore = persisted('movieRate', movieRateStore1);
