/* eslint-disable import/no-unresolved */
import './styles/exportStylesheets';
import AppHeader from './components/app-header/AppHeader';
import DetailModal from './components/detail-modal/DetailModal';
import MovieListSection from './components/movie-list-section/MovieListSection';
import MovieListController from './controllers/MovieListController';
import { $ } from './utils/domUtils';
import DomController from './controllers/DomController';
import DetailModalController from './controllers/DetailModalController';
import TmdbAPI from './services/TmdbAPI';

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

const $modal = DetailModal();
$app.appendChild($modal);

/* App 초기화 */
window.onload = () => {
  DomController.initController();
  DetailModalController.initController();
  MovieListController.loadMovieList({ path: TmdbAPI.PATH.popular });
};
