import Logo from '../components/shared/Logo';
import SearchBox from '../components/shared/SearchBox';

export interface HeaderComponents {
  logo: Logo | null;
  searchBox: SearchBox | null;
}
