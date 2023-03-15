import Logo from '../../components/shared/Logo';
import SearchBox from '../../components/shared/SearchBox';
import { $ } from '../../utils/dom';
import { HeaderComponents } from '../../types/header';
import Input from '../../components/shared/Input';

class Header {
  private components: HeaderComponents = {
    logo: null,
    searchBox: null,
    searchButton: null,
  };

  constructor(logo: Logo, searchBox: Input, searchButton: Input) {
    this.components = { logo, searchBox, searchButton };
  }

  render() {
    const appElement = $<HTMLDivElement>('#app');

    if (appElement instanceof HTMLDivElement && appElement.closest('body')) {
      appElement.insertAdjacentHTML('beforeend', '<header></header>');
      this.renderChild();
    }
  }

  private renderChild() {
    const headerElement = $<HTMLElement>('header');

    if (
      headerElement instanceof HTMLElement &&
      headerElement.closest('#app') &&
      this.components.logo instanceof Logo &&
      this.components.searchBox instanceof Input
    ) {
      this.components.logo.render(headerElement);
      this.components.searchBox.render(headerElement);

      const searchBoxElement = $<HTMLDivElement>('.search-box');
      if (searchBoxElement instanceof HTMLDivElement && this.components.searchButton instanceof Input)
        this.components.searchButton.render(searchBoxElement);
    }
  }
}

export default Header;
