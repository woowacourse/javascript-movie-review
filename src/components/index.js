import Header from './Header/Header';
import MovieList from './MovieList/MovieList';
import SearchInput from './SearchInput/SearchInput';
import Button from './Button/Button';
import Movie from './MovieListItem/MovieListItem';
import Skeleton from './Skeleton/Skeleton';

customElements.define('movie-header', Header);
customElements.define('search-input', SearchInput);
customElements.define('movie-list', MovieList);
customElements.define('common-button', Button);
customElements.define('movie-item', Movie);
customElements.define('skeleton-item', Skeleton);
