/* eslint-disable import/no-unresolved */
import './styles/reset.css';
import './styles/common.css';
import AppHeader from './components/app-header/AppHeader';
import MovieListSection from './components/movie-list-section/MovieListSection';
import { $ } from './utils/domUtils';

/* Main Page Container */
const $app = $('#app');
if (!$app) throw new Error('main page container not found');

/* Header */
const $appHeader = AppHeader();
$app.appendChild($appHeader);

/* Main */
const $main = document.createElement('main');
const $movieListSection = MovieListSection();
$main.appendChild($movieListSection);
$app.appendChild($main);
