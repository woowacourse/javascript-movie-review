import Movie from '../../component/Movie';
import createDOMElement from '../../util/createDomElement';
import { $ } from '../../util/selector';
import { INITIAL_PAGE } from '../../constant';
import { MovieType, ResponseType } from '../../type';
import { createInfiniteScrollHandler } from '../infinityScrollButton';
import { hideSkeletons, movieListSkeletons } from './skeleton/movieListSkeletons';
import { errorUi } from '../errorUi';
import { ERROR } from '../../api/constant';

let scrollHandler: ReturnType<typeof createInfiniteScrollHandler>;

export const renderMovieList = async (response: ResponseType<MovieType>, keyword?: string) => {
  if (!response) return;
  const { results, total_pages, total_results } = response;

  movieListSkeletons();

  const movieList = $('.thumbnail-list');
  const fragment = document.createDocumentFragment();
  if (results.length === 0) {
    errorUi(ERROR.NO_SEARCH_RESULTS);
    return;
  }
  results.map((movie) => fragment.appendChild(Movie({ movie })));
  movieList?.appendChild(fragment);
  if (!movieList) {
    const newMovieList = createDOMElement({
      tag: 'ul',
      className: 'thumbnail-list'
    });
    $('.container')?.appendChild(newMovieList);
    newMovieList?.appendChild(fragment);
    $('.error-ui')?.remove();
  }

  hideSkeletons();

  if (scrollHandler) {
    scrollHandler.destroy();
  }

  if (INITIAL_PAGE < total_pages && total_results > 20) {
    scrollHandler = createInfiniteScrollHandler(keyword ?? '', total_pages);
  }
};
