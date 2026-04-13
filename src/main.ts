import { router } from './router.ts';

window.addEventListener('load', () => {
  const $body = document.querySelector('body');
  if (!$body) return;

  $body.append();

  window.addEventListener('hashchange', () => router());

  router();
});
