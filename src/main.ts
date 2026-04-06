import { initMovieList } from './movieController.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');

  if (app) {
    initMovieList();
  }
});
