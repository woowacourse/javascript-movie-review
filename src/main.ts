import { router } from './router.ts';
import LocalStorage from './storage/LocalStorage.ts';

window.addEventListener('load', () => {
  const $body = document.querySelector('body');
  if (!$body) return;

  const movieDB = new LocalStorage();

  $body.append();

  window.addEventListener('hashchange', () => router(movieDB));

  router(movieDB);
});
