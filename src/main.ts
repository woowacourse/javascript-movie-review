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
  const match = routes.find((route) => route.path === location.pathname);

  const View = match ? match.view : HomePage;
  new View($app).init();
};

const navigateTo = (url: string) => {
  history.pushState(null, '', url);
  router();
};

window.addEventListener(ROUTE_CHANGE_EVENT, (e: Event) => {
  const customEvent = e as CustomEvent<{ url: string }>;
  const { url } = customEvent.detail;
  navigateTo(url);
});

addEventListener('load', () => {
  window.addEventListener('popstate', router);
  router();
});
