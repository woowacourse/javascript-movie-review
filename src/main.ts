import Layout from './pages/layout/Layout';
import { initRouter } from './route/router';

addEventListener('load', () => {
  initRouter();
  new Layout();
});
