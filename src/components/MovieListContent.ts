import { Movie } from '../types/movie';
import {
  MOVIE_LIST_LOADED,
  MOVIE_LIST_LOADING,
  MOVIE_LIST_RESET,
  MOVIE_MAX_COUNT,
} from '../constants';
import { NO_SEARCH_RESULT } from '../constants/invalidMessage';
import { $, $$ } from '../utils/domSelector';
import MovieListContainer from './MovieListContainer';
import MovieItem from './MovieItem';
import InvalidMessage from './InvalidMessage';
import MovieList from '../domain/MovieList';

class MovieListContent {
  private static instance: MovieListContent;
  private itemList: HTMLUListElement;

  private constructor() {
    this.init();
    this.itemList = $<HTMLUListElement>('.item-list');
  }

  static getInstance(): MovieListContent {
    if (!MovieListContent.instance) {
      MovieListContent.instance = new MovieListContent();
    }

    return MovieListContent.instance;
  }

  private init() {
    MovieList.on(MOVIE_LIST_RESET, this.clearListContent);

    MovieList.on(MOVIE_LIST_LOADING, this.renderSkeleton);

    MovieList.on(MOVIE_LIST_LOADED, (event) => {
      const { movies, searchQuery } = (event as CustomEvent).detail;
      this.loadMovies(movies, searchQuery);
    });
  }

  private async loadMovies(movies: Movie[], searchQuery: string) {
    if (movies.length !== 20) {
      MovieListContainer.endScroll();
    }

    if (searchQuery && !movies.length) {
      MovieListContainer.hideListContainer();
      InvalidMessage.render(NO_SEARCH_RESULT, searchQuery);
      return;
    }

    this.renderMovies(movies);
  }

  private renderSkeleton = () => {
    this.itemList.insertAdjacentHTML('beforeend', MovieItem.template().repeat(MOVIE_MAX_COUNT));
  };

  renderMovies(movies: Movie[]) {
    const items = $$<HTMLUListElement>('.item-card');
    const lastPageItems = items.slice(-MOVIE_MAX_COUNT);
    const itemsToRender = lastPageItems.slice(0, movies.length);
    const itemsToRemove = lastPageItems.slice(movies.length);

    itemsToRender.forEach((child, key) => MovieItem.render(child, movies[key]));
    itemsToRemove.forEach((item) => {
      item.closest('li')?.remove();
    });
  }

  private clearListContent = () => {
    this.itemList.replaceChildren();
  };
}

export default MovieListContent.getInstance();
