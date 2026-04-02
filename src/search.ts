import { renderFetchMovieItem } from './render.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');
  if (app) {
    init();
  }
});

const init = () => {
  let currentPage: number = 1;

  const query = new URLSearchParams(window.location.search).get('q');
  const $thumbnailList = document.querySelector('.thumbnail-list');

  if (query) {
    currentPage = 1;
    // input form이 submit 되면 그때 renderFetchSearchMovieItem을 실행한다.
    if ($thumbnailList) {
      renderFetchMovieItem($thumbnailList, currentPage, query);
    }

    const $button = document.querySelector('#more-page-button');
    $button?.addEventListener('click', () => {
      currentPage++;
      if ($thumbnailList) {
        $button?.classList.add('hidden');
        renderFetchMovieItem($thumbnailList, currentPage, query);
      }
    });
  }
};
