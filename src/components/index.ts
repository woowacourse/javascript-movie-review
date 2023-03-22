import Header from './Header';
import MoviesContainer from './MoviesContainer';
import SearchInput from './SearchInput';
import Button from './Button';
import MovieListItem from './MovieListItem';
import Skeleton from './Skeleton';
import Image from './Image';

customElements.define('movie-header', Header);
customElements.define('search-input', SearchInput);
customElements.define('movies-container', MoviesContainer);
customElements.define('common-button', Button);
customElements.define('movie-item', MovieListItem);
customElements.define('movie-image', Image);
customElements.define('skeleton-item', Skeleton);
