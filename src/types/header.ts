import Logo from '../components/shared/Logo';
import SearchBox from '../components/shared/SearchBox';
import Button from '../components/shared/Button';

export interface HeaderComponents {
  logo: Logo | null;
  searchBox: SearchBox | null;
  searchButton: Button | null;
}
