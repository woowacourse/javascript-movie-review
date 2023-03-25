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
    });

    const $searchButton = $<HTMLButtonElement>('.search-button', this);
    $searchButton.addEventListener('click', () => {
      $<HTMLDivElement>('.search-box', this).classList.add('show');
      $input.classList.add('show');
    });
  }

  addClickLogoHandler(handler: CallableFunction) {
    const $logo = $<HTMLImageElement>('.movie-logo');
    $logo?.addEventListener('click', () => {
      $<HTMLInputElement>('input', this).value = '';
      $<HTMLDivElement>('.search-box', this).classList.remove('show');
      $<HTMLInputElement>('input', this).classList.remove('show');
      handler();
    });
  }
}
