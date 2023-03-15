import { $ } from '../../utils/dom';
import Logo from '../shared/Logo';
import SearchBox from '../shared/SearchBox';

interface HeaderComponents {
  logo: Logo | null;
  searchBox: SearchBox | null;
}

class Header {
  private components: HeaderComponents = {
    logo: null,
    searchBox: null,
  };

  constructor(logo: Logo, searchBox: SearchBox) {
    this.components = { logo, searchBox };
  }

  render() {
    const headerElement = $<HTMLElement>('header');

    if (
      headerElement instanceof HTMLElement &&
      headerElement.closest('body') &&
      this.components.logo instanceof Logo &&
      this.components.searchBox instanceof SearchBox
    ) {
      this.components.logo.render(headerElement);
      this.components.searchBox.render(headerElement);
    }
  }
}

export default Header;
