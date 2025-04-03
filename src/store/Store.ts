import { Obserable } from '@/modules';
import { isEqual } from '@/utils';
import { LocalStorageMovieRateValueType } from '@/modules';
import { MovieDetailResponse, MoviesResponse, MovieType } from '@/types';
import { persisted } from '@/decorators';

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

  reset(value?: TState) {
    this.setState(value ?? this.#initialState);
  }
}

export const moviesResponseStore = new Store<MoviesResponse | null>(null);
export const movieDetailResponseStore = new Store<MovieDetailResponse | null>(null);

export const moviesStore = new Store<MovieType[] | null>(null);
export const searchStore = new Store<string>(new URL(window.location.href).searchParams.get('search') ?? '');
export const errorStore = new Store<Error | null>(null);
export const pageStore = new Store<number>(1);
export const movieRateStore = persisted('movieRate', new Store<LocalStorageMovieRateValueType>({}));
