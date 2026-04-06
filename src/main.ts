import HomePage from './pages/HomePage.ts';
import SearchPage from './pages/SearchPage.ts';
import { ROUTE_CHANGE_EVENT } from './utils/event.ts';

const routes = [
  { path: '/', view: HomePage },
  { path: '/search', view: SearchPage },
];

const router = () => {
  const $app = document.querySelector('#app');
  if (!$app) return;

  $app.innerHTML = '';

  const fullHash = location.hash.replace('#', '') || '/';
  const [path, queryString] = fullHash.split('?');
  const match = routes.find((route) => route.path === path);

  const View = match ? match.view : HomePage;
  new View($app).init();
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
  window.addEventListener('hashchange', router);
  router();
});
