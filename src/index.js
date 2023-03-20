import './css/reset.css';
import './css/app.css';
import './css/util.css';

import MovieHeader from './components/MovieHeader';
import MoviePage from './components/MoviePage';
import MovieListItem from './components/MovieListItem';
import SkeletonListItem from './components/SkeletonListItem';
import ErrorPage from './components/ErrorPage';

import App from './App';

customElements.define('movie-header', MovieHeader);
customElements.define('movie-page', MoviePage);
customElements.define('movie-list-item', MovieListItem);
customElements.define('skeleton-list-item', SkeletonListItem);
customElements.define('error-page', ErrorPage);

App.init();
