import Movie from '../../component/Movie';
import { $ } from '../../util/selector';
import { INITIAL_PAGE } from '../../constant';
import { ResponseType } from '../../type';
import { createInfiniteScrollHandler } from '../infinityScrollButton';
import { hideSkeletons, movieListSkeletons } from './skeleton/movieListSkeletons';
import createDOMElement from '../../util/createDomElement';

let scrollHandler: ReturnType<typeof createInfiniteScrollHandler>;

export const renderMovieList = async (response: ResponseType, keyword?: string) => {
  if (!response) return;
  const { results, totalPages, totalResults } = response;

  movieListSkeletons();

  const movieList = $('.thumbnail-list');
  const fragment = document.createDocumentFragment();
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
  if (INITIAL_PAGE < totalPages && totalResults > 20) {
    scrollHandler = createInfiniteScrollHandler(keyword ?? '', totalPages);
  }
};
