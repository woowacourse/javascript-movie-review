import { initMovieList } from './movieListApp.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');

  if (app) {
    initMovieList();
  }
});
