import { addMovies } from '../domain/addMovies';
import { $ } from '../util/selector';
import { hideSkeletons, movieListSkeletons } from './render/skeleton/movieListSkeletons';

export function createInfiniteScrollHandler(initialKeyword = '', totalPages: number) {
  let currentPage = 2;
  let isLoading = false;
  let isEnd = false;
  let keyword = initialKeyword;

  const sentinel = document.getElementById('sentinel');
  const container = $('.thumbnail-list') as HTMLElement;

  const observer = new IntersectionObserver(
    async ([entry]) => {
      if (!entry.isIntersecting || isLoading || isEnd) return;

      isLoading = true;
      movieListSkeletons();

      try {
        if (currentPage > totalPages) {
          isEnd = true;
          observer.unobserve(sentinel!);
          return;
        }

        const fragment = await addMovies(currentPage, keyword);

        container?.appendChild(fragment);
        currentPage++;
      } catch (error) {
        console.error('무한 스크롤 중 에러:', error);
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
      currentPage = 2;
      isLoading = false;
      isEnd = false;
      keyword = newKeyword;
    },
    destroy() {
      observer.disconnect();
    }
  };
}

// export const infinityScrollButton = (page: number, totalPages: number, isLoading: boolean, keyword?: string) => {
//   return Button({
//     text: '',
//     id: 'moreButton',
//     className: 'infinity-button',
//     onClick: () => handleInfinityButtonClick(++page, totalPages, isLoading, keyword)
//   });
// };
