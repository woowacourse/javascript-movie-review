import { ENV } from './api/env';
import Fetcher, { API_OPTION } from './api/Fetcher';
import { QUERY_PARAMS } from './api/MovieFetcher';
import { Footer } from './components/common/Footer';
import { Header } from './components/common/Header';
import { MovieList } from './components/feature/MovieList';
import { MovieList as MovieListType } from './types/Movie.types';

export const App = async () => {
  const fetcher = new Fetcher(ENV.VITE_API_URL);
  const data = await fetcher.get(QUERY_PARAMS.MOVIE, API_OPTION.headers);
  console.log('data', data);
  Header();
  MovieList(data as MovieListType);
  Footer();
};
