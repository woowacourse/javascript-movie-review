import './reset.css';
import './app.css';

import Header from './components/Header/Header';
import MovieItems from './components/MovieItems/MovieItems';

const body = document.querySelector('body');

body?.appendChild(Header.createElements());
const movieItems = new MovieItems();
body?.appendChild(movieItems.createElements());

movieItems.getPopularMovies().then((movies) => movieItems.createMovieItem(movies));
