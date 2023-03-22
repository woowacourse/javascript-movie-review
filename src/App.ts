import './components/NavBar';
import './components/MovieListContainer';
import './components/MovieTitle';
import './components/MovieListContent';
import './components/MovieInformationModal';
import './components/InvalidMessage';
import MovieList from './domain/MovieList';
import { saveToLocalStorage } from './utils/localStorage';

// something to solve ! don't place this twice but once?
history.pushState({ isList: true, searchQuery: '', timestamp: new Date().getTime() }, '', '/');
MovieList.getMovieGenre();
MovieList.getMovieData();

window.addEventListener('beforeunload', () => {
  saveToLocalStorage(MovieList.getUserMovies());
});
