import { renderFetchMovieItem, hideMoreButton } from './render.ts';

export const initMovieList = (query?: string) => {
  let currentPage: number = 1;
  const $thumbnailList = document.querySelector('.thumbnail-list');
  const $button = document.querySelector('#more-page-button');

  if (!$thumbnailList) return;

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

  // 초기 렌더링
  loadMovies();

  // 더보기 버튼 클릭 시 렌더링
  $button?.addEventListener('click', async () => {
    hideMoreButton();
    loadMovies();
  });
};
