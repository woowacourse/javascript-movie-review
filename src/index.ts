import './css/reset.css';
import './css/app.css';
import './css/util.css';
import './css/responsive.css';

import MovieHeader from './components/MovieHeader';
import MoviePage from './components/MoviePage';
import MovieListItem from './components/MovieListItem';
import SkeletonListItem from './components/SkeletonListItem';
import ErrorPage from './components/ErrorPage';
import MovieDetailBox from './components/MovieDetailBox';
import VoteArea from './components/VoteArea';

customElements.define('movie-header', MovieHeader);
customElements.define('movie-page', MoviePage);
customElements.define('movie-list-item', MovieListItem);
customElements.define('skeleton-list-item', SkeletonListItem);
customElements.define('error-page', ErrorPage);
customElements.define('movie-detail-box', MovieDetailBox);
customElements.define('vote-area', VoteArea);

import App from './App';

new App();
