import { createHomePage, createSearchPage } from './pages/createPage.ts';
import { MovieStore } from './storage/types.ts';

export const router = (movieDB: MovieStore) => {
  const $app = document.querySelector('#app');
  if (!$app) return;

  const fullHash = location.hash.replace('#', '') || '/';
  const [path, queryString] = fullHash.split('?');
  const query = new URLSearchParams(queryString).get('query') ?? '';

  $app.innerHTML = '';

  const newPage = path === '/search' ? createSearchPage(query, movieDB) : createHomePage(movieDB);
  $app.append(newPage.$element);
};
