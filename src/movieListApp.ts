import { fetchPopularMovies, fetchSearchMovies } from './api.ts';
import * as view from './view.ts';
import { openModal } from './modal.ts';

export const initMovieList = (query?: string) => {
  let currentPage: number = 1;
  let isFetching: boolean = false;
  let isError: boolean = false;

  const $thumbnailList = document.querySelector('.thumbnail-list');
  const $button = document.querySelector('#more-page-button') as HTMLElement | null;
  const $heroDetailBtn = document.querySelector('.top-rated-movie .detail') as HTMLButtonElement | null;

  if (!$thumbnailList || !$button) return;

  const loadMovies = async () => {
    try {
      view.renderSkeleton($thumbnailList);

      const data = query ? await fetchSearchMovies(query, currentPage) : await fetchPopularMovies(currentPage);

      view.removeSkeleton($thumbnailList);

      if (query && data.results.length === 0) {
        view.renderEmptyState($thumbnailList, query);
        return;
      }

      if (currentPage === 1 && !query && data.results.length > 0) {
        view.updateHeroBanner(data.results[0]);
      }

      view.renderMovieList($thumbnailList, data.results);
      view.toggleButton(data.total_pages, currentPage);

      // 에러 없이 렌더링 성공시에만 페이지 번호 증가
      currentPage++;
    } catch (error) {
      view.removeSkeleton($thumbnailList);
      view.showMoreButton();
      isError = true;
      if (error instanceof Error) {
        alert('영화 목록을 불러오지 못했습니다! 새로고침을 누르거나 더보기 버튼을 한번 더 눌러주세요!');
      }
    }
  };

  const handleIntersect = async (entries: IntersectionObserverEntry[]): Promise<void> => {
    const entry = entries[0];

    if (entry.isIntersecting && !isFetching && !isError) {
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
  };

  // 실행
  start();

  // herobanner 자세히 보기 버튼 클릭 이벤트
  if ($heroDetailBtn) {
    $heroDetailBtn.addEventListener('click', (event) => {
      const target = event.currentTarget as HTMLButtonElement;
      const movieId = Number(target.dataset.id);

      if (movieId) {
        openModal(movieId);
      }
    });
  }

  // 더보기 버튼 클릭 시 렌더링
  $button?.addEventListener('click', async () => {
    isError = false; // 버튼 클릭 시 에러 상태 초기화
    view.hideMoreButton();

    if (!isFetching) {
      isFetching = true;
      await loadMovies();
      isFetching = false;
    }
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
  });
};
