import { renderFetchMovieItem } from './render.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');
  if (app) {
    init();
  }
});
const $thumbnailList = document.querySelector('.thumbnail-list');

function init() {
  // 현재 페이지 1로 초기화
  let currentPage: number = 1;

  // 영화 인기순 20개 렌더링
  if ($thumbnailList) {
    renderFetchMovieItem($thumbnailList, currentPage);
  }
  
  const $button = document.querySelector('#more-page-button');
  $button?.addEventListener('click', () => {
    currentPage++;
    if ($thumbnailList) {
      $button?.classList.add("hidden")
      renderFetchMovieItem($thumbnailList, currentPage);
    }
  });
}


