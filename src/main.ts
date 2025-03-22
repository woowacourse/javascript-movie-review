import Layout from './pages/layout/Layout';
import { initRouter } from './route/router';

window.addEventListener('load', () => {
  initRouter();
  new Layout();
});
