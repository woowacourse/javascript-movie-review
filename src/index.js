import { Header } from './components/Header';
import { MovieList } from './components/MovieList';
import { MovieItem } from './components/MovieItem';
import { SeeMoreButton } from './components/SeeMoreButton';
import { Skeleton } from './components/Skeleton';
import App from './App';

import '../reset.css';
import '../global.css';

customElements.define('movie-header', Header);
customElements.define('movie-list', MovieList);
customElements.define('movie-item', MovieItem);
customElements.define('more-button', SeeMoreButton);
customElements.define('movie-skeleton', Skeleton);

const app = new App();
