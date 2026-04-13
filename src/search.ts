import { initMovieList } from './movieListApp.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');

  if (app) {
    const query = new URLSearchParams(window.location.search).get('q');
    if (query) {
      initMovieList(query);
    }
  }
});
