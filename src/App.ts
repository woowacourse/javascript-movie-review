import './components/NavBar';
import './components/MovieListContainer';
import './components/MovieTitle';
import './components/MovieListContent';
import './components/MovieInformationModal';
import './components/InvalidMessage';
import MovieList from './domain/MovieList';

// something to solve ! don't place this twice but once?
history.pushState({ isList: true, searchQuery: '', timestamp: new Date().getTime() }, '', '/');
MovieList.getMovieGenre();
MovieList.getMovieData();
