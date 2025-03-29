import TmdbApi from './domain/tmdbApi.js';
import MovieService from './domain/MovieService.js';
import SearchBar from './components/search/SearchBar.js';
import MovieListHandler from './handlers/MovieListHandler.js';
import SearchHandler from './handlers/SearchHandler.js';
import Logo from './components/header/Logo.js';

const tmdbApi = new TmdbApi(
  import.meta.env.VITE_API_TOKEN || '',
  import.meta.env.VITE_BASE_URL || '',
);
const movieService = new MovieService(tmdbApi);
const movieListHandler = new MovieListHandler(movieService);
const searchHandler = new SearchHandler(movieListHandler);

window.addEventListener('load', async () => {
  try {
    const searchBar = new SearchBar(searchHandler);
    searchBar.createSearchBar();

    const logo = new Logo(movieListHandler);
    logo.createLogo();

    await movieListHandler.createMovieList();
  } catch (error) {
    console.error('애플리케이션 초기화 실패:', error);
  }
});
