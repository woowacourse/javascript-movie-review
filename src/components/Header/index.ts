import './index.css';
import template from './index.html';
import { $ } from '../../utils/dom';

export class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
  }

  addSearchHandler(searchHandler: CallableFunction) {
    const $input = $<HTMLInputElement>('input', this);
    $input?.addEventListener('change', (e: Event) => {
      if (!(e.currentTarget instanceof HTMLInputElement)) return;
      const { value } = e.currentTarget;
      if (value.trim() === '') {
        alert('검색어를 입력해주세요.');
        return;
      }
      searchHandler(value);
      e.currentTarget.value = '';
    });
  }

  addClickLogoHandler(handler: CallableFunction) {
    const $logo = $<HTMLImageElement>('.movie-logo');
    $logo?.addEventListener('click', () => {
      handler();
    });
  }
}
