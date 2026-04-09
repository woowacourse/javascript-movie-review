import Modal from './components/modal/Modal.ts';
import HomePage from './pages/HomePage.ts';
import SearchPage from './pages/SearchPage.ts';
import { ROUTE_CHANGE_EVENT } from './utils/event.ts';

const routes = [
  { path: '/', view: HomePage },
  { path: '/search', view: SearchPage },
];

const router = (modal: Modal) => {
  const $app = document.querySelector('#app');
  if (!$app) return;

  $app.innerHTML = '';
  const fullHash = location.hash.replace('#', '') || '/';
  const [path, _] = fullHash.split('?');
  const match = routes.find((route) => route.path === path);

  const View = match ? match.view : HomePage;
  const page = new View(modal);

  $app.replaceChildren(page.$element);
};

const navigateTo = (url: string) => {
  location.hash = url;
};

window.addEventListener(ROUTE_CHANGE_EVENT, (e: Event) => {
  const customEvent = e as CustomEvent<{ url: string }>;
  const { url } = customEvent.detail;
  navigateTo(url);
});

addEventListener('load', () => {
  const $body = document.querySelector('body');
  if (!$body) return;

  const modal = new Modal($body);
  $body.append(modal.$element);

  window.addEventListener('hashchange', () => router(modal));
  router(modal);
});
