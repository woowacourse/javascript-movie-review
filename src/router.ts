import { createHomePage, createSearchPage } from './pages/createPage.ts';

export const router = () => {
  const $app = document.querySelector('#app');
  if (!$app) return;

  const fullHash = location.hash.replace('#', '') || '/';
  const [path, queryString] = fullHash.split('?');
  const query = new URLSearchParams(queryString).get('query') ?? '';

  $app.innerHTML = '';

  const newPage = path === '/search' ? createSearchPage(query) : createHomePage();
  $app.append(newPage.$element);
};
