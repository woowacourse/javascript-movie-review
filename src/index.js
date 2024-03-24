/* eslint-disable import/no-unresolved */
import './styles/reset.css';
import './styles/common.css';
import AppHeader from './components/app-header/AppHeader';
import MovieListSection from './components/movie-list-section/MovieListSection';
import MovieListController from './controllers/MovieListController';
import { $ } from './utils/domUtils';
import DomController from './controllers/DomController';

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

/* App 초기화 */
window.onload = () => {
  DomController.initController();
  MovieListController.popular();
};
