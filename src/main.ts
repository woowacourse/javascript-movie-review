import { fetchPopularMovies } from './api/fetchApi.ts';
import { HomePage } from './pages/HomePage.ts';

addEventListener('load', () => {
  const $app = document.querySelector('#app');
  if ($app) {
    init($app);
  }
});

const init = async ($app: Element) => {
  const data = await fetchPopularMovies(1);
  if (data) {
    HomePage($app, data);
  }
};
