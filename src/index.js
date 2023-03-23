import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { MovieItem } from './components/MovieItem';
import { SeeMoreButton } from './components/SeeMoreButton';
import { Skeleton } from './components/Skeleton';
import ErrorModal from './components/ErrorModal';
import MovieModal from './components/MovieModal';
import App from './App';

import '../reset.css';
import '../global.css';

customElements.define('movie-header', Header);
customElements.define('movie-list', MovieList);
customElements.define('movie-item', MovieItem);
customElements.define('more-button', SeeMoreButton);
customElements.define('movie-skeleton', Skeleton);
customElements.define('error-modal', ErrorModal);
customElements.define('movie-modal', MovieModal);

const app = new App();
