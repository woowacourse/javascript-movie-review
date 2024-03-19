import './reset.css';

import Header from './components/Header';
import MovieItems from './components/MovieItems';
import SearchField from './components/SearchField';

const body = document.querySelector('body');

body?.appendChild(Header.createElements());
body?.appendChild(SearchField.createElements());
body?.appendChild(MovieItems.createElements());
