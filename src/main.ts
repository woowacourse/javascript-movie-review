import Layout from './pages/layout/Layout';
import { MainPage } from './pages/main-page/MainPage';

addEventListener('load', () => {
  const mainPage = new MainPage().element;
  if (mainPage) {
    new Layout({ childrenElement: mainPage });
  }
});
