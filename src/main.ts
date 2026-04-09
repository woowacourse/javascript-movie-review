import Modal from './components/modal/Modal.ts';
import HomePage from './pages/HomePage.ts';
import SearchPage from './pages/SearchPage.ts';
import { CUSTOM_EVENT, scrollEvent } from './utils/event.ts';

const routes = [
  { path: '/', view: HomePage },
  { path: '/search', view: SearchPage },
];

const PAGE_CACHE = new Map<string, HTMLElement>();

const router = (modal: Modal) => {
  const $app = document.querySelector('#app');
  if (!$app) return;

  $app.innerHTML = '';
  const fullHash = location.hash.replace('#', '') || '/';
  const [path] = fullHash.split('?');
  const match = routes.find((route) => route.path === path);

  const View = match ? match.view : HomePage;
  const fullpath = match ? fullHash : '/';

  const cachePage = PAGE_CACHE.get(fullpath);

  if (cachePage !== undefined) {
    PAGE_CACHE.set(fullpath, cachePage as HTMLElement);
    $app.append(cachePage as any);
    return;
  }

  const newPage = new View(modal).$element;
  $app.append(newPage);
  PAGE_CACHE.set(fullpath, newPage);
};

const navigateTo = (url: string) => {
  location.hash = url;
};

window.addEventListener(CUSTOM_EVENT.ROUTE_CHANGE, (e: Event) => {
  const customEvent = e as CustomEvent<{ url: string }>;
  const { url } = customEvent.detail;
  navigateTo(url);
});

window.addEventListener('scroll', () => {
  const isScrollEnded = window.innerHeight + window.scrollY + 400 >= document.body.offsetHeight;
  if (isScrollEnded) {
    scrollEvent();
  }
});

addEventListener('load', () => {
  const $body = document.querySelector('body');
  if (!$body) return;

  const modal = new Modal($body);
  $body.append(modal.$element);

  window.addEventListener('hashchange', () => router(modal));

  router(modal);
});
