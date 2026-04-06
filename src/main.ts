import HomePage from './pages/HomePage.ts';
import SearchPage from './pages/SearchPage.ts';
import { ROUTE_CHANGE_EVENT } from './utils/event.ts';

const routes = [
  { path: '/', view: HomePage },
  { path: '/search', view: SearchPage },
];

// 1. match 로직 수정 (location.pathname 대신 location.hash 사용)
const router = () => {
  const $app = document.querySelector('#app');
  if (!$app) return;

  $app.innerHTML = '';

  // hash가 없으면 '/', 있으면 '#'을 제거한 값을 사용
  const hashPath = location.hash.replace('#', '') || '/';
  const match = routes.find((route) => route.path === hashPath);

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
