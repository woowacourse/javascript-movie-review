import { ENV } from './api/env';
import Fetcher, { QUERY_PARAMS } from './api/Fetcher';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { MovieList } from './components/feature/MovieList';
import { MOVIE_RESPONSE } from './constants/movie.data';

export const App = async () => {
  const fetcher = new Fetcher(ENV.VITE_API_URL);
  const data = await fetcher.get(QUERY_PARAMS.MOVIE);
  Header();
  MovieList(MOVIE_RESPONSE);
  Footer();
};
