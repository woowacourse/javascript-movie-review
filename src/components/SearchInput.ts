import { $ } from '../utils/common';
import { HTMLMovieContainerElement } from './MoviesContainer';
import './SearchInput.css';
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
        <input id="search-input-tag" class="search-input-text" type="text" required maxlength=50 placeholder="검색" />
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
      const movieContainer = $('movies-container') as HTMLMovieContainerElement;

      const word = searchInputTag.value.trim();
      if (word === '') return;

      movieContainer.setSearchWord(word);
      searchInputTag.value = '';
      searchInputTag.blur();
    });
  }

  setSearchBoxClickEvent(): void {
    const searchInput = $('#search-input-tag') as HTMLInputElement;
    $('#small-search-box')?.addEventListener('click', event => {
      event.preventDefault();
      $('#logo')?.classList.add('hide');
      $('#search-label')?.classList.add('search-full');
      $('#search-label')?.classList.add('visible');
      $('#small-search-box')?.classList.add('hide');
      $('#movie-header-bar')?.classList.add('header-center');
      searchInput.focus();
    });
  }

  setInputBlurEvent() {
    const searchInput = $('#search-form-box') as HTMLInputElement;
    searchInput.addEventListener('focusout', event => {
      if (event.relatedTarget !== null) return;
      $('#logo')?.classList.remove('hide');
      $('#search-label')?.classList.remove('visible');
      $('#search-label')?.classList.remove('search-full');
      $('#movie-header-bar')?.classList.remove('header-center');
      $('#small-search-box')?.classList.remove('hide');
    });
  }
}

export default SearchInput;
