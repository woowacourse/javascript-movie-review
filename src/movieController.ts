import { renderFetchMovieItem, hideMoreButton } from './render.ts';
import { openModal } from './modal.ts';

export const initMovieList = (query?: string) => {
  let currentPage: number = 1;
  let isFetching: boolean = false;
  const $thumbnailList = document.querySelector('.thumbnail-list');
  const $button = document.querySelector('#more-page-button') as HTMLElement | null;

  if (!$thumbnailList || !$button) return;

  const loadMovies = async () => {
    try {
      await renderFetchMovieItem($thumbnailList, currentPage, query);
      
      // 에러 없이 렌더링 성공시에만 페이지 번호 증가
      currentPage++; 
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const handleIntersect = async (entries: IntersectionObserverEntry[]): Promise<void> => {
    const entry = entries[0];

    if (entry.isIntersecting && !isFetching) {
      isFetching = true;
      await loadMovies();
      isFetching = false;
    }
  };

  const observerOptions: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px 0px 200px 0px', // 더보기 버튼 200px 위부터 관찰하기
    threshold: 0,
  };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

  const start = async () => {
    // 초기 렌더링
    isFetching = true;
    await loadMovies();
    isFetching = false;

    // 초기 렌더링이 끝난 뒤, 더보기 버튼 관찰 시작
    observer.observe($button);
  }

  // 실행
  start();

  // 더보기 버튼 클릭 시 렌더링
  $button?.addEventListener('click', async () => {
    hideMoreButton();
    loadMovies();
  });

  $thumbnailList.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const $movieItem = target.closest('.movie-item') as HTMLElement | null;

    if ($movieItem) {
      const movieId = Number($movieItem.dataset.id);
      if (movieId) {
        openModal(movieId);
      }
    }
  })
};
