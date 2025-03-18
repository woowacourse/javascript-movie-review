import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { MovieList } from './components/feature/MovieList';
import { MOVIE_RESPONSE } from './constants/movie.data';

export const App = () => {
  Header();
  MovieList(MOVIE_RESPONSE);

  Footer();
};
