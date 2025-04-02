import Layout from './pages/common/layout/Layout';
import { initRouter } from './route/router';

addEventListener('load', () => {
  initRouter();
  new Layout();
});
