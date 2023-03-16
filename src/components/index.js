import Header from './Header';
import MoviesContainer from './MoviesContainer';
import SearchInput from './SearchInput';
import Button from './Button';
import Movie from './Movie';
import Skeleton from './Skeleton';

customElements.define('movie-header', Header);
customElements.define('search-input', SearchInput);
customElements.define('movies-container', MoviesContainer);
customElements.define('common-button', Button);
customElements.define('movie-item', Movie);
customElements.define('skeleton-item', Skeleton);
