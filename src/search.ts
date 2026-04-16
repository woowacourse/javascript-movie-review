import { initMovieList } from './movieListApp.ts';
import { LocalReviewStorage } from './reviewStorage.ts';
import { setModalStorage } from './modal.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');

  if (app) {
    const query = new URLSearchParams(window.location.search).get('q');
    const storage = new LocalReviewStorage();

    setModalStorage(storage);
    if (query) {
      initMovieList(query);
    }
  }
});
