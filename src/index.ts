import './css/reset.css';
import './css/app.css';
import './css/util.css';
import './css/responsive.css';

import MovieHeader from './components/MovieHeader';
import MoviePage from './components/MoviePage';
import MovieListItem from './components/movieList/MovieListItem';
import SkeletonListItem from './components/movieList/SkeletonListItem';
import ErrorPage from './components/ErrorPage';
import MovieDetail from './components/modal/MovieDetail';
import VoteArea from './components/modal/VoteArea';

customElements.define('movie-header', MovieHeader);
customElements.define('movie-page', MoviePage);
customElements.define('movie-list-item', MovieListItem);
customElements.define('skeleton-list-item', SkeletonListItem);
customElements.define('error-page', ErrorPage);
customElements.define('movie-detail', MovieDetail);
customElements.define('vote-area', VoteArea);

import App from './App';

new App();
