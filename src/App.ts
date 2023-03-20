import { $ } from './utils/domSelector';
import NavBar from './components/NavBar';
import './components/MovieListContainer';
import './components/MovieTitle';
import './components/MovieListContent';
import './components/InvalidMessage';
import MovieList from './domain/MovieList';

$<HTMLDivElement>('#app').insertAdjacentHTML('afterbegin', NavBar.template());
NavBar.addEventListenerToSearchInput();

MovieList.getMovieData();
