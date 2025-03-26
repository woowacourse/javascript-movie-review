import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { Toast } from './components/common/Toast';
import { MovieList } from './components/feature/MovieList';

export const App = async () => {
  Toast();
  document.querySelector('#app')?.append(Header(), await MovieList(), Footer());
};
