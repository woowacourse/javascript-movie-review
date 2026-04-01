import image from '../images/star_filled.png';
import { renderFetchMovieItem, toggleButton } from './api.ts';

let currentPage: number = 1;

addEventListener('load', () => {
  const app = document.querySelector('#app');
  const buttonImage = document.createElement('img');
  buttonImage.src = image;

  if (app) {
    app.appendChild(buttonImage);
    init();
  }
});
const $thumbnailList = document.querySelector('.thumbnail-list');

function init() {
  // 현재 페이지 1로 초기화
  currentPage = 1;

  // 영화 인기순 20개 렌더링
  if ($thumbnailList) {
    const totalPage = renderFetchMovieItem($thumbnailList, currentPage);
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

// 검색 결과가 나오면 검면 띄우기
