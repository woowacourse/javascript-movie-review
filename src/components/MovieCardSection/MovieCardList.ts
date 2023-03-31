import MovieCard from './MovieCard';
import MovieDetailModal from '../MovieDetailModal';
import Modal from '../common/Modal';
import ErrorMessage from '../common/ErrorMessage';

import MovieApi from '../../api';
import { DEFAULT_LIST_LENGTH } from '../../constants';
import { DEFAULT_ERROR_MESSAGE, isCustomErrorMessage } from '../../constants/message';
import { CLASS } from '../../constants/selector';
import { $ } from '../../utils/dom';

import type { AppMovie } from '../../types/domain';
import type { MovieDetail } from './MovieCard';

const MovieCardList = {
  template() {
    return `
      <ul class=${CLASS.ITEM_LIST}></ul>
    `;
  },

  skeletonItems() {
    return MovieCard.template().repeat(DEFAULT_LIST_LENGTH);
  },

  setEvent() {
    const movieCardList = $<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    movieCardList.addEventListener('click', MovieCardList.onClick);
  },

  async onClick(event: Event) {
    if (!(event.target instanceof HTMLElement)) return;

    const movieItem = event.target.closest('li');
    const movieId = movieItem?.dataset.id;

    if (!movieId) return;

    const movieDetail = await MovieCardList.getMovieDetail(movieId);

    if (!movieDetail) return;

    MovieDetailModal.open(movieDetail);
  },

  async getMovieDetail(movieId: string): Promise<MovieDetail | undefined> {
    try {
      const {
        id,
        title,
        genres: rawGenres,
        poster_path: posterPath,
        overview: rawOverview,
        vote_average: voteAverage,
      } = await MovieApi.getMovieDetail(movieId);
      const genres = rawGenres.map((genre) => genre.name);
      const overview = rawOverview === '' ? null : rawOverview;

      return { id, title, genres, posterPath, overview, rating: voteAverage };
    } catch (error) {
      if (isCustomErrorMessage(error)) {
        Modal.open(ErrorMessage.template(error));
        return;
      }

      if (error instanceof Error) {
        Modal.open(ErrorMessage.template(DEFAULT_ERROR_MESSAGE));
      }
    }
  },

  renderSkeletonItems(isCurrentQuery: boolean) {
    const movieList = $<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    movieList.classList.remove(CLASS.HIDE);

    if (isCurrentQuery) {
      movieList.insertAdjacentHTML('beforeend', MovieCardList.skeletonItems());
      return;
    }

    movieList.innerHTML = MovieCardList.skeletonItems();
  },

  paint(movies: AppMovie[], page: number) {
    const movieList = $<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);
    const startLine = (page - 1) * DEFAULT_LIST_LENGTH;
    const currentSkeletonItems = [...movieList.children].slice(startLine);
    const remainCounts = DEFAULT_LIST_LENGTH - movies.length;

    movies.forEach((movie, index) => {
      const currentSkeleton = currentSkeletonItems[index];

      if (currentSkeleton instanceof HTMLLIElement) {
        MovieCard.paint(currentSkeleton, movie);
      }
    });

    if (remainCounts !== 0) {
      MovieCardList.removeSkeleton(remainCounts);
    }
  },

  handleVisibility(state: boolean) {
    const movieList = $<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    if (state) {
      return movieList.classList.add(CLASS.HIDE);
    }

    return movieList.classList.remove(CLASS.HIDE);
  },

  removeSkeleton(count: number = DEFAULT_LIST_LENGTH) {
    const movieList = $<HTMLUListElement>(`.${CLASS.ITEM_LIST}`);

    [...movieList.children].slice(-count).forEach((child) => {
      child.remove();
    });
  },
};

export default MovieCardList;
