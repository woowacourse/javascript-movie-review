import { renderFetchMovieItem, hideMoreButton } from './render.ts';

export const initMovieList = (query?: string) => {
  let currentPage: number = 1;
  const $thumbnailList = document.querySelector('.thumbnail-list');
  const $button = document.querySelector('#more-page-button');

  if (!$thumbnailList) return;

  renderFetchMovieItem($thumbnailList, currentPage, query);

  $button?.addEventListener('click', async () => {
    const nextPage = currentPage + 1;
    hideMoreButton();

    try {
      await renderFetchMovieItem($thumbnailList, nextPage);
      currentPage++;
    } catch (e) {
      if (e instanceof Error) {
        alert(e.message);
      }
    }
  });
};
