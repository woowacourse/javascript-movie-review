import './reset.css';
import './app.css';

import Header from './components/Header/Header';
import MovieItems from './components/MovieItems/MovieItems';

const body = document.querySelector('body');

body?.appendChild(Header.createElements());
body?.appendChild(MovieItems.createElements());
