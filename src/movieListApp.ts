import { fetchPopularMovies, fetchSearchMovies } from './api.ts';
import * as view from './view.ts';
import { openModal } from './modal.ts';

const createScrollObserver = ($target: HTMLElement, callback: () => void) => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    },
    {
      root: null,
      rootMargin: '0px 0px 200px 0px', // 더보기 버튼 200px 위부터 관찰하기
      threshold: 0,
    },
  );
  observer.observe($target);

  return observer;
};

export const initMovieList = (query?: string) => {
  const state = {
    currentPage: 1,
    isFetching: false,
    isError: false,
  };

  const $thumbnailList = document.querySelector('.thumbnail-list');
  const $button = document.querySelector('#more-page-button') as HTMLElement | null;
  const $heroDetailBtn = document.querySelector('.top-rated-movie .detail') as HTMLButtonElement | null;

  if (!$thumbnailList || !$button) return;

  let observer: IntersectionObserver;

  const loadMovies = async () => {
    if (state.isFetching || state.isError) return;
    state.isFetching = true;

    try {
      view.renderSkeleton($thumbnailList);

      const data = query
        ? await fetchSearchMovies(query, state.currentPage)
        : await fetchPopularMovies(state.currentPage);

      view.removeSkeleton($thumbnailList);

      if (query && data.results.length === 0) {
        view.renderEmptyState($thumbnailList, query);
        return;
      }

      if (state.currentPage === 1 && !query && data.results.length > 0) {
        view.updateHeroBanner(data.results[0]);
      }

      view.renderMovieList($thumbnailList, data.results);
      view.toggleButton(data.total_pages, state.currentPage);

      // 에러 없이 렌더링 성공시에만 페이지 번호 증가
      state.currentPage++;

      if (state.isError) {
        state.isError = false;
        observer.observe($button);
      }
    } catch (error) {
      view.removeSkeleton($thumbnailList);
      view.showMoreButton();
      state.isError = true;
      observer.unobserve($button);
      if (error instanceof Error) {
        alert('영화 목록을 불러오지 못했습니다! 새로고침을 누르거나 더보기 버튼을 한번 더 눌러주세요!');
      }
    } finally {
      state.isFetching = false;
    }
  };

  const start = async () => {
    // 초기 렌더링
    await loadMovies();
    observer = createScrollObserver($button, loadMovies);

    $heroDetailBtn?.addEventListener('click', handleHeroClick);
    $button.addEventListener('click', handleMoreButtonClick);
    $thumbnailList.addEventListener('click', handleMovieItemClick);
  };

  const handleMoreButtonClick = () => {
    state.isError = false;
    view.hideMoreButton();
    loadMovies();
  };

  // 실행
  start();
};

// herobanner 자세히 보기 버튼 클릭 이벤트
const handleHeroClick = (event: Event) => {
  const target = event.currentTarget as HTMLButtonElement;
  const movieId = Number(target.dataset.id);
  if (movieId) openModal(movieId);
};

const handleMovieItemClick = (event: Event) => {
  const target = event.target as HTMLElement;
  const $movieItem = target.closest('.movie-item') as HTMLElement | null;

  if ($movieItem) {
    const movieId = Number($movieItem.dataset.id);
    if (movieId) {
      openModal(movieId);
    }
  }
};
