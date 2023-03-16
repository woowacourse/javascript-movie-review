import { Movie } from '../types/movie';
import { MOVIE_MAX_COUNT } from '../constants';
import { $, $$ } from '../utils/domSelector';
import MovieItem from './MovieItem';
import InvalidMessage from './InvalidMessage';
import MovieList from '../domain/MovieList';
import HTTPError from '../api/HTTPError';

const MovieListContent = {
  loadMovies() {
    $<HTMLButtonElement>('#more-button').classList.remove('hide');
    MovieListContent.clear();
    MovieListContent.loadMoreMovies();
  },

  async loadMoreMovies() {
    try {
      MovieListContent.renderSkeleton();

      const { movies, searchKey } = await MovieList.getMovieData();

      if (movies.length < 20) {
        $<HTMLButtonElement>('#more-button').classList.add('hide');
      }

      if (searchKey && movies.length === 0) {
        MovieListContent.clear();
        $<HTMLButtonElement>('#movie-list-title').textContent = '';
        $<HTMLButtonElement>('#more-button').classList.add('hide');
        InvalidMessage.renderNoSearchMessage(searchKey);
        return;
      }

      MovieListContent.renderMovies(movies);
    } catch (error) {
      if (error instanceof HTTPError) {
        $<HTMLUListElement>('.item-list').replaceChildren();
        $<HTMLButtonElement>('#more-button').classList.add('hide');
        InvalidMessage.renderErrorMessage(error.statusCode);
      }
    }
  },

  renderSkeleton() {
    const itemList = $<HTMLUListElement>('.item-list');

    itemList.insertAdjacentHTML('beforeend', MovieItem.template().repeat(20));
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

  clear() {
    $<HTMLUListElement>('.item-list').replaceChildren();
    $<HTMLDivElement>('.error-message').classList.add('hide');
  },
};

export default MovieListContent;
