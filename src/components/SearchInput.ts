import './SearchInput.css';
import { $ } from '../utils/common';
import SEARCH_ICON from '../image/search-button.png';

class SearchInput extends HTMLElement {
  connectedCallback(): void {
    this.render();
    this.setSubmitEvent();
    this.setInputBlurEvent();
    this.setSearchBoxClickEvent();
  }

  render(): void {
    this.innerHTML = /*html*/ `
    <label for="search-input-tag" id="search-label" class="search-input-label">
      <form id="search-form-box" class="search-box"> 
        <input id="search-input-tag" class="search-input-text" type="text" required maxlength=300 placeholder="검색" />
        <button id="search-form-button" type="submit" title="검색" alt="검색" class="search-button">검색</button>
      </form>
    </label>
    <div id="small-search-box" class="search-box-wrapper">
      <img src="${SEARCH_ICON}" class="header-search-icon" title="검색" alt="검색">
    </div>
    `;
  }

  setSubmitEvent(): void {
    $('#search-form-box')?.addEventListener('submit', event => {
      event.preventDefault();
      const searchInputTag = $('#search-input-tag') as HTMLInputElement;

      const word = searchInputTag.value.trim();
      if (word === '') return;

      window.location.hash = `?q=${word}`;

      searchInputTag.blur();
    });
  }

  setInputBlurEvent(): void {
    const searchInput = $('#search-form-box') as HTMLInputElement;
    searchInput.addEventListener('focusout', event => {
      if (event.relatedTarget !== null) return;
      this.toggleVisibleSearchBar();
    });
  }

  setSearchBoxClickEvent(): void {
    const searchInput = $('#search-input-tag') as HTMLInputElement;
    $('#small-search-box')?.addEventListener('click', event => {
      event.preventDefault();
      this.toggleVisibleSearchBar();
      searchInput.focus();
    });
  }

  toggleVisibleSearchBar(): void {
    $('#logo')?.classList.toggle('hide-logo');
    $('#search-label')?.classList.toggle('visible');
    $('#search-label')?.classList.toggle('search-full');
    $('#movie-header-bar')?.classList.toggle('header-center');
    $('#small-search-box')?.classList.toggle('hide-logo');
  }
}

export default SearchInput;
