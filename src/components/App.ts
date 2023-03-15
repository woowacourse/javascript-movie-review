import { Header } from './Header';
import { MainPage } from './MainPage';
import { getMovies, getSearchMovie } from '../data/api';
import { usePopularMovie, useSearchedMovie } from '../data/useMovie';

export function App() {
  return `
        ${Header()}
        ${MainPage()}
    `;
}
