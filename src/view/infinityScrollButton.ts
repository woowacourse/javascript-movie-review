import Movie from '../component/Movie';
import { addMovies } from '../domain/addMovies';
import { MovieType } from '../type';
import { $ } from '../util/selector';
import { errorUi } from './errorUi';
import { hideSkeletons, showMovieListSkeletons } from './render/skeleton/showMovieListSkeletons';
import { ERROR } from '../api/constant';

export function createInfiniteScrollHandler(initialKeyword = '', totalPages: number) {
  let currentPage = 1;
  let isLoading = false;
  let isEnd = false;
  let keyword = initialKeyword;

  const sentinel = document.getElementById('sentinel');
  const container = $('.thumbnail-list') as HTMLElement;

  const observer = new IntersectionObserver(
    async ([entry]) => {
      if (!entry.isIntersecting || isLoading || isEnd) return;

      isLoading = true;
      showMovieListSkeletons();

      try {
        if (currentPage >= totalPages) {
          isEnd = true;
          observer.unobserve(sentinel!);
          return;
        }

        const result = await addMovies(++currentPage, keyword);
        if (result.length === 0) {
          errorUi(ERROR.NO_SEARCH_RESULTS);
          return;
        }
        const fragment = document.createDocumentFragment();

        result.forEach((movie: MovieType) => {
          fragment.appendChild(Movie({ movie }));
        });
        container?.appendChild(fragment);
      } catch (error) {
        if (error instanceof Error) {
          errorUi(error.message);
        }
      } finally {
        hideSkeletons();
        isLoading = false;
      }
    },
    {
      rootMargin: '100px'
    }
  );

  if (sentinel) observer.observe(sentinel);

  return {
    reset(newKeyword: string) {
      currentPage = 1;
      isLoading = false;
      isEnd = false;
      keyword = newKeyword;
    },
    destroy() {
      observer.disconnect();
    }
  };
}
