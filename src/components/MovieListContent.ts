import { Movie } from '../types/movie';
import { MOVIE_MAX_COUNT } from '../constants';
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

      const { movies, searchKey } = await MovieList.getMovieData();

      if (movies.length === 20) {
        MovieListContainer.showMoreButton();
      }

      if (searchKey && !movies.length) {
        MovieListContainer.hideListContainer();
        InvalidMessage.render('NO_SEARCH_RESULT', searchKey);
        return;
      }

      MovieListContent.renderMovies(movies);
    } catch (error) {
      if (error instanceof HTTPError) {
        MovieListContainer.hideListContainer();

        if (error.statusCode >= 400 && error.statusCode < 500) {
          InvalidMessage.render('ERROR_400_RANGE');
        }

        if (error.statusCode >= 500) {
          InvalidMessage.render('ERROR_500_RANGE');
        }
      }
    }
  },

  renderSkeleton() {
    const itemList = $<HTMLUListElement>('.item-list');

    itemList.insertAdjacentHTML('beforeend', MovieItem.template().repeat(MOVIE_MAX_COUNT));
  },

  renderMovies(movies: Movie[]) {
    const items = [...$$<HTMLUListElement>('.item-card')];
    const extraItems = MOVIE_MAX_COUNT - movies.length;

    Array.from({ length: extraItems }, () => {
      const element = items.pop();
      element?.remove();
    });

    [...items].slice(-movies.length).forEach((child, key) => {
      MovieItem.render(child, movies[key]);
    });
  },

  clearListContent() {
    $<HTMLUListElement>('.item-list').replaceChildren();
  },
};

export default MovieListContent;
