import HomePage from './pages/HomePage.ts';

addEventListener('load', async () => {
  const $app = document.querySelector('#app');
  if (!$app) return;

  new HomePage($app).init();
});
