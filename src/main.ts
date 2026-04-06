import HomePage from './pages/HomePage.ts';
import SearchPage from './pages/SearchPage.ts';

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

export const navigateTo = (url: string) => {
  history.pushState(null, '', url);
  router();
};

addEventListener('load', () => {
  window.addEventListener('popstate', router);
  router();
});
