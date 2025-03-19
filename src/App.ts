import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { MovieList } from './components/feature/MovieList';

export const App = async () => {
  Header();
  MovieList();
  Footer();
};
