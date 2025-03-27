import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { MovieList } from './components/feature/MovieList';

export const App = async () => {
  const app = document.querySelector('#app');

  if (!app) {
    throw new Error('#app에 해당하는 요소가 없습니다.');
  }

  app.append(Header(), await MovieList(), Footer());
};
