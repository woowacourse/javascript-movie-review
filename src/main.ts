import Modal from './components/modal/Modal.ts';
import HomePage from './pages/HomePage.ts';
import SearchPage from './pages/SearchPage.ts';
import LocalStorage from './storage/LocalStorage.ts';

const routes = [
  { path: '/', view: HomePage },
  { path: '/search', view: SearchPage },
];

const PAGE_CACHE = new Map<string, HomePage | SearchPage>();

const router = (modal: Modal) => {
  const $app = document.querySelector('#app');
  if (!$app) return;

  $app.innerHTML = '';
  const fullHash = location.hash.replace('#', '') || '/';
  const [path] = fullHash.split('?');
  const match = routes.find((route) => route.path === path);

  const View = match ? match.view : HomePage;
  const fullpath = match ? fullHash : '/';

  const cachedPage = PAGE_CACHE.get(fullpath);
  if (cachedPage !== undefined) {
    $app.append(cachedPage.$element);
    return;
  }

  const newPage = new View(modal);
  $app.append(newPage.$element);
  PAGE_CACHE.set(fullpath, newPage);
};

window.addEventListener('load', () => {
  const $body = document.querySelector('body');
  if (!$body) return;

  const modal = new Modal(new LocalStorage(), $body);
  $body.append(modal.$element);

  window.addEventListener('hashchange', () => router(modal));

  router(modal);
});
