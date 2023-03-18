import { Movie } from '../types/movie';
import { MOVIE_MAX_COUNT } from '../constants';
import {
  NO_SEARCH_RESULT,
  HTTP_ERROR_CODE,
  INVALID_JSON_RESPONSE,
} from '../constants/invalidMessage';
import { $, $$ } from '../utils/domSelector';
import MovieListContainer from './MovieListContainer';
import MovieItem from './MovieItem';
import InvalidMessage from './InvalidMessage';
import MovieList from '../domain/MovieList';
import HTTPError from '../api/HTTPError';

const MovieListContent = {
  loadMovies() {
    MovieListContainer.clearInvalidMessageContainer();
    MovieListContainer.showListContainer();
    MovieListContent.clearListContent();

    MovieListContent.loadMoreMovies();
  },

  async loadMoreMovies() {
    try {
      MovieListContainer.hideMoreButton();
      MovieListContent.renderSkeleton();

      const { movies, searchQuery } = await MovieList.getMovieData();

      MovieListContainer.showMoreButton();

      if (movies.length !== 20) {
        MovieListContainer.hideMoreButton();
      }

      if (searchQuery && !movies.length) {
        MovieListContainer.hideListContainer();
        InvalidMessage.render(NO_SEARCH_RESULT, searchQuery);
        return;
      }

      MovieListContent.renderMovies(movies);
    } catch (error) {
      MovieListContainer.hideListContainer();

      if (error instanceof HTTPError) {
        InvalidMessage.render(HTTP_ERROR_CODE[error.statusCode]);
      }

      if (error instanceof Error) {
        if (error.message === INVALID_JSON_RESPONSE) {
          InvalidMessage.render(INVALID_JSON_RESPONSE);
          return;
        }

        alert(error.message);
      }
    }
  },

  renderSkeleton() {
    const itemList = $<HTMLUListElement>('.item-list');

    itemList.insertAdjacentHTML('beforeend', MovieItem.template().repeat(MOVIE_MAX_COUNT));
  },

  renderMovies(movies: Movie[]) {
    const items = $$<HTMLUListElement>('.item-card');
    const extraItems = MOVIE_MAX_COUNT - movies.length;

    items.splice(items.length - extraItems).forEach((element) => {
      element.remove();
    });

    items.slice(-movies.length).forEach((child, key) => {
      MovieItem.render(child, movies[key]);
    });
  },

  clearListContent() {
    $<HTMLUListElement>('.item-list').replaceChildren();
  },
};

export default MovieListContent;
