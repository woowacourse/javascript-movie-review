import { hideMoreButton, renderFetchMovieItem } from './render.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');

  if (app) {
    init();
  }
});

function init() {
  let currentPage: number = 1;
  const $thumbnailList = document.querySelector('.thumbnail-list');

  if ($thumbnailList) {
    renderFetchMovieItem($thumbnailList, currentPage);
  }

  const $button = document.querySelector('#more-page-button');

  $button?.addEventListener('click', async () => {
    const nextPage = currentPage + 1;
    if ($thumbnailList) {
      hideMoreButton();

      try {
        await renderFetchMovieItem($thumbnailList, nextPage);
        currentPage++;
      } catch (e) {
        if (e instanceof Error) {
          alert(e.message);
        }
      }
    }
  });
}
