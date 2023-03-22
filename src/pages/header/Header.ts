import Logo from '../../components/shared/Logo';
import Form from '../../components/shared/Form';
import { $ } from '../../utils/dom';
import { HeaderComponents } from '../../types/header';
import { getFormData } from '../../utils/form';
import { Proxy } from '../../types/proxy';
import { proxy } from '../../domains/proxy';

class Header {
  private components: HeaderComponents = {
    logo: null,
    searchBox: null,
  };

  constructor({ logo, searchBox }: HeaderComponents) {
    this.components = { logo, searchBox };
  }

  render() {
    const appElement = $<HTMLDivElement>('#app');

    if (appElement instanceof HTMLDivElement && appElement.closest('body')) {
      appElement.insertAdjacentHTML('beforeend', '<header></header>');
      this.renderChild();
      this.listenEvent('click');
      this.listenEvent('submit');
    }
  }

  private renderChild() {
    const headerElement = $<HTMLElement>('header');

    if (
      headerElement instanceof HTMLElement &&
      headerElement.closest('#app') &&
      this.components.logo instanceof Logo &&
      this.components.searchBox instanceof Form
    ) {
      this.components.logo.render(headerElement);
      this.components.searchBox.render(headerElement);
    }
  }

  private async callback(event: Event) {
    if (event.target instanceof HTMLImageElement && event.target.matches('#logo')) {
      window.location.reload();
    }

    if (event.target instanceof HTMLFormElement && event.target.matches('#search-box')) {
      event.preventDefault();

      const formData = getFormData(event);
      if (formData instanceof Object) {
        const query = Object.fromEntries(formData);
        proxy.query.value = query['search-input'];
        proxy.query.isSearch = true;
      }
    }
  }

  private listenEvent(type: string) {
    const headerElement = $<HTMLElement>('header');

    if (headerElement instanceof HTMLElement) {
      headerElement.addEventListener(type, this.callback.bind(this));
    }
  }
}

export default Header;
